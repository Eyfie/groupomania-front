import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GroupomaniaLogo from '../assets/logo/icon-left-font-monochrome-black.svg'
import useAuth from '../hooks/useAuth';

const Header = () => {
  let navigate = useNavigate();
  const { setAuth } = useAuth();

  const logOut = () => {
    setAuth({});
    navigate('/auth/login', { replace: true });
  }

  return (
    <header>
        <div>
          <Link to='/'>
            <img src={GroupomaniaLogo} alt='Logo Groupomania' />
          </Link>
        </div>
        <nav>
          <Link to='/profil/account'>Compte</Link>
          <button onClick={ logOut }>Log out</button>
        </nav>
    </header>
  )
}

export default Header;