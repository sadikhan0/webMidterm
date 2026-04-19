import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFilmById } from '../services/api'

function getIdFromUrl(url) {
  return url.split('/').filter(Boolean).pop()
}

// Keyed by SWAPI film ID (1–6), original theatrical release posters from Wikipedia
const FILM_POSTERS = {
  '1': 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg',
  '2': 'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg',
  '3': 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg',
  '4': 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg',
  '5': 'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg',
  '6': 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg',
}

function CharacterCard({ char }) {
  const [imgFailed, setImgFailed] = useState(false)
  const charId = getIdFromUrl(char.url)
  return (
    <div className="bg-gray-900 border border-amber-500 rounded-lg overflow-hidden text-center">
      <div className="w-full h-44 bg-gray-800 flex items-center justify-center overflow-hidden">
        {imgFailed ? (
          <span className="text-gray-600 text-4xl">👤</span>
        ) : (
          <img
            src={`https://cdn.jsdelivr.net/gh/vieraboschkova/swapi-gallery@main/static/assets/img/people/${charId}.jpg`}
            alt={char.name}
            className="w-full h-full object-cover object-top"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <p className="text-white text-xs font-bold px-2 py-2 leading-tight">{char.name}</p>
    </div>
  )
}

function FilmDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [film, setFilm] = useState(null)
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getFilmById(id)
      .then(async (data) => {
        setFilm(data)
        const first15 = data.characters.slice(0, 15)
        const charData = await Promise.all(
          first15.map((url) => fetch(url).then((r) => r.json()))
        )
        setCharacters(charData)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-amber-500 text-xl">Loading...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      <p className="text-red-500 text-xl">Error: {error}</p>
      <button
        onClick={() => navigate('/films')}
        className="text-amber-500 hover:text-amber-300 text-sm font-bold tracking-wider"
      >
        ← Back to Films
      </button>
    </div>
  )

  const filmId = getIdFromUrl(film.url)

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">

      <button
        onClick={() => navigate('/films')}
        className="text-amber-500 hover:text-amber-300 mb-8 inline-flex items-center gap-2 text-sm font-bold tracking-wider transition"
      >
        ← Films
      </button>

      {/* Poster + core info */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        <div className="w-full sm:w-44 flex-shrink-0">
          <img
            src={FILM_POSTERS[filmId]}
            alt={`${film.title} poster`}
            className="w-full rounded-lg border border-amber-500 shadow-lg object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-amber-500 text-sm tracking-widest mb-1">EPISODE {film.episode_id}</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-widest mb-5">
            {film.title}
          </h1>
          <div className="space-y-2">
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wider mr-2">Director</span>
              <span className="text-white text-sm">{film.director}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wider mr-2">Producer</span>
              <span className="text-white text-sm">{film.producer}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wider mr-2">Released</span>
              <span className="text-white text-sm">{film.release_date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-amber-500 mb-8" />

      {/* Opening crawl */}
      <h2 className="text-amber-500 text-lg font-bold tracking-widest mb-3">OPENING CRAWL</h2>
      <div className="bg-gray-900 border border-amber-500 rounded-lg p-6 mb-10">
        <p className="text-yellow-200 text-sm leading-relaxed whitespace-pre-line italic">
          {film.opening_crawl}
        </p>
      </div>

      {/* Characters */}
      <h2 className="text-amber-500 text-lg font-bold tracking-widest mb-6">CHARACTERS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {characters.map((char) => (
          <CharacterCard key={char.url} char={char} />
        ))}
      </div>

    </div>
  )
}

export default FilmDetailPage
