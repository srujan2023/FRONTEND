import { useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router"
import { useAuthStore } from "./stores/authStore"
import Header from "./components/Header"

function App(){

   const getProfile = useAuthStore(state => state.getProfile)

  useEffect(()=>{
 getProfile()
  },[])

  return(
    <>
    <Header />
    <Outlet />

    </>
  )
}
export default App