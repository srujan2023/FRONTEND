import React from 'react'
import { NavLink } from 'react-router'
import { useAuthStore } from '../stores/authStore'

const Header = () => {
    const user = useAuthStore(state=>state.user)
    const logout = useAuthStore(state=>state.logout)
  return (
    <header >
<nav>
     
    
    <div>
 {/* <h3>Srujan Blog</h3> */}
 <div className='navigation'>
          <NavLink to="/">Home</NavLink>
         <NavLink to="/blog">Blog</NavLink>

    {user ? (
       <>
         {user.role==='admin' && (<>
      <NavLink to="/admin/blog">DashBoard</NavLink>


         <NavLink to="/admin/users">Users</NavLink>
</>)}


      <NavLink to="/myprofile">Myprofile</NavLink>
      <button onClick={logout}>Logout</button>
       </>

    ):(<><NavLink to="/blog/Register">Register</NavLink> 
    <NavLink to="/blog/login">Login</NavLink></>)}

        
            
           


 </div>

    </div>
     
    </nav>  
      </header>
  )
}

export default Header
