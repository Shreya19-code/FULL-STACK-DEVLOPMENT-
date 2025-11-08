import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import DailyQuotes from './pages/DailyQuotes'
import Favorites from './pages/Favorites'

function App() {
  const isAuthenticated = !!localStorage.getItem('dv_user')

  return (
    <div className="min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/daily" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/daily" element={<DailyQuotes />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
