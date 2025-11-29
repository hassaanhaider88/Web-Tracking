import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewProject from './pages/NewProject'
import ProjectDetail from './pages/ProjectDetail'
import { useAuthStore } from './store/auth'
import HomePage from './pages/Home'
import MyDashboard from './pages/MyDashboard'

function Protected({ children }) {
  const token = useAuthStore(s => s.token)
  if (!token) return <Navigate to='/login' />
  return children
}

export default function App(){
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Protected><MyDashboard /></Protected>} />
      <Route path="/projects/new" element={<Protected><NewProject /></Protected>} />
      <Route path="/projects/:id" element={<Protected><ProjectDetail /></Protected>} />
      <Route path="/" element={<HomePage />} />
      {/* <Route path='/mydash' element={<MyDashboard/>} /> */}

      {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
    </Routes>
  )
}
