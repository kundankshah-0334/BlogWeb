import React, { useEffect, useState } from 'react'
import Post from '../component/post/Post'


function IndexPage() {
    const [posts , SetPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/post').then(responce => {
          responce.json().then(posts => {
            SetPosts(posts);
            // console.log(posts);
          })
        })
    
      },[]);

  return (
     <>
        {posts.length  > 0 && posts.map(post => (
            <Post {...post} />
        ))}

      
     </>
  )
}

export default IndexPage
 