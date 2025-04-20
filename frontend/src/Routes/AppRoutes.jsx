import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import Signup from '../pages/Signup.jsx'
import SettingsPage from '../pages/SettingsPage.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'

import { useAuthStore } from '../store/useAuthStore.js'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'

const AppRoutes = () => {

  const {authUser ,checkAuth , isCheckingAuth ,onlineUsers} = useAuthStore()
  
  useEffect(()=>{
   checkAuth()
  },[checkAuth])

  console.log({onlineUsers})
 
   if(isCheckingAuth && !authUser) {
     return  <div className='flex items-center justify-center h-screen'>
 <Loader className='size-10 animate-spin'/>
     </div>
   } 

  //  console.log({authUser})
  return (
    <>
  <Routes>
    <Route path ='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
    <Route path ='/signup' element={!authUser ?<Signup/> : <Navigate to="/"/>}/>
    <Route path ='/login' element={!authUser ?<LoginPage/> : <Navigate to="/"/>}/>
    <Route path ='/settings' element={  <SettingsPage/>}/>
    <Route path ='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
  </Routes>
  <Toaster
  position="top-center"
  reverseOrder={false} /> </>
  )
}

export default AppRoutes