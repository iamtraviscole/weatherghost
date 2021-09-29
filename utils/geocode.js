export const fetchGeocodeData = async (queryLocation) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language=en&q=${queryLocation}&limit=1`)
  const error = !response.ok && response.status
  const json = await response.json()

  const location = json.length ? json[0] : null

  return {
    error,
    location
  }
}