import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Post from '../components/Post/Post'
import UserPanel from '../components/UserPanel'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
// import CreateEntity from ''

const HomePage = () => {

  const [posts, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect( () => {
   
    const fetchPosts = async () => {
      try {
        const response = await axiosPrivate.get('/post');
        if (!response) throw new Error('A rien du tout');
        if (response && response.data) setPosts(response.data.Posts)


      } catch (error) {
        console.log(error)
      }
    }

    fetchPosts();
  },[axiosPrivate]);

  return (
    <>
      <Header />
      <main className='container'>
        <section className='posts'>
          {/* TODO Create createEntity */}
          {/* <div><CreateEntity /></div> */}
          {posts.map((post) => (
            <Post key={ post.id } { ...post } />
          ))}
        </section>
        <aside>
          <UserPanel />
        </aside>
      </main>
    </>
  )
}

export default HomePage