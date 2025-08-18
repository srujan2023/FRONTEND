import React, { useEffect, useState } from 'react'
import { Navigate, Link, useNavigate, NavLink } from 'react-router'
import { useAuthStore } from '../src/stores/authStore'

const Myprofile = () => {
  
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
 





  return (
    <>
    <center>
       <div className='profile'>
      <h2>MyProfile</h2> 
     <p>hello-{user.name} </p>
     <p>Email--{user.email}</p>
     <br />
      <NavLink to={'/myprofile/edit'} >Edit Profile</NavLink>
      <button onClick={logout} className='editlink'>Logout</button>
     </div>
    </center>
    </>
  )
}

export default Myprofile
