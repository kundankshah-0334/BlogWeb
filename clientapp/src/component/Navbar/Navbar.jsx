import React, { useState }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import {Link} from "react-router-dom"

function Navbar() {


  const [username , SetUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8000/profile', {
      credentials : 'include',
    }).then(responce => {
      responce.json().then(userInfo => {
        SetUsername(userInfo.username);
      })
    })
  } , [])

  function logout () {
    fetch('http://localhost:8000/logout' , {
      method: 'POST',
      credentials : 'include',
    });
    SetUsername(null);
  }

  return (
    <>
    <div className='main'>
      <nav class="navbar navbar-expand-lg  background-navbar-change">
        <div class="container-fluid">
            <Link class="navbar-brand" to="/">MyBlog</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        { username && (
                          <>
                            <li class="nav-item">
                            <Link class="nav-link" to="/create">Create New Post</Link>
                            </li>

                            <li class="nav-item">
                            <Link class="nav-link" onClick={logout} >Logout</Link>
                            </li>
                          </>
                        )}
                        { !username && (
                          <>
                            <li class="nav-item">
                            <Link class="nav-link" to="/login">Login</Link>
                            </li>

                            <li class="nav-item">
                            <Link class="nav-link" to="register">Register</Link>
                            </li>
                          </>
                          )
                        }
                    </ul>
                </div>
        </div>
      </nav>
    </div>
    </>
  )
}

export default Navbar
