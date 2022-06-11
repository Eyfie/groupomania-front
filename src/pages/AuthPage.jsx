import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GroupomaniaLogo from '../assets/logo/auth-logo.svg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AuthPage = () => {
  const {auth} = useAuth()
  let navigate = useNavigate();
  let location = useLocation();


  useEffect( () => {

    if (location?.pathname === '/' && !auth) navigate('/login', { replace: true });
  
  }, [location, navigate, auth])

  return (
    <>
      <main className='flex flex-col h-screen w-screen m-auto items-center justify-center'>
        <div className='h-30 w-30 text-center'>
          <img src={GroupomaniaLogo} alt='logo groupomania' className='h-30 w-30'/>
          <h1 className='text-4xl text-center font-ibm font-semibold'>Connectez vous à votre famille !</h1>
        </div>
        <nav className='flex justify-between mt-6 mb-6 space-x-6'>
          <Link 
            className={`w-26 text-center px-5 p-1 border rounded font-semibold border-groupogris-900 hover:bg-groupogris-900 hover:text-white ease-in-out duration-300 ${ location?.pathname === '/login' ? 'gray-button' : null }`} 
            to='/login'>Se connecter</Link>
          <Link 
            className={`w-26 text-center px-5 p-1 border rounded font-semibold border-groupogris-900 hover:bg-groupogris-900 hover:text-white ease-in-out duration-300 ${ location?.pathname === '/signup' ? 'gray-button' : null }`} 
            to='/signup'>S'inscrire</Link>
        </nav>
        
        <Outlet />
        <ToastContainer draggablePercent={40} limit={1}/>
      </main>
    </>
  )
}

export default AuthPage