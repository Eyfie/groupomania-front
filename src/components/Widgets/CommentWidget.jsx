import React from 'react';
import PropTypes from 'prop-types'
import { ChatAltIcon } from '@heroicons/react/outline';

const CommentWidget = ({ Comments=[] }) => {


  return (
    <div className='flex items-center text-gray-500 gap-1 hover:bg-gray-100  hover:text-slate-900 rounded p-1 ease-in-out duration-300 cursor-pointer'>
      <ChatAltIcon className='h-6 w-6' />
          <p>
          {
              Comments.length
          }  
          <span className='hidden sm:contents'> Commentaires</span></p>
    </div>
  )
}

CommentWidget.propTypes = {
  Comments: PropTypes.arrayOf(Object),
};

export default CommentWidget