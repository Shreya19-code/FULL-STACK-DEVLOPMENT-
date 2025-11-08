import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ isAuthenticated }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('dv_user')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">DV</div>
          <Link to="/daily" className="text-lg font-semibold">Daily Vibes</Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/daily" className="hover:underline">Daily</Link>
          <Link to="/favorites" className="hover:underline">Favorites</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-indigo-600 text-white rounded">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
          )}
        </nav>
      </div>
    </header>
  )
}
