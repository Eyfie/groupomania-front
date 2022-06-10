import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Layouts/Header'

const ProfilPage = () => {

  let location = useLocation();

  return (
    <>
      <Header />
      <main className='bg-gray-200 flex min-h-screen'>
        <div className=' bg-white  max-w-5xl mx-auto mob:px-10 flex flex-col gap-6 st:min-w-[70vw] min-w-full px-3'>
          <h1 className='font-ibm font-semibold text-2xl mt-6'>Paramètre de votre compte</h1>
          <nav className='flex border-b border-orange-500 gap-3'>
            <Link to='account' className={`font-semibold ${location?.pathname === '/account' ? 'after:h-1 after:bg-orange-500 after:flex'  : '' }` }>Compte</Link>
            <Link to='profil'  className={`font-semibold ${location?.pathname === '/profil' ? 'after:h-1 after:bg-orange-500 after:flex' : '' }` }>Profil</Link>
          </nav>

          <Outlet />
        </div>
        <ToastContainer />
      </main>
    </>
  )
}

export default ProfilPage