 import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFilms } from '../services/api'

function FilmsPage() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getFilms()
      .then((data) => {
        setFilms(data.results)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-amber-500 text-xl">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen px-6 py-10">

      <h1 className="text-amber-500 text-4xl font-bold tracking-widest text-center mb-10">
        FILMS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {films.map((film) => (
          <div
            key={film.episode_id}
            onClick={() => navigate(`/films/${film.episode_id}`)}
            className="bg-gray-900 border border-amber-500 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition"
          >
            <p className="text-amber-500 text-sm mb-1">Episode {film.episode_id}</p>
            <h2 className="text-white text-xl font-bold mb-3">{film.title}</h2>
            <p className="text-gray-400 text-sm">Director: {film.director}</p>
            <p className="text-gray-400 text-sm">Released: {film.release_date}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default FilmsPage