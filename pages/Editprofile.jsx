import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router'
import { useAuthStore } from '../src/stores/authStore'

const Editprofile = () => {
  const user = useAuthStore(state=>state.user);
  const updateProfile = useAuthStore(state=>state.updateProfile)  

  //Navigate = useNavigate()

    const [name,setName] = useState('')

    const submitForm = async (e)=>{
      e.preventDefault()
      updateProfile(name)
    }


  return (
    <>
     <h1>Edit Profile</h1> 
    <form onSubmit={submitForm}>
      <input type='text' defaultValue={user.name} onChange={(e)=>setName(e.target.value)} />
      <button>Update Profile</button>
    </form>
    </>
  )
}

export default Editprofile
