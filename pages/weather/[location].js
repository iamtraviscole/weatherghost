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
    const { city, state, country } = location.address
    let locationNames = []
    city && locationNames.push(city)
    state ? locationNames.push(state) : country && locationNames.push(country)

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
  const geoCodeData = fetchGeocodeData(query.location)

  return {
    props: geoCodeData
  }
}