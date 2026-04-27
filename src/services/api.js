const BASE_URL = '/api/swapi'
const PAGE_SIZE = 10

function toProxyUrl(url) {
  return url.replace('https://swapi.info/api', '/api/swapi')
}

// swapi.info returns plain arrays with no pagination — normalize to { results, next }
function paginate(arr, page) {
  const start = (page - 1) * PAGE_SIZE
  const slice = arr.slice(start, start + PAGE_SIZE)
  return { results: slice, next: start + PAGE_SIZE < arr.length ? true : null }
}

async function getFilms() {
  const response = await fetch(`${BASE_URL}/films/`)
  if (!response.ok) throw new Error('Failed to fetch films')
  const data = await response.json()
  return { results: Array.isArray(data) ? data : data.results }
}

async function getFilmById(id) {
  const response = await fetch(`${BASE_URL}/films/${id}/`)
  if (!response.ok) throw new Error(`Failed to fetch film with id ${id}`)
  return response.json()
}

async function getPeople(page = 1) {
  const response = await fetch(`${BASE_URL}/people/`)
  if (!response.ok) throw new Error(`Failed to fetch people on page ${page}`)
  const data = await response.json()
  const all = Array.isArray(data) ? data : data.results
  return paginate(all, page)
}

async function getPersonById(id) {
  const response = await fetch(`${BASE_URL}/people/${id}/`)
  if (!response.ok) throw new Error(`Failed to fetch person with id ${id}`)
  return response.json()
}

async function getPlanets(page = 1) {
  const response = await fetch(`${BASE_URL}/planets/`)
  if (!response.ok) throw new Error(`Failed to fetch planets on page ${page}`)
  const data = await response.json()
  const all = Array.isArray(data) ? data : data.results
  return paginate(all, page)
}

async function getSpecies(page = 1) {
  const response = await fetch(`${BASE_URL}/species/`)
  if (!response.ok) throw new Error(`Failed to fetch species on page ${page}`)
  const data = await response.json()
  const all = Array.isArray(data) ? data : data.results
  return paginate(all, page)
}

async function searchPeople(query) {
  const response = await fetch(`${BASE_URL}/people/`)
  if (!response.ok) throw new Error(`Failed to search people with query "${query}"`)
  const data = await response.json()
  const all = Array.isArray(data) ? data : data.results
  const q = query.toLowerCase()
  const filtered = all.filter((p) => p.name.toLowerCase().includes(q))
  return { results: filtered, next: null }
}

export { getFilms, getFilmById, getPeople, getPersonById, getPlanets, getSpecies, searchPeople, toProxyUrl }
