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
      <p>ListSingleUers</p>
      <p>{user.name}</p>
      <p>{user.email}</p>
    <NavLink to={`/admin/users/${user._id}/edit`}>Update User</NavLink>
    </div>
  )
}

export default ListSingleUser
