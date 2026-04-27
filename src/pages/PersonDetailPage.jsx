import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPersonById, toProxyUrl } from '../services/api'

function fmt(value) {
  return value === 'unknown' || value === 'n/a' ? 'N/A' : value
}

function getIdFromUrl(url) {
  return url.split('/').filter(Boolean).pop()
}

function PersonDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [person, setPerson] = useState(null)
  const [filmTitles, setFilmTitles] = useState([])
  const [imgFailed, setImgFailed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPersonById(id)
      .then(async (data) => {
        setPerson(data)
        const titles = await Promise.all(
          data.films.map((url) => fetch(toProxyUrl(url)).then((r) => r.json()).then((f) => f.title))
        )
        setFilmTitles(titles)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-yellow-400 text-xl">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-red-500 text-xl">Error: {error}</p>
      <button
        onClick={() => navigate('/people')}
        className="text-yellow-400 hover:text-yellow-300 text-sm font-bold tracking-wider"
      >
        ← Characters
      </button>
    </div>
  )

  const attrs = [
    { label: 'Height', value: fmt(person.height) },
    { label: 'Mass', value: fmt(person.mass) },
    { label: 'Hair Color', value: fmt(person.hair_color) },
    { label: 'Eye Color', value: fmt(person.eye_color) },
    { label: 'Skin Color', value: fmt(person.skin_color) },
    { label: 'Birth Year', value: fmt(person.birth_year) },
    { label: 'Gender', value: fmt(person.gender) },
  ]

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">

      <button
        onClick={() => navigate('/people')}
        className="text-yellow-400 hover:text-yellow-300 mb-8 inline-flex items-center gap-2 text-sm font-bold tracking-wider transition"
      >
        ← Characters
      </button>

      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        <div className="w-full sm:w-44 flex-shrink-0">
          <div className="w-full rounded-lg border border-yellow-400 overflow-hidden bg-gray-900 flex items-center justify-center" style={{ minHeight: '220px' }}>
            {imgFailed ? (
              <span className="text-gray-600 text-6xl">👤</span>
            ) : (
              <img
                src={`https://cdn.jsdelivr.net/gh/vieraboschkova/swapi-gallery@main/static/assets/img/people/${id}.jpg`}
                alt={person.name}
                className="w-full object-cover object-top"
                onError={() => setImgFailed(true)}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-yellow-400 text-3xl sm:text-4xl font-bold tracking-widest mb-6">
            {person.name}
          </h1>
          <div className="space-y-2">
            {attrs.map(({ label, value }) => (
              <div key={label}>
                <span className="text-gray-500 text-xs uppercase tracking-wider mr-2">{label}</span>
                <span className="text-white text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-yellow-400 mb-8" />

      <h2 className="text-yellow-400 text-lg font-bold tracking-widest mb-4">FILMS</h2>
      {filmTitles.length === 0 ? (
        <p className="text-gray-400 text-sm">No films found.</p>
      ) : (
        <ul className="space-y-2">
          {filmTitles.map((title) => (
            <li
              key={title}
              className="bg-gray-900 border border-yellow-400 rounded-lg px-5 py-3 text-white text-sm"
            >
              {title}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default PersonDetailPage
