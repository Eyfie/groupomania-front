import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ url, size }) => {
  return (
    <div className={`flex-shrink-0  rounded-full overflow-hidden ${size === 'large' ? 'h-32 w-32' : size === 'small' ? 'h-8 w-8' : 'h-10 w-10' }`}>
      <img 
        src={ url }
        crossOrigin='anonymous' 
        alt='avatar' 
        className={`object-cover  ${size === 'large' ? 'h-32 w-32' : size === 'small' ? 'h-8 w-8' : 'h-10 w-10' }`}
      />
    </div>
  )
}

Avatar.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string,
};


export default Avatar