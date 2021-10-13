export const buildLocationName = (location) => {
  const { city, town, village, municipality, county, state, country } = location.address

  let locationNames = []
  const name1 = city || town || village || municipality || county
  const name2 = state || country
  name1 && locationNames.push(name1)
  name2 && locationNames.push(name2)

  return locationNames.join(', ')
}

export const addLocationToLocalStorage = (location, locationName) => {
  const localRecentLocations = JSON.parse(localStorage.getItem('recentLocations')) || []

  if (!localRecentLocations.includes(locationName)) {
    const newRecentLocations = localRecentLocations.length < 3 
      ? [...localRecentLocations, locationName]
      : [...localRecentLocations.slice(1), locationName]
    localStorage.setItem('recentLocations', JSON.stringify(newRecentLocations))
  } else {
    // if location already exists then move to end of arr
    const locationIndex = localRecentLocations.indexOf(locationName)
    if (locationIndex < 2) {
      localRecentLocations.splice(locationIndex, 1)
      const newRecentLocations = [...localRecentLocations, locationName]
      localStorage.setItem('recentLocations', JSON.stringify(newRecentLocations))
    }
  }
}