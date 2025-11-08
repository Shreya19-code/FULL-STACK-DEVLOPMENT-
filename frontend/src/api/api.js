// Mocked API for frontend development.
// register / login are mocked and use localStorage so you can test flows without a backend.
// getQuotes will try to hit a backend if VITE_API_BASE_URL is set; otherwise falls back to sample JSON.

import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const getQuotes = () => axios.get(`${API_BASE}/quotes`)

// Mocked register: saves user to localStorage 'dv_users' array and returns a user object.
export async function register({ email, password }) {
  await new Promise(r => setTimeout(r, 300)) // fake network delay
  const users = JSON.parse(localStorage.getItem('dv_users') || '[]')
  if (users.find(u => u.email === email)) {
    const err = new Error('User already exists')
    err.code = 'USER_EXISTS'
    throw err
  }
  const user = { id: 'u_' + Date.now(), email }
  users.push({ ...user, password })
  localStorage.setItem('dv_users', JSON.stringify(users))
  return { data: { user } }
}

// Mocked login: checks localStorage users and returns user if password matches.
export async function login({ email, password }) {
  await new Promise(r => setTimeout(r, 250))
  const users = JSON.parse(localStorage.getItem('dv_users') || '[]')
  const found = users.find(u => u.email === email && u.password === password)
  if (!found) {
    const err = new Error('Invalid credentials')
    err.code = 'INVALID_CREDENTIALS'
    throw err
  }
  const user = { id: found.id, email: found.email }
  return { data: { user } }
}

export const saveFavoriteLocally = (quote) => {
  try {
    const cur = JSON.parse(localStorage.getItem('dv_favs') || '[]')
    if (!cur.find(q => q.id === quote.id)) cur.unshift(quote)
    localStorage.setItem('dv_favs', JSON.stringify(cur))
    return cur
  } catch (err) {
    const arr = [quote]
    localStorage.setItem('dv_favs', JSON.stringify(arr))
    return arr
  }
}
