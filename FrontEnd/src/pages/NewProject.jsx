import React, { useState } from 'react'
import API from '../utils/api'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function NewProject(){
  const [form,setForm]=useState({name:'',siteUrl:''})
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await API.post('/projects', form)
      toast.success('Project created')
      nav('/dashboard')
    }catch(err){
      console.error(err)
      toast.error(err.response?.data?.error || 'Failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">New Project</h2>
        <input className="input" placeholder="Project name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="input mt-2" placeholder="https://example.com" value={form.siteUrl} onChange={e=>setForm({...form,siteUrl:e.target.value})} required />
        <button className="mt-4 btn primary w-full" type="submit">Create</button>
      </form>
    </div>
  )
}
