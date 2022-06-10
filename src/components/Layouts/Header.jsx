import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import GroupomaniaLogo from '../../assets/logo/icon-left-font-monochrome-black.svg'
import useAuth from '../../hooks/useAuth';
import { ChevronDownIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { UserCircleIcon, XIcon } from '@heroicons/react/solid';
import Avatar from '../Widgets/AvatarWidget';

const Header = () => {
  let navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false)

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
    <header className='flex bg-white shadow-sm sticky top-0 px-4 py-2 items-center gap-6 h-16 font-noto z-50'>
        <div className='flex flex-1'>
          <Link to='/' >
            <img src={GroupomaniaLogo} alt='Logo Groupomania' className='mx-h-24'/>
          </Link>
        </div>
        
        <button 
          aria-expanded={menuOpen}
          aria-haspopup='true'
          type='button' 
          className='border border-gray-200 rounded flex gap-2 space-between p-1 items-center mt-1 hover:border-slate-900 ease-in-out duration-300'
          onClick={() => setMenuOpen(!menuOpen)} >
            <div className='flex gap-1 '>
              <Avatar size='small' url={auth.avatar} />
              <div className='hidden flex-col md:flex items-start'>
                <p className='text-xs'>@{auth.username}</p>
                <p className='text-xs text-gray-400'>{auth.firstname} {auth.lastname}</p>
              </div>
            </div>
            {menuOpen ? <XIcon  className='h-6 w-6 text-gray-300'/> 
              : <ChevronDownIcon className='h-6 w-6 text-gray-300' />}
        </button>
        <nav className={`font-semibold items-center gap-6 bg-white p-4 border rounded border-gray-400 z-50 ${ menuOpen ? 'absolute top-20 right-4 z-50' : 'hidden' }` }  >
          <div className=' flex flex-col gap-y-2'>
            <h3 className='uppercase'>Mon espace</h3>
            <hr />
            <Link to='/profil' className='flex gap-1 items-center text-xs hover:underline'><UserCircleIcon className='h-4 w-4'/> Profil</Link>
            <Link to='/account' className='flex gap-1 items-center text-xs hover:underline'><CogIcon className='h-4 w-4'/> Paramètre de compte</Link>
          </div>
          <hr className='bg-gray-500 text-gray-500 my-2'/>
          <button onClick={ logOut } className='flex gap-1 items-center text-xs hover:underline text-orange-500'><LogoutIcon className='h-4 w-4' /> Se déconnecter</button>
        </nav>
    </header>
  )
}

export default Header;