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
         
        // navigate('/blog/login')
        }
  return (
    <>
     
    <div className='bg-stone-300 h-105 pt-23  pl-91'>
       <center className='border w-66 h-60 bg-white rounded-4xl '> 
       <form onSubmit={submitRegister} className=''>
        <b> <h2 className='pt-1.5'>Register</h2></b>
        <input type="text" onChange={(e)=> setName(e.target.value)} placeholder='Enter Your name' />
        <br />
        <br />
        <input type="text" onChange={(e) =>setEmail(e.target.value)} placeholder='Enter Your Email' />
        <br />
        <br />
        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' />
        <br />
        <br />
        <button  className="bg-red-400 rounded-4xl px-1.5" type='Submit'>Register</button>
<div className='py-2.5'>
        <NavLink className="bg-green-400 rounded-4xl px-1.5" to="/blog/login" >Login</NavLink>
  
  </div>      </form>
     </center>
    </div>
    </>
  )
}

export default Register
