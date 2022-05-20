import React from 'react'
import useAuth from '../hooks/useAuth'

const UserPanel = () => {

  const { auth } = useAuth()

  return (
    <div className='user-panel'>
      <div className='user-content'>
        <div className='user-avatar'>
          <img src={auth.avatar} className='user-avatar__img' alt='Votre avatar' crossOrigin='anonymous'/>
        </div>
        <div className='user-information'>
          <p className='user-information__username'>{ auth.username }</p>
          <p className='user-information__realname'>{ auth.firstname } { auth.lastname }</p>
          <p className='user-information__description'>{auth.description}</p>
        </div>
      </div>
    </div>
  )
}

export default UserPanel