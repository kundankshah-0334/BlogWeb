import React, { useEffect } from 'react'
import { compareAsc, format , formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'

function Post({_id , title , summary , cover , content , createdAt , author}) {

  return (
    <>
    <div className='main '>
     <div className='post'>
        <div className='images'>
        <Link to={`/post/${_id}`}>
            <img src={'http://localhost:8000/'+cover} class="card-img-top" alt="..." />
        </Link>
        </div>
        <div className='texts'>
            <Link to={`/post/${_id}`}>
               <h2>{title }</h2>
            </Link>
            <p className='info'>
                <span className='author'>{author.username}</span>
                <time>{formatISO9075(new Date(createdAt))}</time>
            </p>   

            <p className='summary'>{summary}</p>
        </div>
     </div>
    </div>
    </>
  )
}

export default Post
