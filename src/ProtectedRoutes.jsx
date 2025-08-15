import React from 'react'
import { useAuthStore } from './stores/authStore'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoutes = () => {
    const user = useAuthStore(state =>state.user)

    if(!user){
        return <Navigate to='/blog/login'/>
    }
  return (
   <Outlet/>
  )
}
export default ProtectedRoutes
