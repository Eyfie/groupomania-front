/* eslint-disable default-case */
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ArrowCircleDownIcon } from '@heroicons/react/solid';
import { ArrowCircleUpIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';


const ReactionWidget = ({setReactions, Reactions=[], entity, id }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  
  const changeReaction = async (reactionId, type) => {
    const response = await axiosPrivate.patch(`/reaction/${reactionId}`,
      JSON.stringify({ type }),
      {
          headers: { 'Content-Type': 'application/json' },
      });

      setReactions(response.data.Reactions);
  }

  const deleteReaction = async (reactionId) => {
    const response = await axiosPrivate.delete(`/reaction/${reactionId}`,
    {
        headers: { 'Content-Type': 'application/json' },
    });

    setReactions(response.data.Reactions);
  }

  const createReaction = async (type) => {

    const entityId = entity === 'post' ? { PostId: id } : { CommentId: id };
    const body = { UserId: auth.id, ...entityId, type}

    const response = await axiosPrivate.post('/reaction',
    JSON.stringify({...body}),
    {
      headers: {'Content-Type': 'application/json'},
    });

    setReactions(response.data.Reactions);
  }

  const handleReaction = ({ type }) => {
    try {

      const reaction = Reactions.findIndex((reaction) => reaction.UserId === auth.id);
    
    if (reaction === -1) return createReaction(type);

    const reactionType = Reactions[reaction].type;
    const reactionId = Reactions[reaction].id;
     
      switch(type) {
      
        case 'like' : {
          switch (reactionType) {
            
            case 'like':  
              deleteReaction(reactionId); 
              break; 
          
            case 'dislike':  
              changeReaction(reactionId, type); 
              break;
          }
          break;
        }

        case 'dislike': {
          switch(reactionType) {
            
            case 'like': 
              changeReaction(reactionId, type)
              break;
            
            case 'dislike': 
              deleteReaction(reactionId)
              break;  
          }
          break;
        }
      }
      
    } catch (error) {
      navigate('/login', { state: { from: location}, replace: true })
    }
    

  }
  
  return (
    <div className='flex gap-2 text-gray-500 hover:bg-gray-100 px-1 rounded'>
      <div className='flex items-center space-x-1 group'>
      <ArrowCircleUpIcon
        onClick={() => handleReaction({type: 'like'})} 
        className={ `h-6 w-6 hover:cursor-pointer
        ${!Reactions || Reactions.findIndex((reaction) => reaction.UserId === auth.id && reaction.type === 'like') === -1 ? 
                      'text-gray-500' 
                      : 'text-grouporange-900'}`} 
        />
        <p className='group-hover:text-slate-900'>
          {!Reactions ? '0' : Reactions.filter((reaction) => reaction.type === 'like').length }
        </p>
      </div>
      <div className='flex items-center space-x-1 group'>
        <ArrowCircleDownIcon 
        onClick={ () => handleReaction({type: 'dislike'}) } 
        className={ `h-6 w-6 hover:cursor-pointer
          ${!Reactions || Reactions.findIndex((reaction) => reaction.UserId === auth.id && reaction.type === 'dislike') === -1 ? 
            'text-gray-500' 
            : 'text-grouporange-900' }` } 
        />
        
        <p className='group-hover:text-slate-900'>
          {!Reactions ? '0' : Reactions.filter((reaction) => reaction.type === 'dislike').length }
        </p>
      </div>
    </div>
  )
}

ReactionWidget.propTypes = {
  Reactions: PropTypes.arrayOf(Object),
  entity: PropTypes.string,
  id: PropTypes.number,
}

export default ReactionWidget;