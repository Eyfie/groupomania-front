import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GroupomaniaLogo from '../assets/logo/auth-logo.svg';
import { useNavigate } from 'react-router-dom';


const AuthPage = () => {

  let navigate = useNavigate();
  let location = useLocation();

  useEffect( () => {

    if (location?.pathname === '/') navigate('/login', { replace: true });
  
  }, [location, navigate])

  return (
    <>
      <div className='auth-logo'>
        <img src={GroupomaniaLogo} alt='logo groupomania'/>
        <h1 className='auth-title'>Connectez vous à votre famille !</h1>
      </div>
      <nav className='auth-nav'>
        <Link className='auth-link border' to='/login'> Se connecter</Link>
        <Link className='auth-link border' to='/signup'> S'inscrire </Link>
      </nav>
      
      <Outlet />
    </>
  )
}

export default AuthPage