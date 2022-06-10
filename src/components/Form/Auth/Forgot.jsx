import React from 'react'

import { useForm } from 'react-hook-form';
import { yupResolver }  from '@hookform/resolvers/yup'

import axios from '../../../api/axios';
import { forgotSchema } from '../../../validations/forgotSchema';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';


const Forgot = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm({ 
    resolver: yupResolver(forgotSchema),
    mode:'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('auth/forgot',
      JSON.stringify({ ...data }),
      {
        headers: { 
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (!response) throw new Error('Le serveur ne répond pas ');
      reset()
      toast.success(`Email envoyé !`);
  
    } catch (error) {
      console.log(error);
      reset()
      if (error?.response.status === 404) return toast.error(`Cet email n'existe pas !`);
      if (error?.response.data === undefined) return toast.warning(`Erreur réseau`);
      // if (!error.response) setErrorMsg('Le serveur ne répond pas.')
      // if (error.response?.status) setErrorMsg(`Erreur ${error.response.status} : ${error.response.data.message ? error.response.data.message : error.response.statusText}`)
    }
  }
  return (
    <section className='border rounded border-slate-900 p-6 font-noto'>
      <h2 className='text-2xl font-ibm font-bold'>Rentrez votre adresse mail</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
      <div className='mt-3'>
          <label htmlFor='email' className=''>Adresse mail</label>
            <input
              {...register('email')}
              type='email'
              name='email'
              placeholder='exemple@gmail.com'
              autoComplete='off'
              className='basic-input'
              aria-invalid={errors?.email ? 'true' : 'false'}
              aria-describedby='emailnote'
            />
            {errors?.email && (
              <div className=' flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4 text-slate-900' /><p id='emailnote'>{errors.email?.message}</p>
            </div>
            )}
        </div>
        <button className='mt-5 text-center text-white px-5 p-1 border rounded border-groupogris-900 bg-groupogris-900' type='submit'>Envoyer</button>
      </form>

    </section>
  )
}

export default Forgot