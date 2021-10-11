import { useState, useEffect, useContext } from 'react'
import Error from 'next/error'

import Layout from '../../components/Layout'
import WeatherAlerts from '../../components/WeatherAlerts'
import WeatherHourly from '../../components/WeatherHourly'

import AlertIcon from '../../public/icons/alert.svg'

import { fOrC, weatherDescription, weatherIcon } from '../../utils/weather'
import { locationDate } from '../../utils/dates'
import { buildLocationName, addLocationToLocalStorage } from '../../utils/location'

import { UnitsContext } from '../../contexts/UnitsContext'

export default function Weather({ error, location, weather }) {
  if (error) <Error statusCode={error} />

  if (!location) {
    return (
      <Layout>
        <p>Location not found</p>
      </Layout>
    )
  }

  console.log(weather)

  const [showAlertsModal, setShowAlertsModal] = useState(false)

  const { units } = useContext(UnitsContext)

  const locationName = buildLocationName(location)

  useEffect(() => {
    addLocationToLocalStorage(location, locationName)
  }, [])

  const onAlertClick = () => {
    setShowAlertsModal(!showAlertsModal)
  }

  return (
    <Layout>
      {showAlertsModal && 
      <WeatherAlerts 
        alerts={weather.alerts} 
        closeModal={onAlertClick} 
        timezoneOffset={weather.timezone_offset} 
      />}
      <div className='Weather'>
        <div className='Weather__current'>
          <div className='Weather__current-ghost'>
            weather illustration here
          </div>
          <div className='Weather__current-weather'>
            <h1>{`${locationName}, 
            ${location.address.country_code && location.address.country_code.toUpperCase()}`}</h1>
            <p className='Weather__current-weather-time'>
              {locationDate(weather.current.dt, weather.timezone_offset, 'dddd, h:mm A')}
            </p>
            <div className='Weather__current-weather-temp-ctr'>
              <p className='Weather__current-weather-temp'>
                {fOrC(weather.current.temp, units)}&#176; 
                <span>{units === 'imperial' ? 'F' : 'C'}</span>
              </p>
              <p className='Weather__current-weather-description'>
                {weatherDescription(weather.current.weather[0].id)}
              </p>
              <p className='Weather__current-weather-feels'>
                Feels like: <span>{fOrC(weather.current.feels_like, units)}&#176;</span>
              </p>
              <p className='Weather__current-weather-high-low'>
                H: <span>{fOrC(weather.daily[0].temp.max, units)}&#176; </span> 
                L: <span>{fOrC(weather.daily[0].temp.min, units)}&#176;</span>
              </p>
            </div>
            {weather.alerts && 
            <div className='Weather__current-alert'>
              <button onClick={onAlertClick}>
                <AlertIcon />{weather.alerts.length > 1 ? 'Alerts' : 'Alert'}
              </button>
            </div>}
          </div>
        </div>
        <div className='Weather__future'>
          <WeatherHourly weather={weather} />
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