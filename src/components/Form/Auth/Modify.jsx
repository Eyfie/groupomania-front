import React from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver }  from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';

import axios from '../../../api/axios';
import { modifySchema } from '../../../validations/modifySchema';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Modify = () => {

  const navigate = useNavigate();
  let [ searchParams ] = useSearchParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm({ 
    resolver: yupResolver(modifySchema),
    mode:'onChange',
    defaultValues: {
      newpassword: '',
      confirmpassword: '',
    },
  });


  const onSubmit = async (data) => {
    try {
      const response = await axios.post('auth/forgot/modify',
      JSON.stringify({ ...data }),
      {
        headers: { 
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        params: {
          username: searchParams.get('username'),
          retriever: searchParams.get('retriever'),
        },
      });
      if (!response) throw new Error('Le serveur ne répond pas ');
      reset()
      navigate('/login', { replace: true });
      
      toast.success(`Mot de passe changé avec succès !`)
  
    } catch (error) {
      console.log(error);
      reset()
      if (error?.response.status === 409) return toast.error(`Le nouveau mot de passe doit être différent du précedent`);
      if (error?.response.data === undefined) return toast.warning(`Erreur réseau`)
      // if (!error.response) return setErrorMsg('Le serveur ne répond pas.')
      // if (error.response?.status === 409) return setErrorMsg('Votre nouveau mot de passe doit être différent du précédent')
      // if (error.response?.status) return setErrorMsg(`Erreur ${error.response.status} : ${error.response.data.message ? error.response.data.message : error.response.statusText}`)
    }
  }

  return (
    <section className='border rounded border-slate-900 p-6 font-noto'>
      <h2 className='text-2xl font-ibm font-bold'>Changez votre mot de passe</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <div className='mt-3'>
            <label htmlFor='newpassword'>Nouveau mot de passe</label>
              <input
                {...register('newpassword')}
                type='password'
                name='newpassword'
                placeholder='Mot de passe'
                autoComplete='off'
                className='basic-input'
                aria-invalid={errors?.newpassword ? 'true' : 'false'}
                aria-describedby='newpasswordnote'
              />
              {errors?.newpassword && (
                <div className=' flex items-center space-x-1'>
                <InformationCircleIcon className='h-4 w-4' /><p id='newpasswordnote'>{errors.newpassword?.message}</p>
              </div>
              )}
          </div>

          <div className='mt-3'>
          <label htmlFor='confirmpassword'>Confirmez le mot de passe</label>
            <input
              {...register('confirmpassword')}
              type='password'
              name='confirmpassword'
              placeholder='Mot de passe'
              autoComplete='off'
              className='mt-1 
              block 
              w-full
              border
              border-gray-300
              rounded 
              bg-gray-100 
              focus:bg-white
              focus:ring
              focus:ring-gray-500
              focus:border-gray-500
              focus:ring-opacity-20'
              aria-invalid={errors?.confirmpassword ? 'true' : 'false'}
              aria-describedby='confirmpasswordnote'
            />
            {errors?.confirmpassword && (
              <div className=' flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='confirmpasswordnote'>{errors.confirmpassword?.message}</p>
            </div>
            )}
        </div>

        <button className='mt-5 text-center text-white px-5 p-1 border rounded border-slate-900 bg-slate-900' type='submit'>Envoyer</button>
      </form>
    </section>
  )
}

export default Modify;