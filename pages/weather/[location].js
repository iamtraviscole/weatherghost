import { useEffect, useContext } from 'react'
import Error from 'next/error'

import Layout from '../../components/Layout'

import { UnitsContext } from '../../contexts/UnitsContext'

export default function Weather({ error, location, weather }) {
  const { units } = useContext(UnitsContext)
  
  if (error) <Error statusCode={error} />

  if (!location) {
    return (
      <Layout>
        <p>Location not found</p>
      </Layout>
    )
  }

  const buildLocationName = (location) => {
    const { city, town, village, municipality, state, country } = location.address

    let locationNames = []
    const name1 = city || town || village || municipality
    const name2 = state || country
    name1 && locationNames.push(name1)
    name2 && locationNames.push(name2)

    return locationNames.join(', ')
  }

  const locationName = buildLocationName(location)

  useEffect(() => {
    const localRecentLocations = JSON.parse(localStorage.getItem('recentLocations')) || []

    if (!localRecentLocations.includes(locationName)) {
      const newRecentLocations = localRecentLocations.length < 3 
        ? [...localRecentLocations, locationName]
        : [...localRecentLocations.slice(1), locationName]
      localStorage.setItem('recentLocations', JSON.stringify(newRecentLocations))
    }
  }, [])

  return (
    <Layout>
      {locationName}
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const locationRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language=en&q=${query.location}&limit=1`)
  const locationErr = !locationRes.ok && locationRes.status
  const locationArr = await locationRes.json()
  const location = locationArr.length ? locationArr[0] : null

  let props = {error: locationErr, location}

  if (!locationErr && location) {
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=${[process.env.OPENWEATHER]}&units=imperial`)
    const weatherErr = !weatherRes.ok && weatherRes.status
    const weather = await weatherRes.json()

    props.error = weatherErr
    props.weather = weather
  }

  return {props}
}