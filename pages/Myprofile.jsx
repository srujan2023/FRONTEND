import React, { useEffect, useState } from 'react'
import { Navigate, Link, useNavigate, NavLink } from 'react-router'
import { useAuthStore } from '../src/stores/authStore'

const Myprofile = () => {
  
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
 





  return (
    <>
    <center>
       <div className=' bg-stone-300 pb-65 pt-23'>
    <div className='border w-65 h-50 bg-white rounded-4xl'>
     <b><h2 className='py-2.5'>MyProfile</h2> </b> 

       <p className='py-2.5'> hello-{user.name} </p>
     <p>Email--{user.email}</p>
     <br />
      <NavLink className='px-2.5 rounded-4xl bg-green-400' to={'/myprofile/edit'} >Edit Profile</NavLink>
      <button  onClick={logout} className='px-2.5 rounded-4xl bg-red-500'>Logout</button>
    </div>
     </div>
    </center>
    </>
  )
}

export default Myprofile
