import { isDaytime } from './dates'

export const fOrC = (temp, units) => {
  return units === 'metric' 
    ? Math.round(((temp - 32) * 5/9).toPrecision(4)) 
    : Math.round(temp)
}

export const weatherDescription = (weatherCode) => {
  const code = weatherCode.toString()

  switch (code[0]) {
    case '2': return 'Thunderstorms'
    case '3': return 'Drizzle'
    case '5':
      if (code === '511') {
        return 'Freezing Rain'
      }
      return 'Rain'
    case '6': return 'Snow'
    case '7':
      switch (code) {
        case '701': return 'Mist'
        case '711': return 'Smoke'
        case '721': return 'Haze'
        case '731': return 'Dust'
        case '741': return 'Fog'
        case '751': return 'Sand'
        case '761': return 'Dust'
        case '762': return 'Ash'
        case '771': return 'Squalls'
        case '781': return 'Tornado'
      }
    case '8':
      switch (code) {
        case '800': return 'Clear'
        case '801': return 'Mostly Clear'
        case '802': return 'Partly Cloudy'
        case '803': return 'Cloudy'
        case '804': return 'Cloudy'
      }
  }
}

export const weatherIconName = (argsObj) => {

  // argsObj: {
    // weatherCode: openweathermap weather code,
    // date: unix timestamp in seconds,
    // timezoneOffset: unix timestamp in seconds,
    // sunrise: unix timestamp in seconds,
    // sunset: unix timestamp in seconds
  // }

  const { weatherCode, date, timezoneOffset, sunrise, sunset } = argsObj

  const code = weatherCode.toString()
  const daytime = isDaytime(date, timezoneOffset, sunrise, sunset)

  switch (code[0]) {
    case '2': return 'ThunderstormsIcon'
    case '3': return 'RainIcon'
    case '5': return 'RainIcon'
    case '6': return 'SnowIcon'
    case '7': 
      if (code === '781') return 'ThunderstormsIcon'
      return 'FogIcon'
    case '8':
      switch (code) {
        case '800': return daytime ? 'ClearDayIcon' : 'ClearNightIcon'
        case '801': return daytime ? 'ClearDayIcon' : 'ClearNightIcon'
        case '802': return daytime ? 'PartlyCloudyDayIcon' : 'PartlyCloudyNightIcon'
        case '803': return 'CloudyIcon'
        case '804': return 'CloudyIcon'
      }
  }
}

export const ghostHelper = (argsObj) => {
  
  // argsObj: {
    // weatherCode: openweathermap weather code,
    // date: unix timestamp in seconds,
    // timezoneOffset: unix timestamp in seconds,
    // sunrise: unix timestamp in seconds,
    // sunset: unix timestamp in seconds
  // }

  const { weatherCode, date, timezoneOffset, sunrise, sunset } = argsObj

  const code = weatherCode.toString()
  const daytime = isDaytime(date, timezoneOffset, sunrise, sunset)

  switch (code[0]) {
    case '2': return daytime
      ? {filename: 'thunderstorms-day-ghost.svg', bgColor: '#4e697c'}
      : {filename: 'thunderstorms-night-ghost.svg', bgColor: '#28353f' }
    case '3': return daytime
      ? {filename: 'rain-day-ghost.svg', bgColor: '#4c5659'}
      : {filename: 'rain-night-ghost.svg', bgColor: '#2d3233'}
    case '5': return daytime
      ? {filename: 'rain-day-ghost.svg', bgColor: '#4c5659'}
      : {filename: 'rain-night-ghost.svg', bgColor: '#2d3233'}
    case '6': return daytime
      ? {filename: 'snow-day-ghost.svg', bgColor: '#959596'}
      : {filename: 'snow-night-ghost.svg', bgColor: '#383838'}
    case '7': 
      if (code === '781') return daytime
        ? {filename: 'thunderstorms-day-ghost.svg', bgColor: '#4e697c'}
        : {filename: 'thunderstorms-night-ghost.svg', bgColor: '#28353f'}
      return daytime
        ? {filename: 'fog-day-ghost.svg', bgColor: '#6e7577'}
        : {filename: 'fog-night-ghost.svg', bgColor: '#34393a'}
    case '8':
      switch (code) {
        case '800': return daytime
          ? {filename: 'clear-day-ghost.svg', bgColor: '#84cef7'}
          : {filename: 'clear-night-ghost.svg', bgColor: '#2a3442'}
        case '801': return daytime
          ? {filename: 'clear-day-ghost.svg', bgColor: '#84cef7'}
          : {filename: 'clear-night-ghost.svg', bgColor: '#2a3442'}
        case '802': return daytime
          ? {filename: 'partly-cloudy-day-ghost.svg', bgColor: '#669db5'}
          : {filename: 'partly-cloudy-night-ghost.svg', bgColor: '#2a2f35'}
        case '803': return daytime
          ? {filename: 'cloudy-day-ghost.svg', bgColor: '#76878c'}
          : {filename: 'cloudy-night-ghost.svg', bgColor: '#272a2b'}
        case '804': return daytime
          ? {filename: 'cloudy-day-ghost.svg', bgColor: '#76878c'}
          : {filename: 'cloudy-night-ghost.svg', bgColor: '#272a2b'}
      }
  }
}