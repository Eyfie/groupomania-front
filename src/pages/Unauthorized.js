import React from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {

  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section>
      <h1>Unauthorized</h1>
      <p>Vous n'avez pas les permissions requises</p>
      <button onClick={goBack}>Retour à la page précédente</button>
    </section>
  )
}

export default Unauthorized