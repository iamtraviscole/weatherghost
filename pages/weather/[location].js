import { useEffect, useContext } from 'react'
import Error from 'next/error'

import Layout from '../../components/Layout'

import { fToC } from '../../utils/conversions'
import { localTime } from '../../utils/dates'
import { weatherDescription } from '../../utils/weather'

import { UnitsContext } from '../../contexts/UnitsContext'

export default function Weather({ error, location, weather }) {

  console.log(weather)

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

  // add location to recent locations
  useEffect(() => {
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
  }, [])

  const fOrC = (temp) => units === 'metric' ? Math.round(fToC(temp)) : Math.round(temp)

  return (
    <Layout>
      <div className='Weather'>
        <div className='Weather__current'>
          <div className='Weather__current-ghost'>
            weather illustration here
          </div>
          <div className='Weather__current-weather'>
            <h1>{locationName}</h1>
            <p className='Weather__current-weather-time'>
              {localTime(weather.current.dt, weather.timezone_offset)}
            </p>
            <div className='Weather__current-weather-temp-ctr'>
              <p className='Weather__current-weather-temp'>
                {fOrC(weather.current.temp)}&#176;
              </p>
              <p className='Weather__current-weather-description'>
                {weatherDescription(weather.current.weather[0].id)}
              </p>
              <p className='Weather__current-weather-feels'>
                Feels like: <span>{fOrC(weather.current.feels_like)}&#176;</span>
              </p>
              <p className='Weather__current-weather-high-low'>
                H: <span>{fOrC(weather.daily[0].temp.max)}&#176;</span> 
                L: <span>{fOrC(weather.daily[0].temp.min)}&#176;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
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
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&appid=${process.env.OPENWEATHER}&units=imperial`)
    const weatherErr = !weatherRes.ok && weatherRes.status
    const weather = await weatherRes.json()

    props.error = weatherErr
    props.weather = weather
  }

  return {props}
}