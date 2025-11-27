import React, { useEffect, useState } from 'react'
import API from '../utils/api'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { connectSocket } from '../store/socket'

export default function Dashboard(){
  const [projects, setProjects] = useState([])
  const token = useAuthStore(s=>s.token)

  useEffect(()=>{
    if(token) connectSocket()
    fetchProjects()
  },[])

  async function fetchProjects(){
    try{
      const res = await API.get('/mywebsites')
      setProjects(res.data.projects||[])
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link to="/projects/new" className="btn">New Project</Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p=>(
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{p.name}</h3>
            <div className="text-sm text-gray-600">{p.siteUrl}</div>
            <div className="mt-2">
              <span className="text-xs text-gray-500">API Key:</span>
              <div className="flex items-center space-x-2 mt-1">
                <code className="bg-gray-100 p-1 rounded text-sm">{p.apiKey ? p.apiKey.slice(0,8)+'...'+p.apiKey.slice(-6) : '—'}</code>
                <Link to={'/projects/'+p._id} className="text-blue-600 text-sm">Open</Link>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-700">Visits: {p.stats?.totalVisits||0}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
