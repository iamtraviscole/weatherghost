import { useState, useEffect, useContext } from 'react'
import Error from 'next/error'

import Layout from '../../components/Layout'
import Alerts from '../../components/Alerts'

import PrecipitationIcon from '../../public/icons/precipitation.svg'
import AlertIcon from '../../public/icons/alert.svg'
import ClearDayIcon from '../../public/icons/weather-icons/clearday.svg'
import ClearNightIcon from '../../public/icons/weather-icons/clearnight.svg'
import CloudyIcon from '../../public/icons/weather-icons/cloudy.svg'
import PartlyCloudyDayIcon from '../../public/icons/weather-icons/partlycloudyday.svg'
import PartlyCloudyNightIcon from '../../public/icons/weather-icons/partlycloudynight.svg'
import RainIcon from '../../public/icons/weather-icons/rain.svg'
import SnowIcon from '../../public/icons/weather-icons/snow.svg'
import ThunderstormsIcon from '../../public/icons/weather-icons/thunderstorms.svg'
import FogIcon from '../../public/icons/weather-icons/fog.svg'

import { fOrC, weatherDescription, weatherIcon } from '../../utils/weather'
import { locationDate, dayIsToday } from '../../utils/dates'
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

  const hours = weather.hourly.map((hour, i) => {
    while (i < 25) {
      const time = (
        dayIsToday(hour.dt, weather.current.dt, weather.timezone_offset)
        ? <p>{locationDate(hour.dt, weather.timezone_offset, 'h A')}</p>
        : <>
            <p>{locationDate(hour.dt, weather.timezone_offset, 'ddd')}</p>
            <p>{locationDate(hour.dt, weather.timezone_offset, 'h A')}</p>
          </>
      )

      const weatherIcons = {
        clearDay: ClearDayIcon,
        clearNight: ClearNightIcon,
        cloudy: CloudyIcon,
        partlyCloudyDay: PartlyCloudyDayIcon,
        partlyCloudyNight: PartlyCloudyNightIcon,
        rain: RainIcon,
        snow: SnowIcon,
        thunderstorms: ThunderstormsIcon,
        fog: FogIcon
      }

      const WeatherIcon = weatherIcons[weatherIcon(hour.weather[0].id, hour.dt, weather.timezone_offset, weather.current.sunrise, weather.current.sunset)]
      
      return (
        <div key={i} className='Weather__hourly-hour'>
          <span className='Weather__hourly-hour-time'>
            {time}
          </span>
          <span className='Weather__hourly-hour-temp'>{fOrC(hour.temp, units)}&#176;</span>
          <span className='Weather__hourly-hour-icon'>
            <WeatherIcon />
          </span>
          <span className='Weather__hourly-hour-description'>{weatherDescription(hour.weather[0].id)}</span>
          <span className='Weather__hourly-hour-rain'>
            <PrecipitationIcon /> {Math.round(hour.pop * 100)}% 
          </span>
        </div>
      )
    }
  })

  const onAlertClick = () => {
    setShowAlertsModal(!showAlertsModal)
  }

  return (
    <Layout>
      {showAlertsModal && 
      <Alerts 
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
        <div className='Weather__hourly'>
          <h2>Hourly</h2>
          {hours}
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