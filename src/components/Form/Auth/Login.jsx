import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

import { useForm } from 'react-hook-form'
import { yupResolver }  from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../../api/axios'
import { loginSchema } from '../../../validations/loginSchema'
import { InformationCircleIcon } from '@heroicons/react/solid'



const Login = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm({ 
    resolver: yupResolver(loginSchema),
    mode:'onSubmit',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('auth/login',
      JSON.stringify({ ...data }),
      {
        headers: { 
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      if (!response) return toast.error('Le serveur ne répond pas');
      setAuth({...response.data.User});
      navigate(from, { replace: true });
      reset();
  
    } catch (error) {
      reset();
      if (error.response?.status === 400) return toast.error(`Utilisateur ou mot de passe invalide`);
      if (error.response?.status === 401) return toast.error(`Utilisateur ou mot de passe invalide`);
      if (error.response?.status === 404) return toast.error(`L'utilisateur n'existe pas`);
      if (error?.response.data === undefined) return toast.warning(`Erreur de connexion réseau`);
    }
  }


  return (
    <section className='border rounded border-slate-900 p-6 font-noto'>
      <h2 className='text-2xl font-ibm font-bold'>Connectez-vous à Groupomania</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <div>
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

        <div className='mt-2'>
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
            <div className='flex items-center space-x-1'>
            <InformationCircleIcon className='h-4 w-4' /><p id='passwordnote'>{errors.password?.message}</p>
          </div>
          )}
        </div>
        <button className='mt-5 text-center text-white px-5 p-1 border rounded gray-button hover-button' type='submit'>Se connecter</button>
      </form>
      <div className='mt-2'>
        <p>Mot de passe oublié ? <Link to='/forgot' className='text-grouporange-900 hover:underline font-bold'>Changez le !</Link></p>
      </div>
    </section>
  )
}

export default Login