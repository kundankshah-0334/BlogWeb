import React, { useEffect } from 'react'

function Post({title , summary , cover , content , createdAt}) {

  return (
    <>
    <div className='main '>
     <div className='post'>
        <div className='images'>
            <img src="https://picsum.photos/200/300?random=1" class="card-img-top" alt="..." />
        </div>
        <div className='texts'>
            <h2>{title }</h2>
            <p className='info'>
                <span className='author'>Prem das  </span>
                <time>{createdAt}</time>
            </p>   

            <p className='summary'>{summary}</p>
        </div>
     </div>
    </div>
    </>
  )
}

export default Post
