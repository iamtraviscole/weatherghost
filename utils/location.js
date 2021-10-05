export const buildLocationName = (location) => {
  const { city, town, village, municipality, state, country } = location.address

  let locationNames = []
  const name1 = city || town || village || municipality
  const name2 = state || country
  name1 && locationNames.push(name1)
  name2 && locationNames.push(name2)

  return locationNames.join(', ')
}