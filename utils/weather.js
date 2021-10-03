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