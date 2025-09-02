import React from 'react'
import { NavLink } from 'react-router'
import { useAuthStore } from '../stores/authStore'

const Header = () => {
    const user = useAuthStore(state=>state.user)
    const logout = useAuthStore(state=>state.logout)
  return (
    <header >
<nav>
     
    
    <div className= ' py-2 flex px-0.5 bg-sky-200 h-10 text-black-500 '>
 <div className='px-7.5'>
          <NavLink to="/">Home</NavLink>
          </div>
          <div className='px-8.5'>
            <NavLink to="/blog">Blog</NavLink>
          </div>
         

    {user ? (
       <>
         {user.role==='admin' && (<>
     <div className='px-7.5'>
       <NavLink to="/admin/blog">DashBoard</NavLink>
     </div>

<div className='px-7.5'>
   
         <NavLink to="/admin/users">Users</NavLink>
</div>
</>)}


   <div className='px-7.5'>   <NavLink to="/myprofile">Myprofile</NavLink></div>
<div className='px-7.5'>
      <button onClick={logout}>Logout</button>
   </div>       </>

    ):(<><div className='px-7.5'>
      <NavLink to="/blog/Register">Register</NavLink> 
    </div>
    <div className='px-7.5'>
      <NavLink to="/blog/login">Login</NavLink></div></>)}
    

        
            
           


 </div>

     
    </nav>  
      </header>
  )
}

export default Header
