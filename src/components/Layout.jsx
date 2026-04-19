import Navbar from './Navbar'
import Footer from './Footer'

const stars = Array.from({ length: 1500 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 3,
}))

function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
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
      <Navbar />
      <div className="relative z-10 flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
