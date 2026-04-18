const BASE_URL = 'https://swapi.dev/api'

async function getFilms() {
  const response = await fetch(`${BASE_URL}/films/`)
  if (!response.ok) throw new Error('Failed to fetch films')
  return response.json()
}

async function getFilmById(id) {
  const response = await fetch(`${BASE_URL}/films/${id}/`)
  if (!response.ok) throw new Error(`Failed to fetch film with id ${id}`)
  return response.json()
}

async function getPeople(page = 1) {
  const response = await fetch(`${BASE_URL}/people/?page=${page}`)
  if (!response.ok) throw new Error(`Failed to fetch people on page ${page}`)
  return response.json()
}

async function getPersonById(id) {
  const response = await fetch(`${BASE_URL}/people/${id}/`)
  if (!response.ok) throw new Error(`Failed to fetch person with id ${id}`)
  return response.json()
}

async function getPlanets(page = 1) {
  const response = await fetch(`${BASE_URL}/planets/?page=${page}`)
  if (!response.ok) throw new Error(`Failed to fetch planets on page ${page}`)
  return response.json()
}

async function getSpecies(page = 1) {
  const response = await fetch(`${BASE_URL}/species/?page=${page}`)
  if (!response.ok) throw new Error(`Failed to fetch species on page ${page}`)
  return response.json()
}

async function searchPeople(query) {
  const response = await fetch(`${BASE_URL}/people/?search=${query}`)
  if (!response.ok) throw new Error(`Failed to search people with query "${query}"`)
  return response.json()
}

export { getFilms, getFilmById, getPeople, getPersonById, getPlanets, getSpecies, searchPeople }
