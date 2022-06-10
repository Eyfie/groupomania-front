/* eslint-disable default-case */
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver }  from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { accountSchema } from '../../../validations/accountSchema'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { toast } from 'react-toastify'

const Account = () => {

  let navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(accountSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      newpassword: '',
      confirmpassword: '',
      password: '',
    }
  })

  const deleteAccount = async (data, id) => {
    
    const response = await axiosPrivate.delete(`/user/${auth.id}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data : JSON.stringify({ ...data }),
    });
    if (!response) throw new Error('Le serveur ne répond pas');

    await setAuth({});
    toast.success(`Votre compte a été supprimé !`);
    reset();
    navigate('/signup', { replace: true });
  }

  const updateAccount = async (data, id) => {
      
      delete data.confirmpassword;

      for (const key in data) {
        if (data[key] === '' || data[key] === null || data[key] === undefined)
        delete data[key]
      }

      const response = await axiosPrivate.patch(`/user/${auth.id}`,
        JSON.stringify({...data}),
        {
          headers: { 'Content-type' : 'application/json' }
        });

      if (!response) throw new Error('Le serveur ne répond pas');

      delete data.password
      delete data.newpassword

      toast.success(`Votre compte a été mis à jour`);
      reset();
      setAuth({...auth, ...data})
  }
  
  const onSubmit = async (data) => {
    try {
    const selectedButton = document.activeElement.dataset.flag;

    if (selectedButton === 'update') return updateAccount(data, auth.id);
    if (selectedButton === 'delete') return deleteAccount(data, auth.id);
     
    } catch (error) {
        console.log(error)
    }
  };


  return (
    <section className='mx-2 ft:mx-8 space-y-3'>
      <h2 className='font-ibm font-semibold uppercase border-b border-orange-500'>Information de votre compte</h2>
      <form 
        className='space-y-3'
        onSubmit={handleSubmit(onSubmit)}>

        <div>
          <label htmlFor='username'>Changez votre nom d'utilisateur</label>
          <input
            {...register('username')}
            className='basic-input'
            type='text'
            name='username'
            autoComplete='off'
            placeholder={auth.username}
            aria-invalid={errors?.username ? true : false}
            aria-describedby='usernamenote'
          />
          {errors?.username && (
            <div className='flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='usernamenote'>{errors.username?.message}</p>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor='email'>Changez votre adresse mail</label>
          <input
            {...register('email')}
            className='basic-input'
            type='email'
            name='email'
            autoComplete='off'
            placeholder={auth.email}
            aria-invalid={errors?.email ? true : false}
            aria-describedby='emailnote'
          />
          {errors?.email && (
            <div className='flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='emailnote'>{errors.email?.message}</p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor='newpassword'>Changez de mot de passe</label>
          <input
            {...register('newpassword')}
            className='basic-input'
            type='password'
            name='newpassword'
            autoComplete='off'
            placeholder='Mot de passe'
            aria-invalid={errors?.newpassword ? true : false}
            aria-describedby='newpasswordnote'
          />
          {errors?.newpassword && (
            <div className='flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='newpasswordnote'>{errors.newpassword?.message}</p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor='confirmpassword'>Confirmez votre nouveau mot de passe</label>
          <input
            {...register('confirmpassword')}
            className='basic-input'
            type='password'
            name='confirmpassword'
            autoComplete='off'
            placeholder='Mot de passe'
            aria-invalid={errors?.confirmpassword ? true : false}
            aria-describedby='confirmpasswordnote'
          />
          {errors?.confirmpassword && (
            <div className='flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='confirmpasswordnote'>{errors.confirmpassword?.message}</p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor='password'>Entrez votre mot de passe</label>
          <input
            {...register('password')}
            className='basic-input'
            type='password'
            name='password'
            autoComplete='off'
            placeholder='Mot de passe'
            aria-invalid={errors?.password ? true : false}
            aria-describedby='passwordnote'
          />
          {errors?.password && (
            <div className='flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='passwordnote'>{errors.password?.message}</p>
            </div>
          )}
        </div>

        <div className='flex gap-2 mt-10'>
          <button 
          className='flex-1 w-full rounded-full bg-slate-800 text-white p-2'
          type='submit'
          data-flag='update'
          >
            Enregistrer les changements
          </button>
          <button 
          className='flex-1 w-full rounded-full bg-orange-500 text-white p-2'
          type='submit' 
          data-flag='delete'
         >
            Supprimer votre compte
          </button>
        </div>
      </form>
    </section>
  )
  
}

export default Account