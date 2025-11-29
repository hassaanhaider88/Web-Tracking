import React, { useState } from "react";
import API from "../utils/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewProject() {
  const [form, setForm] = useState({ name: "", siteUrl: "" });
  const [IsFormSubmiting, setIsFormSubmiting] = useState(false);

  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setIsFormSubmiting(true);
    try {
      const res = await API.post("/projects", form);
      toast.success("Project created");
      nav("/dashboard");
      setIsFormSubmiting(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed");
      setIsFormSubmiting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <form className="bg-white p-6 rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl font-bold mb-4">New Project</h2>
        <input className="input" placeholder="Project name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="input mt-2" placeholder="https://example.com" value={form.siteUrl} onChange={e=>setForm({...form,siteUrl:e.target.value})} required />
        <button className="mt-4 btn primary w-full" type="submit">Create</button>
      </form> */}
      <form
        onSubmit={submit}
        className="flex flex-col items-center text-sm text-slate-800"
      >
        <h1 className="text-4xl font-bold py-4 text-center">
          Let’s Create Site
        </h1>

        <div className="max-w-96 w-full px-4">
          <label htmlFor="Sitename" className="font-medium">
            Site Name
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-orange-400 transition-all overflow-hidden">
            <input
              className="input h-full px-2 w-full outline-none bg-transparent "
              placeholder="Site Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <label htmlFor="email-address" className="font-medium mt-4">
            Site Live URL
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-orange-400 transition-all overflow-hidden">
            <input
            type="url"
              className="input input h-full px-2 w-full outline-none bg-transparent"
              placeholder="https://example.com"
              value={form.siteUrl}
              onChange={(e) => setForm({ ...form, siteUrl: e.target.value })}
              required
            />
          </div>

          <button
            disabled={IsFormSubmiting}
            type="submit"
            className={`${
              IsFormSubmiting ? "cursor-not-allowed" : "cursor-pointer"
            } flex items-center justify-center gap-1 mt-5 bg-orange-500 hover:bg-orange-600 text-white py-2.5 w-full rounded-full transition`}
          >
            {IsFormSubmiting ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="cursor-pointer flex items-center justify-center gap-1 mt-2 bg-white text-black border border-orange-600  py-2.5 w-full rounded-full transition"
          >
            Cencel
          </button>
        </div>
      </form>
    </div>
  );
}
