import React, { useState, useEffect } from 'react'
import QuoteCard from '../components/QuoteCard'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try { setFavorites(JSON.parse(localStorage.getItem('dv_favs') || '[]')) } catch { setFavorites([]) }
  }, [])

  const remove = (q) => {
    const next = favorites.filter(f => f.id !== q.id)
    setFavorites(next)
    localStorage.setItem('dv_favs', JSON.stringify(next))
  }

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites yet — save quotes from Daily Vibes.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map(q => (
            <QuoteCard key={q.id} quote={q} onFav={remove} isFav={true} />
          ))}
        </div>
      )}
    </div>
  )
}
