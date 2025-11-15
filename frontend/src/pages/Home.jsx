import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import API from "../utils/api"

const getFallbackBackground = () => {
  const apiBase = import.meta.env.VITE_API_BASE ?? "http://localhost:5000/api"
  const baseUrl = apiBase.endsWith("/api") ? apiBase.replace(/\/api$/, "") : apiBase
  return `${baseUrl}/uploads/default-hero.png`
}

export default function Home(){
  const fallbackBg = useMemo(getFallbackBackground, [])
  const [bg, setBg] = useState(fallbackBg)

  useEffect(()=>{
    let mounted = true
    API.get("/admin/background").then(r=>{
      if(mounted && r.data?.url){
        setBg(r.data.url)
      }
    }).catch(()=>{})
    return ()=>{ mounted = false }
  },[])

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-dynamic"
        style={{ backgroundImage: `linear-gradient(rgba(15,23,42,0.6), rgba(17,24,39,0.8)), url(${bg})` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_55%)]" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">
        <div className="max-w-4xl text-center text-white">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-sky-200">Innovation in motion</span>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight drop-shadow-md md:text-6xl">
            Transforming ideas into visionary technology
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-100/80 md:text-xl">
            Discover precision-engineered electronics, tailored solutions, and a partner committed to elevating your digital future.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-10 py-4 text-sm font-semibold uppercase tracking-[0.4em] text-white shadow-xl shadow-indigo-500/30 transition-transform duration-500 ease-out hover:scale-105"
            >
              <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative flex items-center gap-3">
                Explore Products
                <span className="h-2 w-2 rounded-full bg-white animate-ping" />
              </span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.3em] text-slate-100 transition hover:text-white"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
