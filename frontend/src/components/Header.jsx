import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navItems = [
  { to: '/home', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/branches', label: 'Branches' },
  { to: '/contact', label: 'Contact' }
]

export default function Header(){
  const { pathname } = useLocation();
  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem('vtech_user') || '{}');
  const isLoggedIn = Boolean(user.email);
  const isAdmin = user.role === 'admin';

  // Show header only on Home page
  if (pathname !== '/home') return null;

  function logout(){
    localStorage.clear();
    nav('/');
  }

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-30 shadow-sm border-b border-white/60">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/home" className="text-2xl font-bold tracking-widest text-slate-900">VTECH</Link>
        <nav className="hidden md:flex items-center space-x-3 text-sm font-medium text-slate-600">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-2 rounded-full transition-colors duration-200 ${pathname === item.to ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-100'}`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-full transition-colors duration-200 ${pathname === '/admin' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="inline-flex items-center justify-center px-3 py-2 rounded-full bg-slate-900 text-white text-sm shadow-lg hover:brightness-110"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center justify-center px-3 py-2 rounded-full bg-slate-900 text-white text-sm shadow-lg hover:brightness-110"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
