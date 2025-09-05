import React from 'react'
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router"
import { useAuthStore } from "../../src/stores/authStore";

function ListSingleUser(){
          const token = useAuthStore(state => state.token)
    const [user,setUsers]= useState({})
    const params = useParams();


     const getSingleUser = async() =>{
        try {
          const response = await fetch (`http://localhost:5000/api/blog/users/${params.userId}`,{
                 method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
          })  

          const data = await response.json();

          console.log(data);

          setUsers(data.user)
          
        } catch (error) {
            console.log(error);
            
        }
    }
  
    useEffect(()=>{
        getSingleUser()
    },[])


  return (
    <div>
     <b> <p className='text-center bg-blue-400 h-10 py-2 pl-10 '>SingleUers</p></b>
     <div className='text-center py-29 bg-stone-300 h-112 border  w-260'>
       <p className='py-1.5'>Name: {user.name}</p>
      <p className='pb-3.5 '>Email: {user.email}</p>
    <NavLink className='bg-green-400 px-1.5 rounded-4xl py-1' to={`/admin/users/${user._id}/edit`}>Update User</NavLink> 
     </div>
    </div>
  )
}

export default ListSingleUser
