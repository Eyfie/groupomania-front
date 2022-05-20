import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const UserWidget = ({id, avatar, username, firstname, lastname}) => {
  return (
    <Link to={`/user/${id}`}>
      <div className='user-widget'>
        <img crossOrigin='anonymous' src={avatar} className='user-widget__avatar' alt='Avatar utilisateur'/>
        <div className='user-widget__information'>
          <p className='user-widget__information__username'>@{username}</p>
          <p className='user-widget__information__name'>{firstname} {lastname}</p>
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