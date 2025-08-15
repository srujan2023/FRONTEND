import React from 'react'
import { NavLink } from 'react-router'

const Home = () => {
  return (
    <div>
      <NavLink to="/blog"> Go to Blog</NavLink>
      <br />
      <br />
        <NavLink to="/admin/blog">Blog</NavLink>
        <br></br>
        <br></br>
          <NavLink to="/blog/login">Login</NavLink>
         <br />
         <br />
            <NavLink to="/blog/Register">Register</NavLink>
            <br />
            <br />
            <NavLink to="/myprofile">Myprofile</NavLink>

    </div>
  )
}

export default Home
