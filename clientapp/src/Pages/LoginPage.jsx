import React, { useState } from 'react'
import Navbar from '../component/Navbar/Navbar'
import { Navigate } from 'react-router-dom';

function LoginPage() {
 
  const [username , SetUsername] = useState("");
    const [password , SetPassword] = useState("");
    const [redirect , SetRedirect] = useState(false);
     async function login(e){
   
      e.preventDefault();
      const responce = await fetch("http://localhost:8000/login" ,{
      method: "POST",
      body : JSON.stringify({username , password}),
      headers : {'Content-Type':'application/json'},
      credentials:'include',
      });

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
      <main className="login-main main">
      <Navbar />
      <div className="main">
      <h1 className='text-center mt-4'>Login</h1>
      <form className='login'>
        <div class="mb-3">
          <input type="text" value={username} onChange={(e) => {SetUsername(e.target.value)}} class="form-control" placeholder='Username'/>
        </div>
        <div class="mb-3">
          <input type="password" value={password} onChange={(e) => {SetPassword(e.target.value)}} class="form-control" placeholder='Password' />
        </div>
        <button type="submit" onClick={login} class="btn btn-secondary mt-2">Login</button>
      </form>
      </div>
    </main>
    </>
  )
}

export default LoginPage
