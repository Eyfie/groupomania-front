import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const CommentWidget = (Comments) => {
  return (
    <div className='comment-widget'>
      <FontAwesomeIcon className='comment-widget__icon' icon={ faComment } />
      <p className='comment-widget__content'>
        {Comments.length === null || Comments.lenght === undefined || Comments.length === 0 ?
          0 
          : Comments.length} Commentaires</p>
    </div>
  )
}

export default CommentWidget