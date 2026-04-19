import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPeople, searchPeople } from '../services/api'

function getIdFromUrl(url) {
  return url.split('/').filter(Boolean).pop()
}

function PeoplePage() {
  const [people, setPeople] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const debounceRef = useRef(null)
  const navigate = useNavigate()

  // Initial load
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

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (query.trim() === '') {
      // Restore full list
      setSearching(true)
      getPeople(1)
        .then((data) => {
          setPeople(data.results)
          setHasNext(!!data.next)
          setPage(1)
          setSearching(false)
        })
        .catch((err) => {
          setError(err.message)
          setSearching(false)
        })
      return
    }
    debounceRef.current = setTimeout(() => {
      setSearching(true)
      setHasNext(false)
      searchPeople(query.trim())
        .then((data) => {
          setPeople(data.results)
          setHasNext(!!data.next)
          setPage(1)
          setSearching(false)
        })
        .catch((err) => {
          setError(err.message)
          setSearching(false)
        })
    }, 500)
  }, [query])

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
      <h1 className="text-yellow-400 text-4xl font-bold tracking-widest text-center mb-8">
        CHARACTERS
      </h1>

      <div className="max-w-5xl mx-auto mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search characters..."
          className="w-full bg-gray-900 border border-yellow-400 rounded-lg px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {searching ? (
        <div className="flex justify-center mt-10">
          <p className="text-yellow-400 text-xl">Loading...</p>
        </div>
      ) : people.length === 0 ? (
        <div className="flex justify-center mt-10">
          <p className="text-gray-400 text-base">
            No characters found for &lsquo;{query}&rsquo;.
          </p>
        </div>
      ) : (
        <>
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

          {hasNext && !query.trim() && (
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
        </>
      )}
    </div>
  )
}

export default PeoplePage
