import React, { useContext } from 'react'

import PrecipitationIcon from '../public/icons/precipitation.svg'
import ClearDayIcon from '../public/icons/weather-icons/clearday.svg'
import ClearNightIcon from '../public/icons/weather-icons/clearnight.svg'
import CloudyIcon from '../public/icons/weather-icons/cloudy.svg'
import PartlyCloudyDayIcon from '../public/icons/weather-icons/partlycloudyday.svg'
import PartlyCloudyNightIcon from '../public/icons/weather-icons/partlycloudynight.svg'
import RainIcon from '../public/icons/weather-icons/rain.svg'
import SnowIcon from '../public/icons/weather-icons/snow.svg'
import ThunderstormsIcon from '../public/icons/weather-icons/thunderstorms.svg'
import FogIcon from '../public/icons/weather-icons/fog.svg'

import { fOrC, weatherDescription, weatherIconName } from '../utils/weather'
import { locationDate, dayIsToday } from '../utils/dates'

import { UnitsContext } from '../contexts/UnitsContext'

export default function WeatherHourly({ weather }) {
  const { units } = useContext(UnitsContext)

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
        ClearDayIcon,
        ClearNightIcon,
        CloudyIcon,
        PartlyCloudyDayIcon,
        PartlyCloudyNightIcon,
        RainIcon,
        SnowIcon,
        ThunderstormsIcon,
        FogIcon
      }

      const iconName = weatherIconName({
        weatherCode: hour.weather[0].id, 
        date: hour.dt, 
        timezoneOffset: weather.timezone_offset, 
        sunrise: weather.current.sunrise, 
        sunset: weather.current.sunset
      })

      const WeatherIcon = weatherIcons[iconName]
      
      return (
        <div key={i} className='WeatherHourly__hour'>
          <span className='WeatherHourly__hour-time'>
            {time}
          </span>
          <span className='WeatherHourly__hour-temp'>{fOrC(hour.temp, units)}&#176;</span>
          <span className='WeatherHourly__hour-icon'>
            <WeatherIcon />
          </span>
          <span className='WeatherHourly__hour-description'>{weatherDescription(hour.weather[0].id)}</span>
          <span className='WeatherHourly__hour-rain'>
            <PrecipitationIcon /> {Math.round(hour.pop * 100)}% 
          </span>
        </div>
      )
    }
  })

  return (
    <div className='WeatherHourly'>
      {hours}
    </div>
  )
}
