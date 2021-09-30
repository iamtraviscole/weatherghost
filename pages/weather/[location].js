import { useEffect } from 'react'
import Error from 'next/error'

import { fetchGeocodeData } from '../../utils/geocode'

import Layout from '../../components/Layout'

export default function Weather({ error, location }) {
  
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
  const geocodeData = fetchGeocodeData(query.location)
  
  return {
    props: geocodeData
  }
}