import React, { useState } from 'react'
import API from '../utils/api'
import { useAuthStore } from '../store/auth'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
  const [form,setForm]=useState({name:'',email:'',password:''})
  const setAuth = useAuthStore(s=>s.setAuth)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await API.post('/auth/signup', form)
      const { token, user } = res.data
      setAuth(user, token)
      toast.success('Signed up')
      nav('/dashboard')
    }catch(err){
      console.error(err)
      toast.error(err.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Sign up</h2>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="input mt-2" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input className="input mt-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button className="mt-4 btn primary w-full" type="submit">Sign up</button>
        <div className="mt-3 text-sm">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></div>
      </form>
    </div>
  )
}
