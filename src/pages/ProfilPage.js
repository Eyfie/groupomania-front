import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/Header'

const ProfilPage = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <h1 className='title-h1'>Paramètre de votre compte</h1>
        <nav>
          <Link to='account'>Compte</Link>
          <Link to='edit'>Profil</Link>
        </nav>

        <Outlet />
      </main>
    </>
  )
}

export default ProfilPage