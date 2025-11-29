import { AiOutlineLogin } from "react-icons/ai"; 
import { RiLockPasswordFill } from "react-icons/ri"; 
import { AiOutlineMail } from "react-icons/ai"; 
import React, { useState } from 'react'
import API from '../utils/api'
import { useAuthStore } from '../store/auth'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { connectSocket } from '../store/socket'

export default function Login(){
  const [form,setForm]=useState({email:'',password:''})
  const [IsFormSubmiting, setIsFormSubmiting] = useState(false);
  const setAuth = useAuthStore(s=>s.setAuth)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault();
    setIsFormSubmiting(true)
    try{
      const res = await API.post('/auth/login', form)
      const { token, user } = res.data
      setAuth(user, token)
      connectSocket() // connect after login
      toast.success('Logged in');
      setIsFormSubmiting(false)
      nav('/dashboard')
    }catch(err){
      console.error(err)
      toast.error(err.response?.data?.error || 'Login failed');
      setIsFormSubmiting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input className="input mt-2" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button className="mt-4 btn primary w-full" type="submit">Login</button>
        <div className="mt-3 text-sm">No account? <Link to="/signup" className="text-blue-600">Sign up</Link></div>
      </form> */}
      <form onSubmit={submit} className="flex flex-col items-center text-sm text-slate-800">
            <h1 className="text-4xl font-bold py-4 text-center">Let’s Come Back!</h1>
            <p className="max-md:text-sm text-gray-500 pb-10 text-center">
                Or have any issue to login please <Link to={'/contact'} className="text-indigo-600 hover:underline">Contact</Link> us
            </p>
            
            <div className="max-w-96 w-full px-4">
                <label htmlFor="name" className="font-medium">Email</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <AiOutlineMail size={20}/>
                    <input className="input h-full px-2 w-full outline-none bg-transparent" placeholder="Email here " type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
                </div>
        
                <label htmlFor="email-address" className="font-medium mt-4">Your Password</label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                    <RiLockPasswordFill size={20}/>
                    <input className="input h-full px-2 w-full outline-none bg-transparent" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
                </div>
        
                
                <button type="submit" className={`${IsFormSubmiting ? "cursor-not-allowed" : "cursor-pointer"} flex items-center justify-center gap-1 mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2.5 w-full rounded-full transition`}>
                   {IsFormSubmiting ? "Logging in...": "Log In"}
                    <AiOutlineLogin size={22}/>
                </button>
                <p className="mt-3">Don't have an account? <Link to={'/signup'} className="text-indigo-600 hover:underline">Sign up</Link></p>
            </div>
        </form>
    </div>
  )
}
