import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Layouts/Header'
import Post from '../components/Layouts/Post'
import Comment from '../components/Layouts/Comment'
import CreateComment from '../components/Form/Comment/CreateComment'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const PostPage = () => {

  let { postId } = useParams();
  let navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const [ posts, setPosts ] = useState([]);
  const [ comments, setComments ] = useState([]);
  // const { posts, setPosts } = usePosts();
  


  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await axiosPrivate.get(`/post/${postId}`);
        if (!response) throw new Error('Le serveur ne répond pas');
        if (response && response.data) {

          setPosts(response.data.Post);
          setComments(response.data.Post.Comments);

        }
      } catch (error) {
        console.log(error);
      }
      
    }
    fetchPost(postId)
  },[])


  return (
    <div className='bg-gray-200 h-full pb-3'>
      <Header />
      <div className='max-w-5xl mx-auto space-y-3 mt-3'>
        <Post { ...posts } Comments={comments} setPosts={setPosts} postPage/>
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