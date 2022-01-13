import { useState, useEffect, useContext } from 'react'
import Error from 'next/error'

import Layout from '../../components/Layout'
import WeatherAlerts from '../../components/WeatherAlerts'
import WeatherHourly from '../../components/WeatherHourly'
import WeatherDaily from '../../components/WeatherDaily'
import WeatherGhost from '../../components/WeatherGhost'

import AlertIcon from '../../public/icons/alert.svg'

import { fOrC, weatherDescription, ghostHelper } from '../../utils/weather'
import { locationDate } from '../../utils/dates'
import { buildLocationName, addLocationToLocalStorage } from '../../utils/location'

import { UnitsContext } from '../../contexts/UnitsContext'

export default function Weather({ error, location, weather }) {
  const [showAlertsModal, setShowAlertsModal] = useState(false)
  const [showHourly, setShowHourly] = useState(true)

  const { units } = useContext(UnitsContext)

  const locationName = buildLocationName(location)

  useEffect(() => {
    addLocationToLocalStorage(location, locationName)
  }, [location])

  if (error) <Error statusCode={error} />

  if (!location) {
    return (
      <Layout>
        <p>Location not found</p>
      </Layout>
    )
  }

  console.log(weather)

  const onAlertClick = () => {
    setShowAlertsModal(!showAlertsModal)
  }

  const ghostInfo = ghostHelper({
    weatherCode: weather.current.weather[0].id, 
    date: weather.current.dt, 
    timezoneOffset: weather.timezone_offset, 
    sunrise: weather.current.sunrise, 
    sunset: weather.current.sunset
  })

  return (
    <Layout>
      {showAlertsModal && 
      <WeatherAlerts 
        alerts={weather.alerts} 
        closeModal={onAlertClick} 
        timezoneOffset={weather.timezone_offset} 
      />}
      <div className='Weather'>
        <div className='Weather__current' style={{backgroundColor: ghostInfo.bgColor}}>
          <div className='Weather__current-ghost'>
            <WeatherGhost weather={weather} filename={ghostInfo.filename} />
          </div>
          <div className='Weather__current-weather'>
            <h1>
              {locationName}
              {location.address.country_code && `, ${location.address.country_code.toUpperCase()}`}
            </h1>
            <p className='Weather__current-weather-time'>
              {locationDate(weather.current.dt, weather.timezone_offset, 'dddd, h:mm A')}
            </p>
            <div className='Weather__current-weather-temp-ctr'>
              <p className='Weather__current-weather-temp'>
                {fOrC(weather.current.temp, units)}&#176; 
              </p>
              <p className='Weather__current-weather-description'>
                {weatherDescription(weather.current.weather[0].id)}
              </p>
              <div className='Weather__current-weather-details'>
                <p>Feels<span>{fOrC(weather.current.feels_like, units)}&#176;</span></p>
                <p>High<span>{fOrC(weather.daily[0].temp.max, units)}&#176;</span></p>
                <p>Low<span>{fOrC(weather.daily[0].temp.min, units)}&#176;</span></p>
              </div>
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
          <div className='Weather__future-btns-ctr'>
            <button 
              className={`Weather__future-btn ${showHourly && 'Weather__future-btn--active'}`}
              onClick={() => setShowHourly(true)}
            >
                Hourly
            </button>
            <button 
              className={`Weather__future-btn ${!showHourly && 'Weather__future-btn--active'}`}
              onClick={() => setShowHourly(false)}
            >
                Daily
            </button>
          </div>
          {showHourly ? <WeatherHourly weather={weather} /> : <WeatherDaily weather={weather} />}
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