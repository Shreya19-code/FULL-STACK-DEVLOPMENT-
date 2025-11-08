import React, { useEffect, useState } from 'react'
import QuoteCard from '../components/QuoteCard'
import sampleQuotes from '../data/sampleQuotes.json'
import { getQuotes, saveFavoriteLocally } from '../api/api'

export default function DailyQuotes() {
  const [quotes, setQuotes] = useState([])
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dv_favs') || '[]') } catch { return [] }
  })

  useEffect(() => {
    async function load() {
      try {
        const res = await getQuotes()
        setQuotes(res.data)
      } catch (err) {
        setQuotes(sampleQuotes)
      }
    }
    load()
  }, [])

  const handleFav = (q) => {
    const next = saveFavoriteLocally(q)
    setFavorites(next)
  }

  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-3xl font-bold">Daily Vibes</h1>
      <p className="text-gray-600">Hand-picked quotes to lift your day.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotes.map(q => (
          <QuoteCard key={q.id} quote={q} onFav={handleFav} isFav={!!favorites.find(f => f.id === q.id)} />
        ))}
      </div>
    </div>
  )
}
