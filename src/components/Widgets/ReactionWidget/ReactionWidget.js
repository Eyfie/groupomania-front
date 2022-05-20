import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


const ReactionWidget = ({Reactions, entity, id}) => {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [reactions, setReactions] = useState([...Reactions]);
  const handleReactions = async ({type}) => {
    try {
      
    
    const reaction = reactions.findIndex((reaction) => reaction.UserId === auth.id)

    if (reaction === -1) {
      const entityId = entity === 'post' ? { PostId: id } : { CommentId: id };
      const body = { UserId: auth.id, ...entityId, type}

      const response = await axiosPrivate.post('/reaction',
      JSON.stringify({...body}),
      {
        headers: {'Content-Type': 'application/json'},
      });

      setReactions(response.data.Reactions);
    }

    if (type === 'like' && reactions[reaction].type === 'like') {
      const response = await axiosPrivate.delete(`/reaction/${reactions[reaction].id}`,
      {
          headers: { 'Content-Type': 'application/json' },
      });

      setReactions(response.data.Reactions);
    }

    if (type === 'dislike' && reactions[reaction].type === 'dislike') {
      const response = await axiosPrivate.delete(`/reaction/${reactions[reaction].id}`,
      {
          headers: { 'Content-Type': 'application/json' },
      });

      setReactions(response.data.Reactions);
    }

    if (type === 'like' && reactions[reaction].type === 'dislike') {
      const response = await axiosPrivate.patch(`/reaction/${reactions[reaction].id}`,
      JSON.stringify({ type }),
      {
          headers: { 'Content-Type': 'application/json' },
      });

      setReactions(response.data.Reactions);
    }

    if (type === 'dislike' && reactions[reaction].type === 'like') {
      const response = await axiosPrivate.patch(`/reaction/${reactions[reaction].id}`,
      JSON.stringify({ type }),
      {
          headers: { 'Content-Type': 'application/json' },
      });

      setReactions(response.data.Reactions);
    }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='reaction-widget'>
      <div className='reaction-widget__reaction'>
      <FontAwesomeIcon 
        icon={ faCircleUp } 
        onClick={() => handleReactions({type: 'like'})} 
        className={`${reactions
                    .find((reaction) => reaction.UserId === auth.id && reaction.type === 'like') !== undefined ? 
                      'selected' 
                      : undefined}`} 
        />
        <p>
          { reactions.filter((reaction) => reaction.type === 'like').length }
        </p>
      </div>
      <div className='reaction-widget__reaction'>
        <FontAwesomeIcon 
        icon={ faCircleDown } 
        onClick={ () => handleReactions({type: 'dislike'}) } 
        className={ `${reactions
                        .find((reaction) => reaction.UserId === auth.id && reaction.type === 'dislike') === undefined ? 
                        null 
                        : `selected` }` } 
        />
        
        <p>
          { reactions.filter((reaction) => reaction.type === 'dislike').length }
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