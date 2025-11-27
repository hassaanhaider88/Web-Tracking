import React, { useState } from 'react'
import API from '../utils/api'
import { useAuthStore } from '../store/auth'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { connectSocket } from '../store/socket'

export default function Login(){
  const [form,setForm]=useState({email:'',password:''})
  const setAuth = useAuthStore(s=>s.setAuth)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await API.post('/auth/login', form)
      const { token, user } = res.data
      setAuth(user, token)
      connectSocket() // connect after login
      toast.success('Logged in')
      nav('/dashboard')
    }catch(err){
      console.error(err)
      toast.error(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input className="input mt-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button className="mt-4 btn primary w-full" type="submit">Login</button>
        <div className="mt-3 text-sm">No account? <Link to="/signup" className="text-blue-600">Sign up</Link></div>
      </form>
    </div>
  )
}
