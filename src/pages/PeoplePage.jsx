import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPeople } from '../services/api'

function PeoplePage() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getPeople(1)
      .then((data) => {
        setPeople(data.results)
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
    getPeople(nextPage)
      .then((data) => {
        setPeople((prev) => [...prev, ...data.results])
        setHasNext(!!data.next)
        setPage(nextPage)
        setLoadingMore(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoadingMore(false)
      })
  }

  // extracts numeric id from SWAPI url e.g. "https://swapi.dev/api/people/1/"
  function getIdFromUrl(url) {
    return url.split('/').filter(Boolean).pop()
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-yellow-400 text-xl">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="text-yellow-400 text-4xl font-bold tracking-widest text-center mb-10">
        CHARACTERS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {people.map((person) => (
          <div
            key={person.url}
            onClick={() => navigate(`/people/${getIdFromUrl(person.url)}`)}
            className="bg-gray-900 border border-yellow-400 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition"
          >
            <h2 className="text-white text-xl font-bold mb-2">{person.name}</h2>
            <p className="text-gray-400 text-sm">Birth Year: {person.birth_year}</p>
            <p className="text-gray-400 text-sm">Gender: {person.gender}</p>
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

export default PeoplePage
