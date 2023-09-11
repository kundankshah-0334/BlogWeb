import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar/Navbar'
import ReactQuill from "react-quill"
import { Navigate , useParams} from 'react-router-dom';


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
 


function EditPost() {
    const {id} = useParams();

    const [title , SetTitle] = useState('');
    const [summary , SetSummary] = useState('');
    const [content , SetContent] = useState('');
    const [redirect , SetRedirect] = useState(false);
    const [files , SetFiles] = useState('');



    useEffect(() => {
        fetch("http://localhost:8000/post/" + id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(postInfo => {
                SetTitle(postInfo.title);
                SetSummary(postInfo.summary);
                SetContent(postInfo.content);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Handle the error, e.g., show an error message to the user
            });
    }, [id]);

    
    async function UpdatePost (e) {

        e.preventDefault();
        const data = new FormData();
        data.set('title' , title);
        data.set('summary' , summary);
        data.set('content' , content);
        data.set('id' , id);
        if(files?.[0]){
            data.set('file' , files[0]);
        }
      

        const responce = await fetch('http://localhost:8000/post' , {
            method:'PUT',
            body:data,
            credentials : 'include',
        });
        // console.log(files)

    if(responce.ok){
        SetRedirect(true);
      }
       
    }


    if(redirect){
        return <Navigate to={"/post/"+id} />
    }
  return (
    <>
      <Navbar />
      <div className='create-post'>
      <form onSubmit={UpdatePost}>
      
      <input value={title} onChange={(e) => {SetTitle(e.target.value)}} class="form-control"  type="title" placeholder='Enter title' /> 
      <input value={summary} onChange={(e) => {SetSummary(e.target.value)}} class="form-control" type="summary" placeholder='Enter Summary' />  
      <input type="file" onChange={(e) => {SetFiles(e.target.files)}} /> 
      <ReactQuill theme='snow' value={content} onChange={(newValue) => {SetContent(newValue)}} modules={modules} formats={formats}/>
       <button className='create-post-btn btn btn-success'>Update Post</button>

      </form>

      </div>
        
    </>
  )

   
}

export default EditPost
