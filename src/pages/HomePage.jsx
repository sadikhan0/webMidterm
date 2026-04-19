import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4'>

      <h1
        className='text-yellow-400 text-4xl sm:text-6xl md:text-7xl tracking-widest mb-6 text-center whitespace-nowrap'
        style={{ fontFamily: 'StarJedi' }}
      >
        STAR WARS
      </h1>

      <p
        className='text-gray-300 text-center max-w-xl text-sm sm:text-base mb-10'
        style={{ fontFamily: 'StarJedi' }}
      >
        Explore the galaxy far, far away. Browse films, characters, planets, and species from the Star Wars universe.
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl'>
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
