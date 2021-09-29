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