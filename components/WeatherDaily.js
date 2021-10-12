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

export default function WeatherDaily({ weather }) {
  const { units } = useContext(UnitsContext)

  const days = weather.daily.map((day, i) => {
    const time = (
      dayIsToday(day.dt, weather.current.dt, weather.timezone_offset)
      ? <p>Today</p>
      : <>
        <p>{locationDate(day.dt, weather.timezone_offset, 'ddd')}</p>
        <p>{locationDate(day.dt, weather.timezone_offset, 'D[th]')}</p>
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
      weatherCode: day.weather[0].id, 
      date: day.dt, 
      timezoneOffset: weather.timezone_offset, 
      sunrise: day.sunrise, 
      sunset: day.sunset
    })

    const WeatherIcon = weatherIcons[iconName]
    
    return (
      <div key={i} className='WeatherDaily__day'>
        <span className='WeatherDaily__day-time'>
          {time}
        </span>
        <span className='WeatherDaily__day-temp'>
          <div className='WeatherDaily__day-temp-inner-ctr'>
            <p className='WeatherDaily__day-temp-high-low'>H</p>
            <p className='WeatherDaily__day-temp-deg'>{fOrC(day.temp.max, units)}&#176;</p>
          </div>
          <div className='WeatherDaily__day-temp-inner-ctr'>
            <p className='WeatherDaily__day-temp-high-low'>L</p>
            <p className='WeatherDaily__day-temp-deg'>{fOrC(day.temp.min, units)}&#176;</p>
          </div>
        </span>
        <span className='WeatherDaily__day-icon'>
          <WeatherIcon />
        </span>
        <span className='WeatherDaily__day-description'>{weatherDescription(day.weather[0].id)}</span>
        <span className='WeatherDaily__day-rain'>
          <PrecipitationIcon /> {Math.round(day.pop * 100)}% 
        </span>
      </div>
    )
  })

  return (
    <div className='WeatherDaily'>
      {days}
    </div>
  )
}
