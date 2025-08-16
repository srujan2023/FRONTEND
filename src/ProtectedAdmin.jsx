import React from 'react'
import { useAuthStore } from './stores/authStore'
import { Navigate, Outlet } from 'react-router'

const ProtectedAdmin = () => {
    const user = useAuthStore(state =>state.user)

    if(user.role !== 'admin'){
        return <Navigate to='/blog'/>
    }
  return (
   <Outlet/>
  )
}
export default ProtectedAdmin
