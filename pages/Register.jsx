import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router';
import { useAuthStore } from '../src/stores/authStore';

const Register = () => {
    const register = useAuthStore(state =>state.register)
    const [name,setName] = useState('');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

     const submitRegister = async (e) =>{
        e.preventDefault()
         
         register(name,email,password)   
        }
  return (
    <>
     
     <center className='center'>
       <form onSubmit={submitRegister} className='form1'>
         <h2>Register</h2>
        <input type="text" onChange={(e)=> setName(e.target.value)} placeholder='Enter Your name' />
        <br />
        <br />
        <input type="text" onChange={(e) =>setEmail(e.target.value)} placeholder='Enter Your Email' />
        <br />
        <br />
        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
        <br />
        <br />
        <button type='Submit' className='register'>Register</button>
        <NavLink to="/blog/login" className='lbutton'>Login</NavLink>
      </form>
     </center>
    </>
  )
}

export default Register
