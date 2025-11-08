import React from 'react'

export default function QuoteCard({ quote, onFav, isFav }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-3">
      <p className="text-lg font-medium">“{quote.quote}”</p>
      <p className="text-sm text-gray-500">— {quote.author || 'Unknown'}</p>
      <div className="flex justify-end">
        <button
          onClick={() => onFav(quote)}
          className={`px-3 py-1 rounded ${isFav ? 'bg-pink-500 text-white' : 'border'}`}>
          {isFav ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  )
}
