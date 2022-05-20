import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GroupomaniaLogo from '../assets/logo/auth-logo.svg';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {
  const {auth} = useAuth()
  let navigate = useNavigate();
  let location = useLocation();

  useEffect( () => {

    if (location?.pathname === '/' && !auth) navigate('/login', { replace: true });
  
  }, [location, navigate, auth])

  return (
    <>
      <main className='container'>
        <div className='auth-logo'>
          <img src={GroupomaniaLogo} alt='logo groupomania'/>
          <h1 className='auth-title'>Connectez vous à votre famille !</h1>
        </div>
        <nav className='auth-nav'>
          <Link 
            className={`auth-link border ${ location?.pathname === '/login' ? 'auth-link__focus' : null }`} 
            to='/login'>Se connecter</Link>
          <Link 
            className={`auth-link border ${ location?.pathname === '/signup' ? 'auth-link__focus' : null }`} 
            to='/signup'>S'inscrire</Link>
        </nav>
        
        <Outlet />
        
      </main>
    </>
  )
}

export default AuthPage