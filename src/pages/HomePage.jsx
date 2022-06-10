/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from '../components/Form/Post/CreatePost'
import Header from '../components/Layouts/Header'
import Post from '../components/Layouts/Post'
import UserPanel from '../components/Layouts/UserPanel'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const HomePage = () => {

  const [posts, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect( () => {
    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get('/post');
        
        if (!response) throw new Error('A rien du tout');
        if (response && response.data) setPosts(response.data.Posts);


      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <main className={`bg-gray-200 flex st:px-3 py-5 ${posts.length > 3 ? 'h-full' : 'h-screen'}`}>
        <div className='flex mx-auto max-w-5xl'>
          <section className={`flex flex-col gap-3 st:max-w-2xl w-screen px-1`}>
            <CreatePost setPosts={setPosts}/>
            <div id='main-content' className='flex flex-col gap-3'>
              {posts.map((post) => (
                  <Post key={ post.id } link={`/post/${post.id}`} { ...post } setPosts={setPosts}/>
              ))}
            </div>
          </section>
          <aside className='gap-3 st:flex flex-col hidden w-[16rem]'>
            <UserPanel />
          </aside>
        </div>
        <ToastContainer />
      </main>
    </>
  )
}

export default HomePage