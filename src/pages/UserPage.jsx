/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Header from '../components/Layouts/Header'
import Avatar from '../components/Widgets/AvatarWidget';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Post from '../components/Layouts/Post';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowSmRightIcon } from '@heroicons/react/solid';

const UserPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  
  const axiosPrivate = useAxiosPrivate();
  const [ posts, setPosts ] = useState([]);
  const [user, setUser] = useState({});
  let { userId } = useParams();

  
  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await axiosPrivate.get(`/user/${userId}`)
        if (!response) throw new Error('Utilisateur introuvable')
        if (response && response.data) setUser(response.data.User)

      } catch (error) {
        if (error.response.status === 404) {
          toast.error(`Cet utilisateur n'existe pas`)
          return navigate('/', { replace: true })
        }
        navigate('/login', { state: { from: location}, replace: true })
      }
    }

    fetchUser(userId);
  },[])
  
  
  useEffect( () => {
    const fetchPosts = async (userId) => {
      try {
        const response = await axiosPrivate.get(`/post`);
        if (!response) throw new Error('A rien du tout');
        if (response && response.data) {
         
          const userPosts = response.data.Posts.filter((post) => post.UserId === parseInt(userId, 10))
          setPosts(userPosts);
        }

      } catch (error) {
        navigate('/login', { state: { from: location}, replace: true })
      }
    }
    fetchPosts(userId);

  }, []);


  return (
    <>
      <Header />
      <main className={`bg-gray-200 flex flex-col gap-3 min-h-screen h-full`}>
        <div className='flex bg-grouporange-900 rounded-b'>
          <div className='px-5 mt-24 bg-white flex flex-1 flex-col rounded-b'>
            <div className='flex pb-3'>
              <div className='mt-[-4rem]'>
                <Avatar url={user.avatar} size='large' className='border-2'/>
              </div>
              <div className='ml-2'>
                <h1 className='font-ibm font-bold text-3xl'>@{user.username}</h1>
                <h2 className='font-ibm font-semibold'>{user.firstname} {user.lastname}</h2>
              </div>
            </div>
            {user.description ? 
            <p className='py-3 flex items-start gap-3'><ArrowSmRightIcon className='h-4 w-4 shrink-0 mt-1'/> {user.description}</p>
            :
            null
            }
          </div>
        </div>

        <div className='flex flex-col max-w-5xl w-screen mx-auto'>
           {posts.length === 0 ? 
            <div>
              <p className='text-center mt-16 font-ibm text-xl font-semibold text-gray-400'>{user.username} n'a pas encore posté de contenu !</p>
            </div>
            :
            <div className='flex flex-col gap-3'>
              {posts.map((post) => (
                      <Post key={ post.id } link={`/post/${post.id}`} { ...post }  setPosts={setPosts}/>
                ))}  
            </div>
          }
        </div>
        <ToastContainer />
      </main>
    </>
  )
}

export default UserPage