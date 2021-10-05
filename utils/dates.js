import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs-plugin-utc'

dayjs.extend(dayjsPluginUTC)

export const locationTime = (unix, timeZoneOffset) => {
  return dayjs.unix(unix + timeZoneOffset).utc(true).format('h:mm A')
}

export const locationWeekdayTime = (currentUnix, unix, timeZoneOffset) => {
  const currentDate = dayjs.unix(currentUnix + timeZoneOffset)
  const date = dayjs.unix(unix + timeZoneOffset)

  if (currentDate.day() === date.day()) {
    return {
      weekday: '',
      time: date.utc(true).format('h A')
    }
  } else {
    return {
      weekday: date.utc(true).format('ddd'),
      time: date.utc(true).format('h A')
    }
  }
}