export default async function handler(req, res) {
  const pathParts = req.query.path
  const path = Array.isArray(pathParts) ? pathParts.join('/') : (pathParts || '')

  try {
    const response = await fetch(`https://swapi.info/api/${path}/`)
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream error' })
    }
    const data = await response.json()
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
