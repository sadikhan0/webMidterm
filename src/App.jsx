import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import FilmsPage from './pages/FilmsPage'
import PeoplePage from './pages/PeoplePage'
import PlanetsPage from './pages/PlanetsPage'
import SpeciesPage from './pages/SpeciesPage'
import FilmDetailPage from './pages/FilmDetailPage'
import PersonDetailPage from './pages/PersonDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import { playLightsaber } from './services/sound'

function RouteSound() {
  const location = useLocation()
  useEffect(() => {
    playLightsaber()
  }, [location.pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <RouteSound />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/films/:id" element={<FilmDetailPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:id" element={<PersonDetailPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="/species" element={<SpeciesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
