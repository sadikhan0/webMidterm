import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/films', label: 'Films' },
  { to: '/people', label: 'Characters' },
  { to: '/planets', label: 'Planets' },
  { to: '/species', label: 'Species' },
]

function Navbar() {
  return (
    <nav className="relative z-20 border-b border-yellow-400/30 bg-black/60 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
        <NavLink to="/" className="text-yellow-400 text-lg font-bold tracking-widest shrink-0 flex items-center gap-2" style={{ fontFamily: 'StarJedi' }}>
          <svg width="36" height="18" viewBox="0 0 36 18" fill="none">
            <defs>
              <filter id="lsNavGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect x="0" y="7" width="24" height="4" rx="2" fill="#4fc3f7" filter="url(#lsNavGlow)"/>
            <rect x="24" y="4" width="2" height="10" rx="0.5" fill="#ccc"/>
            <rect x="26" y="6" width="10" height="6" rx="2" fill="#555"/>
            <rect x="29" y="5" width="1.5" height="8" rx="0.5" fill="#888"/>
          </svg>
          STAR WARS
        </NavLink>
        <ul className="flex gap-1 flex-wrap">
          {LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                style={{ fontFamily: 'StarJedi' }}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-sm tracking-wider transition
                  ${isActive
                    ? 'text-black bg-yellow-400'
                    : 'text-yellow-400 hover:bg-yellow-400/10'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
