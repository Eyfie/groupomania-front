import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Layouts/Header'
import UserWidget from '../components/Widgets/UserWidget'
import ReactionWidget from '../components/Widgets/ReactionWidget'
import CommentWidget from '../components/Widgets/CommentWidget'
import TimeWidget from '../components/Widgets/TimeWidget'
import Comment from '../components/Layouts/Comment'
import EditPost from '../components/Form/Post/EditPost'
import ReportWidget from '../components/Widgets/ReportWidget'
import { XCircleIcon } from '@heroicons/react/solid'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import CreateComment from '../components/Form/Comment/CreateComment'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth'

const PostPage = () => {

  let { postId } = useParams();
  let navigate = useNavigate();

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [ post, setPost ] = useState([]);
  const [ comments, setComments ] = useState([]);
  const [ reactions, setReactions ] = useState([]);
  const [ editMode, setEditMode ] = useState(false);
  


  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await axiosPrivate.get(`/post/${postId}`);
        if (!response) throw new Error('Le serveur ne répond pas');
        if (response && response.data) {
          setPost(response.data.Post);
          setComments(response.data.Post.Comments);
          setReactions(response.data.Post.Reactions);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) navigate('/', { replace: true })
      }
      
    }
    fetchPost(postId)
  },[])


  const modify = () => {
    setEditMode(!editMode);
  }

  const deletePost = async () => {
    try {
      const response = await axiosPrivate.delete(`/post/${post.id}`, 
     {
        headers: { 'Content-Type': 'multipart/form-data' },
     });
     if (!response) throw new Error('Le serveur ne répond pas')
     setPost((prev) => prev.filter((unit) => unit.id !== post.id));
     navigate('/', { replace: true });
    } catch (error) {
      if (error.response.status === 401) toast.warning(`Vous n'êtes pas autorisé à effectuer cette action`);
    }
  };


  return (
    <div className='bg-gray-200 h-full pb-3'>
      <Header />
      <div className='max-w-5xl mx-auto space-y-3 mt-3'>
        <article className='flex flex-col p-6 border rounded border-slate-400 bg-white hover:border-slate-900 ease-in-out duration-100 shadow-sm'>
            <div className='flex flex-row justify-between items-center'>
              <UserWidget { ...post.User } />
              <TimeWidget createdAt={post.createdAt} updatedAt={post.updatedAt} />
            </div>
            {editMode ? 
              <EditPost id={post.id} title={post.title} textcontent={post.textcontent} media={post.media} User={post.User} UserId={post.UserId} edit={modify} setPosts={setPost}/>
              :
              <div className='py-4 '>
                <h2 className='font-ibm text-xl font-bold'>{post.title }</h2>
                <hr className='w-24 py-2'/>
                { post.media === null || post.media === undefined || post.media === '' ?
                    
                    <p className='font-noto'>{post.textcontent}</p>
                    : <>
                        <p className='font-noto'>{post.textcontent}</p>
                        <div className='mx-auto mt-8 bg-gray-50'>
                          <img className='mx-auto object-contain' crossOrigin='anonymous' src={post.media} alt='Illustration du post'/>
                        </div>
                      </>
                }
              </div>
            }
            <div className='flex items-center pt-2 px-4 justify-between'>
              <div className='flex flex-1 gap-4'>
                <CommentWidget Comments={comments} />
                <ReactionWidget Reactions={reactions} setReactions={setReactions}  entity='post' id={post.id} />
              </div>
              { auth.role === 'moderator' || auth.id === post.UserId ? 
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
              : <div className=''><ReportWidget Reports={post.Reports} entity='post' id={post.id} /></div>}
            </div>
          </article>
        <CreateComment postId={ postId } setComments={setComments}/>
        <section className='space-y-3'>
            {comments.length !== 0 ? 
              comments.slice(0).reverse().map((comment) => <Comment key={ comment.id } { ...comment } setComments={setComments} />)
              :
              <p className='text-center h-40 p-6 font-ibm text-xl font-semibold text-gray-400'>Aucuns commentaires</p>
            }
        </section>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PostPage