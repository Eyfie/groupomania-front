import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import GroupomaniaLogo from '../assets/logo/icon-left-font-monochrome-black.svg'
import useAuth from '../hooks/useAuth';

const Header = () => {
  let navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const logOut = () => {
    
    const terminateToken = async () => {
      try {
        const response = await axios.get('/logout', 
        {
          headers: {'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Authorization': `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        });
        if (!response) throw new Error('Le serveur ne répond pas');
        setAuth({});
          
      } catch (error)  {
        console.log(error)
      }   
    }
    terminateToken();
    navigate('/login', { replace: true });
  }

  return (
    <header>
        <div>
          <Link to='/'>
            <img src={GroupomaniaLogo} alt='Logo Groupomania' />
          </Link>
        </div>
        <nav>
          <Link to='/account'>Compte</Link>
          <button onClick={ logOut }>Log out</button>
        </nav>
    </header>
  )
}

export default Header;