function Footer() {
  return (
    <footer className="relative z-20 border-t border-yellow-400/30 bg-black/60 backdrop-blur-sm mt-10">
      <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500 tracking-wider">
        <span className="font-bold text-yellow-400/60">STAR WARS EXPLORER</span>
        <span>
          Data provided by{' '}
          <a
            href="https://swapi.dev"
            target="_blank"
            rel="noreferrer"
            className="text-yellow-400 hover:text-yellow-300 underline transition"
          >
            SWAPI
          </a>
          {' '}— The Star Wars API
        </span>
      </div>
    </footer>
  )
}

export default Footer
