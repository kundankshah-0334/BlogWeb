import React, { useEffect , useState } from 'react'
import Navbar from '../component/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'

function PostPage() {
    const [postInfo , SetPostInfo] = useState(null);
const {id} = useParams();
useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`)
    .then(response => {
        response.json().then(postInfo => {
        SetPostInfo(postInfo);
    })
})
    } , [])


    const [userid , SetUsername] = useState(null);
    useEffect(() => {
      fetch('http://localhost:8000/profile', {
        credentials : 'include',
      }).then(responce => {
        responce.json().then(userInfo => {
          SetUsername(userInfo.id);
        })
      })
    } , [])

    if(!postInfo) return "";
  return (
    <>
    <Navbar />
    <div className='create-post'>
        <h2 className='heading-post'>
            {postInfo.title}
        </h2>
        <div className='timeanduser'>
              <p className='time'>{formatISO9075(new Date(postInfo.createdAt))}</p>
            <p className='user'>by @ {postInfo.author ? postInfo.author.username : 'Unknown Author'}</p>
        </div>
        {
        postInfo.author && userid === postInfo.author._id && (
            <div className='editpostdiv'>
           
              <Link className='edit-post-btn btn-primary' to={`/edit/${postInfo._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post</Link>
            </div>
        )
        }
        <div className='post-image'>
        <img src={`http://localhost:8000/${postInfo.cover}`} alt='Loading....' />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content}} />
    </div>
    </>
  )
}

export default PostPage
