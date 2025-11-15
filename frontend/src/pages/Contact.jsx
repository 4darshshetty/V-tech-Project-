import React, { useState } from "react"
import API from "../utils/api"

export default function Contact(){
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const submit = async e => {
    e.preventDefault();
    await API.post("/contact", form);
    alert("Message sent");
    setForm({ name:"", email:"", message:"" });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <form onSubmit={submit} className="max-w-lg">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 mb-3 border" placeholder="Name" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 mb-3 border" placeholder="Email" />
        <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full p-2 mb-3 border" placeholder="Message" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>
    </div>
  )
}
