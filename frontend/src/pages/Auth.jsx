import React, { useState } from "react"
import API from "../utils/api"
import { useNavigate } from "react-router-dom"

const initialForm = { name: "", email: "", password: "" }

export default function Auth(){
  const [mode, setMode] = useState("login")
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  function updateField(field, value){
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      if(mode === "signup"){
        await API.post("/auth/signup", form)
        alert("Signup successful. Please login.")
        setMode("login")
        setForm({ ...initialForm, email: form.email })
      }else{
        const res = await API.post("/auth/login", { email: form.email, password: form.password })
        localStorage.setItem("vtech_token", res.data.token)
        localStorage.setItem("vtech_user", JSON.stringify(res.data.user))
        if(res.data.user.role === "admin"){
          nav("/admin")
        }else{
          nav("/home")
        }
      }
    }catch(err){
      alert(err.response?.data?.msg || err.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.5),_transparent_55%)]" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute -right-24 top-1/2 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl lg:flex lg:flex-col lg:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-indigo-200">Welcome back</span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight">Experience the next generation of tech solutions with VTECH</h1>
              <p className="mt-4 text-sm text-indigo-100/80">
                Sign in to manage your profile, explore the latest products and stay updated with the newest innovations.
              </p>
            </div>
            <ul className="mt-10 space-y-4 text-sm text-indigo-100/80">
              {["Secure authentication","Exclusive insider news","Priority support"].map(point => (
                <li key={point} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200"><span className="text-lg">•</span></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold">{mode === "login" ? "Login" : "Create account"}</h2>
                <p className="mt-2 text-sm text-indigo-100/70">Join the VTECH ecosystem to personalise your experience.</p>
              </div>
              <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1 text-xs uppercase tracking-widest text-indigo-200">
                {mode === "login" ? "Returning user" : "New member"}
              </div>
            </div>

            {mode === "signup" && (
              <div className="mb-4">
                <label className="text-xs uppercase tracking-widest text-indigo-100/60">Full name</label>
                <input
                  placeholder="Jane Doe"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:bg-white/10"
                  value={form.name}
                  onChange={e=>updateField("name", e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <label className="text-xs uppercase tracking-widest text-indigo-100/60">Email</label>
              <input
                type="email"
                placeholder="you@vtech.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:bg-white/10"
                value={form.email}
                onChange={e=>updateField("email", e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-indigo-100/60">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:bg-white/10"
                value={form.password}
                onChange={e=>updateField("password", e.target.value)}
                required
              />
            </div>


            <button
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-400 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 disabled:opacity-60"
            >
              {loading ? 'Please wait...' : mode === "login" ? "Login" : "Create account"}
            </button>

            <div className="mt-6 text-center text-sm text-indigo-100/70">
              {mode === "login" ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="font-semibold text-indigo-200 underline-offset-4 transition hover:text-white hover:underline"
                    onClick={()=>setMode("signup")}
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="font-semibold text-indigo-200 underline-offset-4 transition hover:text-white hover:underline"
                    onClick={()=>setMode("login")}
                  >
                    Login
                  </button>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
