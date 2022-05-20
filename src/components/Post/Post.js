import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
// import Edit from ''
// import Delete from ''
// import PostReport from ''
// import User from ''
// import PublishTime from ''
// import CommentDisplay from ''
import UserWidget from '../Widgets/UserWidget/UserWidget';
import TimeWidget from '../Widgets/TimeWidget/TimeWidget';
import CommentWidget from '../Widgets/CommentWidget/CommentWidget';
import ReactionWidget from '../Widgets/ReactionWidget/ReactionWidget';
import ReportWidget from '../Widgets/ReportWidget/ReportWidget';
import axios from '../../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'



const Post = (Post) => {

  const { auth } = useAuth()

  const editPost = async () => {

  };

  const deletePost = async () => {
    
     const response = await axios.delete(`/post/${Post.id}`, 
     {
        headers: { 
          'Access-Control-Allow-Origin' : 'http://localhost:3000',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${ auth.accessToken }`,
        },
        withCredentials: true,
     });
  };

  const entity = {entity: 'post'};
  return (
        <article className='post'>
          <div className='post-header'>
            <UserWidget { ...Post.User } />
            <TimeWidget { ...Post.createdAt} { ...Post.updatedAt } />
          </div>
          <div className='post-content'>
            <h2 className='post-content__title'>{ Post.title }</h2>
            { Post.media === null || Post.media === undefined || Post.media === '' ?
                
                <p className='post-content__text'>{Post.textcontent}</p>
                :  <><img className='post-content__image' crossOrigin='anonymous' src={Post.media} alt='Illustration du post'/>
                    <p className='post-content__text'>{Post.textcontent}</p></>
            }
          </div>
          <div className='post-footer'>
            <div className='post-footer__interactions'>
              <CommentWidget { ...Post.Comments }/>
              <ReactionWidget { ...Post} {...entity} />
            </div>
            { auth.role === 'moderator' || auth.id === Post.UserId ? 
            <div className='post-footer__edit'><FontAwesomeIcon icon={ faEdit }  onClick={ () => editPost } /><FontAwesomeIcon icon={ faTrashCan } onClick={() => deletePost() } /></div> 
            : <div className='post-footer__edit'><ReportWidget { ...Post} {...entity}/></div>}
          </div>
        </article>
  )
}

export default Post;