import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GroupomaniaLogo from '../assets/logo/auth-logo.svg';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {

  let navigate = useNavigate();
  let location = useLocation();

  useEffect( () => {

    if (location?.pathname === '/') navigate('auth/login', { replace: true });
  
  }, [location, navigate])

  return (
    <>
      <main className='container'>
        <div className='auth-logo'>
          <img src={GroupomaniaLogo} alt='logo groupomania'/>
          <h1 className='auth-title'>Connectez vous à votre famille !</h1>
        </div>
        <nav className='auth-nav'>
          <Link 
            className={`auth-link border ${ location?.pathname === '/auth/login' ? 'auth-link__focus' : null }`} 
            to='/auth/login'>Se connecter</Link>
          <Link 
            className={`auth-link border ${ location?.pathname === '/auth/signup' ? 'auth-link__focus' : null }`} 
            to='/auth/signup'>S'inscrire</Link>
        </nav>
        
        <Outlet />
        
      </main>
    </>
  )
}

export default AuthPage