import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section className='flex flex-col mx-auto gap-3'>
      <h1 className='text-xl font-bold text-center'>Non autorisé</h1>
      <p>Vous n'avez pas les permissions requises</p>
      <button onClick={goBack} className='font-semibold rounded-full gray-button py-1 px-2 hover-button'>Retour à la page précédente</button>
    </section>
  )
}

export default Unauthorized