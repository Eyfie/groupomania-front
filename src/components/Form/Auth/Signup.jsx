import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver }  from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';

import axios from '../../../api/axios';
import { signupSchema } from '../../../validations/signupSchema';
import { InformationCircleIcon } from '@heroicons/react/solid';


const Signup = () => {

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm({ 
    resolver: yupResolver(signupSchema),
    mode:'onChange',
    defaultValues: {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

const onSubmit = async (data) => {
  
  try {
    const response = await axios.post('auth/signup',
    JSON.stringify({ ...data }),
    {
        headers: { 
                  'Access-Control-Allow-Origin' : 'http://localhost:3000',
                  'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    if (!response) return toast.error('Le serveur ne répond pas ');


    navigate('/login', { replace: true });
    toast.success('Inscription réussie !');

  } catch (error) {
    if (error.response?.status === 400) return toast.error(`Remplissez le formulaire correctement`);
    if (error?.response.status === 409) return toast.error(`Ce pseudo et/ou cet email sont déjà utilisés`);
    if (error?.response.data === undefined) return toast.warning(`Erreur réseau`);
  }
}
  return (
    <section className='border rounded border-slate-900 p-6 font-noto'>
      <h2 className='text-2xl font-ibm font-bold'>Créer votre compte Groupomania</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <div className='mt-3'>
          <label htmlFor='username' className=''>Nom d'utilisateur</label>
            <input
              {...register('username')}
              type='text'
              name='username'
              placeholder='Pseudo'
              autoComplete='off'
              className='basic-input'
              aria-invalid={errors?.username ? 'true' : 'false'}
              aria-describedby='usernamenote'
            />
            {errors?.username && (
              <div className=' flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='usernamenote'>{errors.username?.message}</p>
            </div>
            )}
        </div>
        <div className='sm:space-x-2 sm:flex'>
          <div className='mt-3'>
            <label htmlFor='firstname' className=''>Prénom</label>
              <input
                {...register('firstname')}
                type='text'
                name='firstname'
                placeholder='Prénom'
                autoComplete='off'
                className='basic-input'
                aria-invalid={errors?.firstname ? 'true' : 'false'}
                aria-describedby='firstnamenote'
              />
              {errors?.firstname && (
                <div className=' flex items-center space-x-1'>
                <InformationCircleIcon className='h-4 w-4' /><p id='firstnamenote'>{errors.firstname?.message}</p>
              </div>
              )}
          </div>

          <div className='mt-3'>
            <label htmlFor='lastname' className=''>Nom</label>
              <input
                {...register('lastname')}
                type='text'
                name='lastname'
                placeholder='Nom'
                autoComplete='off'
                className='basic-input'
                aria-invalid={errors?.lastname ? 'true' : 'false'}
                aria-describedby='lastnamenote'
              />
              {errors?.lastname && (
                <div className=' flex items-center space-x-1'>
                <InformationCircleIcon className='h-4 w-4' /><p id='lastnamenote'>{errors.lastname?.message}</p>
              </div>
              )}
          </div>
        </div>

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
              <InformationCircleIcon className='h-4 w-4' /><p id='emailnote'>{errors.email?.message}</p>
            </div>
            )}
        </div>

        <div className='mt-3'>
          <label htmlFor='password' className=''>Mot de passe</label>
            <input
              {...register('password')}
              type='password'
              name='password'
              placeholder='Mot de passe'
              autoComplete='off'
              className='basic-input'
              aria-invalid={errors?.password ? 'true' : 'false'}
              aria-describedby='passwordnote'
            />
            {errors?.password && (
              <div className=' flex items-center space-x-1'>
              <InformationCircleIcon className='h-4 w-4' /><p id='passwordnote'>{errors.password?.message}</p>
            </div>
            )}
        </div>

        <button className='mt-5 text-center text-white px-5 p-1 border rounded gray-button hover-button' type='submit'>S'inscrire</button>
      </form>

    </section>
  )
}

export default Signup;