import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await register({ email, password })
      const user = res?.data?.user
      localStorage.setItem('dv_user', JSON.stringify(user))
      navigate('/daily')
    } catch (err) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border rounded" />
        {error && <div className="text-red-600">{error}</div>}
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded">Create account</button>
      </form>
    </div>
  )
}
