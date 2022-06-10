import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Avatar from './AvatarWidget';

const UserWidget = ({id, avatar, username, firstname, lastname}) => {
  return (
    <Link to={`/user/${id}`} className='group'>
      <div className='flex items-center gap-1 p-2 group-hover:bg-gray-100 rounded ease-in-out duration-300'>
        <Avatar  url={ avatar } size='small'/>
        <div className='flex-col items-start '>
          <p className='text-xs group-hover:text-slate-900 truncate'>@{username}</p>
          <p className='text-xs text-gray-400 group-hover:text-slate-900 ease-in-out duration-300 truncate'>{firstname} {lastname}</p>
        </div>
      </div>
    </Link>
  )
}

UserWidget.propTypes = {
  id: PropTypes.number,
  avatar: PropTypes.string,
  username: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
}

export default UserWidget;