import React, { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router';
import { useAuthStore } from '../src/stores/authStore';

const Login = () => {

  const login = useAuthStore(state =>state.login)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  const Navigate = useNavigate();

       
     const submitLogin = async (e) =>{
        e.preventDefault()

        login(email,password)
      //Navigate('/blog')
        
     }
         
  return (
    <>
     
    <center className='login'>
       
      <form onSubmit={submitLogin} className='form'>
        <h2>Login</h2>
        <input type="text" onChange={(e) =>setEmail(e.target.value)} placeholder='Enter Your Email' />
        <br />
        <br />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
        <br />
        <br />
        <button type='Submit' className='loginbutton'>Login</button>
       
      </form>
    </center>
    </>
  )
}

export default Login
