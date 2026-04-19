import { useState, useEffect } from 'react'
import { getSpecies } from '../services/api'

function SpeciesPage() {
  const [species, setSpecies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    getSpecies(1)
      .then((data) => {
        setSpecies(data.results)
        setHasNext(!!data.next)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function loadMore() {
    const nextPage = page + 1
    setLoadingMore(true)
    getSpecies(nextPage)
      .then((data) => {
        setSpecies((prev) => [...prev, ...data.results])
        setHasNext(!!data.next)
        setPage(nextPage)
        setLoadingMore(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoadingMore(false)
      })
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-yellow-400 text-xl">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Error: {error}</p>
    </div>
  )

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-yellow-400 text-4xl font-bold tracking-widest text-center mb-10">
        SPECIES
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {species.map((s) => (
          <div
            key={s.url}
            className="bg-gray-900 border border-yellow-400 rounded-lg p-6"
          >
            <h2 className="text-white text-xl font-bold mb-2">{s.name}</h2>
            <p className="text-gray-400 text-sm">Classification: {s.classification}</p>
            <p className="text-gray-400 text-sm">
              Avg. Lifespan: {s.average_lifespan === 'unknown' ? 'N/A' : `${s.average_lifespan} yrs`}
            </p>
            <p className="text-gray-400 text-sm">Language: {s.language}</p>
          </div>
        ))}
      </div>

      {hasNext && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-yellow-400 text-black font-bold px-8 py-3 rounded hover:bg-yellow-300 disabled:opacity-50"
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}

export default SpeciesPage
