import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router'
import { useAuthStore } from '../src/stores/authStore'

const Editprofile = () => {
  const user = useAuthStore(state=>state.user);
  const updateProfile = useAuthStore(state=>state.updateProfile)  

    const [name,setName] = useState('')
    const Navigate = useNavigate()

    const submitForm = async (e)=>{
      e.preventDefault()
      updateProfile(name)
      Navigate('/myprofile')
    }


  return (
    <>
<b> <h1 className='text-center bg-blue-400 h-10 pt-2'>Edit Profile</h1>  </b>   
   <form className='bg-stone-300 h-100 text-center' onSubmit={submitForm}>
     <div  >
       <input className='pt-10 pl-20 pb-8.5' type='text' defaultValue={user.name} onChange={(e)=>setName(e.target.value)} />
       <br></br>
      <button className='bg-green-400 px-1.5 rounded-4xl   '>Update Profile</button>
     </div>
    </form>
    </>
  )
}

export default Editprofile
