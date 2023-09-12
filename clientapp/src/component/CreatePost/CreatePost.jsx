import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import ReactQuill from "react-quill"
import { Navigate } from 'react-router-dom';
import "react-quill/dist/quill.snow.css";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const   formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
 

function CreatePost() {
    const [title , SetTitle] = useState('');
    const [summary , SetSummary] = useState('');
    const [content , SetContent] = useState('');
    const [redirect , SetRedirect] = useState(false);
    const [files , SetFiles] = useState('');

    async function createNewPost (e) {
        const data = new FormData();
        data.set('title' , title);
        data.set('summary' , summary);
        data.set('content' , content);
        data.set('file' , files[0]);
        e.preventDefault();

        const responce = await fetch('http://localhost:8000/post' , {
            method:'POST',
            body:data,
            credentials : 'include',
        })
        console.log(files)


    if(responce.ok){
        SetRedirect(true);
      }
      else{
        alert("Invalid credentials");
      }
    }

    if(redirect){
        return <Navigate to={"/"} />
    }
  return (
    <>
      <Navbar />
      <div className='create-post'>
      <form onSubmit={createNewPost}>
      
      <input value={title} onChange={(e) => {SetTitle(e.target.value)}} class="form-control"  type="title" placeholder='Enter title' /> 
      <input value={summary} onChange={(e) => {SetSummary(e.target.value)}} class="form-control" type="summary" placeholder='Enter Summary' />  
      <input type="file" onChange={(e) => {SetFiles(e.target.files)}} /> 
      <ReactQuill value={content} onChange={SetContent} modules={modules} formats={formats}/>
       <button className='create-post-btn btn btn-success mt-2'>Create Post</button>

      </form>

      </div>
        
    </>
  )
}

export default CreatePost
