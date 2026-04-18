import { useNavigate } from 'react-router-dom'

const stars = Array.from({ length: 1500 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 3,
}))

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className='relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-950 flex flex-col items-center justify-center px-4 overflow-hidden'>

      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <h1
        className='text-yellow-400 text-4xl sm:text-6xl md:text-7xl tracking-widest mb-6 text-center z-10 whitespace-nowrap'
        style={{ fontFamily: 'StarJedi' }}
      >
        STAR WARS
      </h1>

      <p
        className='text-gray-300 text-center max-w-xl text-sm sm:text-base mb-10 z-10'
        style={{ fontFamily: 'StarJedi' }}
      >
        Explore the galaxy far, far away. Browse films, characters, planets, and species from the Star Wars universe.
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl z-10'>
        <button onClick={() => navigate('/films')} className='bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 text-sm sm:text-base'>
          Films
        </button>
        <button onClick={() => navigate('/people')} className='bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 text-sm sm:text-base'>
          Characters
        </button>
        <button onClick={() => navigate('/planets')} className='bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 text-sm sm:text-base'>
          Planets
        </button>
        <button onClick={() => navigate('/species')} className='bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 text-sm sm:text-base'>
          Species
        </button>
      </div>

    </div>
  )
}

export default HomePage
