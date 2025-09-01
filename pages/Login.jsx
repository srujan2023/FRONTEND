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
     
    <center className='py-25 bg-pink-400'>
       
      <form onSubmit={submitLogin} className='border-2 w-70.5 rounded-2xl h-60.5 py-3.5 bg-white'>
        <h2 className='text-2xl pb-8'><b>Login</b></h2>
        <input type="text" className=' border-1 w-45.5 rounded-2xl ' onChange={(e) =>setEmail(e.target.value)} placeholder='Enter Your Email' />
        <br />
        <br />
        <input type="password" className=' border-1 w-45.5 rounded-2xl text-black'  onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
        <br />
        <br />
        <button type='Submit' className='bg-green-400 rounded-2xl w-22'>Login</button>
       
      </form>
    </center>
    </>
  )
}

export default Login
