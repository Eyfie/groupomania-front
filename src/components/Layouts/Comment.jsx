import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import ReactionWidget from '../Widgets/ReactionWidget'
import TimeWidget from '../Widgets/TimeWidget'
import UserWidget from '../Widgets/UserWidget'
import ReportWidget from '../Widgets/ReportWidget'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import { XCircleIcon } from '@heroicons/react/solid'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import EditComment from '../Form/Comment/EditComment'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'


const Comment = ({ id, media, textcontent, createdAt, updatedAt, UserId, User, Reactions=[], Reports, setComments }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [editMode, setEditMode] = useState(false);
  const [ reactions, setReactions ] = useState(Reactions);



  const deleteComment = async () => {
    try {
      const response = await axiosPrivate.delete(`/comment/${id}`, 
    {
       headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (!response) throw new Error('Le serveur ne répond pas');

    setComments((prev) => prev.filter((unit) => unit.id !== id));
    } catch (error) {
      if (error.response.status === 401) return toast.warning(`Vous n'êtes pas autorisé à effectuer cette action`);
      navigate('/login', { state: { from: location}, replace: true })
    }
  }
  
  const modify = () => {
    setEditMode(!editMode);
  }

  return (
    <article className='p-6 border rounded border-slate-400 bg-white hover:border-slate-900 ease-in-out duration-100 shadow-sm'>
      <div className='flex justify-between'>
        <UserWidget {...User} />
        <TimeWidget createdAt={createdAt} updatedAt={updatedAt} />
      </div>

      {editMode ? 
        <EditComment id={id} textcontent={textcontent} User={User} UserId={UserId} media={media} edit={modify} setComments={setComments} />
        :
        <div>
          { media === null || media === undefined || media === '' ?      
              <p className='font-noto ml-3'>{textcontent}</p>
              : 
              <>
                <p className='font-noto'>{textcontent}</p>
                <div className='mx-auto mt-8 bg-gray-50'>
                  <img className='mx-auto max-h-[200px] object-contain' crossOrigin='anonymous' src={media} alt='Illustration du post'/>
                </div>
              </>
          }
        </div>
      }

      <div className='flex justify-between px-4 pt-2 items-center'>

        <div>
          <ReactionWidget Reactions={reactions} setReactions={setReactions} entity='comment' id={id} />
        </div>

        <div>
        { auth.role === 'moderator' || auth.id === UserId ? 
            <div className='flex gap-2 items-center text-gray-500'>
               <p className={`cursor-pointer flex hover:text-slate-900 ease-in-out duration-300 ${editMode ? 'orange-button rounded-full py-1 px-2' : ''}`} onClick={ () => modify() }>
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
              <TrashIcon className='h-6 w-6 cursor-pointer hover:text-slate-900 ease-in-out duration-300' onClick={ () => deleteComment() } />
            </div> 
            : 
            <div className=''><ReportWidget Reports={Reports} entity='comment' id={id}/></div>
        }
        </div>
      </div>

    </article>
  )
}

export default Comment