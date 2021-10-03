export const localTime = (unix, timeZoneOffset) => {
  const date = new Date((unix + timeZoneOffset) * 1000)
  return date.toLocaleString('en-US', {timeZone: 'UTC', hour: 'numeric', minute: 'numeric'})
}