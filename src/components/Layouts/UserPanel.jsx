import React from 'react'
import useAuth from '../../hooks/useAuth'
import Avatar from '../Widgets/AvatarWidget'
import { Link } from 'react-router-dom'

const UserPanel = () => {

  const { auth } = useAuth()

  return (
    <div className='bg-slate-800 border rounded border-slate-400 flex-col pt-24 ml-6 min-w-full'>
      <div className='bg-white flex flex-col items-center font-noto p-3 rounded-b'>
        <div className='mt-[-4rem] border-2 rounded-full border-gray-400'>
          <Avatar url={auth.avatar} size='large' />
        </div>
        <div className='text-center gap-3'>
          <p className='font-semibold'>{ auth.username }</p>
          <p className='text-gray-400'>{ auth.firstname } { auth.lastname }</p>
          <p className='mt-2'>{auth.description}</p>
        </div>
        <Link to='/profil' className='text-center text-white bg-slate-900 p-2 mt-3 w-full rounded-full hover:bg-orange-500 ease-in-out duration-300' >Modifier mon profil</Link>
      </div>
    </div>
  )
}

export default UserPanel