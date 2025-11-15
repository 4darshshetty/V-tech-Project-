import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import GetStarted from './pages/GetStarted'
import Auth from './pages/Auth'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Branches from './pages/Branches'
import Contact from './pages/Contact'
import AdminPanel from './pages/AdminPanel'

export default function App(){
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
