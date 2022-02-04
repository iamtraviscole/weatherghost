export const buildLocationName = (location) => {
  const { city, town, village, municipality, county, state, country, locality } = location.address

  let locationNames = []
  const name1 = city || town || village || municipality || county
  const name2 = state || country || locality
  name1 && locationNames.push(name1)
  name2 && locationNames.push(name2)

  return locationNames.join(', ')
}

export const addLocationToLocalStorage = (location, locationName) => {
  const localRecentLocations = JSON.parse(localStorage.getItem('recentLocations')) || []

  if (!localRecentLocations.includes(locationName)) {
    const newRecentLocations = localRecentLocations.length < 3 
      ? [locationName, ...localRecentLocations]
      : [locationName, ...localRecentLocations.slice(0, -1)]
    localStorage.setItem('recentLocations', JSON.stringify(newRecentLocations))
  } else {
    // if location already exists then move to front of arr
    const locationIndex = localRecentLocations.indexOf(locationName)
    if (locationIndex > 0) {
      localRecentLocations.splice(locationIndex, 1)
      const newRecentLocations = [locationName, ...localRecentLocations]
      localStorage.setItem('recentLocations', JSON.stringify(newRecentLocations))
    }
  }
}