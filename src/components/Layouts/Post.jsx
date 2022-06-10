import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import UserWidget from '../Widgets/UserWidget';
import TimeWidget from '../Widgets/TimeWidget';
import CommentWidget from '../Widgets/CommentWidget';
import ReactionWidget from '../Widgets/ReactionWidget';
import ReportWidget from '../Widgets/ReportWidget';
import { Link } from 'react-router-dom';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/solid';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ConditionalWrapper from './ConditionalWrapper';
import EditPost from '../Form/Post/EditPost';



const Post = ({ link, postPage, id, title, textcontent, media, createdAt, updatedAt, UserId, User=[], Comments=[], Reactions=[], Reports=[], setPosts }) => {

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [reactions, setReactions] = useState(Reactions)
  const [editMode, setEditMode] = useState(false);

  const modify = () => {
    setEditMode(!editMode);
  }

  const deletePost = async () => {
    
     const response = await axiosPrivate.delete(`/post/${id}`, 
     {
        headers: { 'Content-Type': 'multipart/form-data' },
     });
     if (!response) throw new Error('Le serveur ne répond pas');
     setPosts((prev) => prev.filter((unit) => unit.id !== id));
  };
  
  return (
        <article className='flex flex-col p-6 border rounded border-slate-400 bg-white hover:border-slate-900 ease-in-out duration-100 shadow-sm'>
          <div className='flex flex-row justify-between items-center'>
            <UserWidget { ...User } />
            <TimeWidget createdAt={createdAt} updatedAt={updatedAt} />
          </div>
          {editMode ? 
            <EditPost id={id} title={title} textcontent={textcontent} media={media} edit={modify} setPosts={setPosts}/>
            :
            <ConditionalWrapper 
            condition={link}
            wrapper={children => <Link to={link}>{children}</Link>}
            >
              <div className='py-4 '>
                <h2 className='font-ibm text-xl font-bold'>{title }</h2>
                <hr className='w-24 py-2'/>
                { media === null || media === undefined || media === '' ?
                    
                    <p className='font-noto'>{textcontent}</p>
                    : <>
                        <p className='font-noto'>{textcontent}</p>
                        <div className='mx-auto mt-8 bg-gray-50'>
                          <img className={`mx-auto object-contain ${link ? 'max-h-[600px]' : null}`} crossOrigin='anonymous' src={media} alt='Illustration du post'/>
                        </div>
                      </>
                }
              </div>
            </ConditionalWrapper>
          }
          <div className='flex items-center pt-2 px-4 justify-between'>
            <div className='flex flex-1 gap-4'>
              <ConditionalWrapper
              condition={link}
              wrapper={children => <Link to={link}>{children}</Link>}
              >
                <CommentWidget Comments={Comments} postPage={postPage}/>
              </ConditionalWrapper>
              <ReactionWidget reactions={reactions} setReactions={setReactions} entity='post' id={id} />
            </div>
            { auth.role === 'moderator' || auth.id === UserId ? 
            <div className='flex gap-2 items-center text-gray-500'>
              <p className={`cursor-pointer flex hover:text-slate-900 ease-in-out duration-300 ${editMode ? 'bg-orange-500 rounded-full py-1 px-2' : ''}`} onClick={ () => modify() }>
                {editMode ?
                  <>
                    <XCircleIcon className='h-6 w-6 text-white'/> <span className='hidden sm:contents text-white'> Annuler</span>
                  </>
                  :
                  <>
                    <PencilAltIcon className='h-6 w-6' /> <span className='hidden sm:contents'>Modifier</span>
                  </>
                }
              </p>
              <TrashIcon className='h-6 w-6 cursor-pointer hover:text-slate-900 ease-in-out duration-300' onClick={() => deletePost() } />
            </div> 
            : <div className=''><ReportWidget Reports={Reports} entity='post' id={id} /></div>}
          </div>
        </article>
  )
}

export default Post;