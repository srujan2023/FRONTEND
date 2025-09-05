import React from 'react'
import { useEffect, useState } from "react"
import { NavLink } from "react-router"
import { useAuthStore } from "../../src/stores/authStore"

const ListUsers = () => {
    const token = useAuthStore(state => state.token)
      
      const [users,setusers] = useState([])

   const getUsers = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/api/blog/users",{
                  method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
                 Authorization:`Bearer ${token}`
             },
        })

            const data = await response.json()

            console.log(data);

            setusers(data.users)
            
        } catch (error) {
           // console.log(error);
            
        }
    }

    useEffect(()=>{
        getUsers()
    },[])
  return (
    
    <div>
      <b ><h1 className='text-center bg-blue-400 h-9 py-1.5'>ListUsers</h1></b>
      <center>
        
      {users ? (
             <div>
         {users.map((user)=>(
          <div className='bg-stone-300 text-center pl-40.5'>
              <div className='border bg-blue-200  rounded-1xl py-1 text-center w-170.5 pl-6 ' key={user._id}>
                <p>Name--{user.name}</p>
                <p>Email--{user.email}</p>
                <p>Role--{user.role}</p>
                <NavLink className="bg-green-400 rounded-4xl px-1.5" to={`/admin/users/${user._id}`}>View User</NavLink>
          
            </div>
          </div>

         ))}
             </div> )
             :(
              <div>
            <p>No Users</p>
            </div>
     
        )}
         </center>
  </div>
  )
}

export default ListUsers
