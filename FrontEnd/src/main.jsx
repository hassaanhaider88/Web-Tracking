import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { Toaster } from 'react-hot-toast'
import UserContextProvider from './store/UserContext'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </UserContextProvider>
)
