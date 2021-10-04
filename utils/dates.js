export const locationTime = (unix, timeZoneOffset) => {
  const date = new Date((unix + timeZoneOffset) * 1000)
  return date.toLocaleString('en-US', {timeZone: 'UTC', hour: 'numeric', minute: 'numeric'})
}

export const locationWeekdayTime = (currentUnix, unix, timeZoneOffset) => {
  const currentDate = new Date((currentUnix + timeZoneOffset) * 1000)
  const date = new Date((unix + timeZoneOffset) * 1000)

  if (currentDate.getUTCDay() === date.getUTCDay()) {
    return date.toLocaleString('en-US', {timeZone: 'UTC', hour: 'numeric', minute: 'numeric'})
  } else {
    return date.toLocaleString('en-US', {timeZone: 'UTC', weekday: 'short', hour: 'numeric', minute: 'numeric'})
  }
}