import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs-plugin-utc'

dayjs.extend(dayjsPluginUTC)

export const locationDate = (unix, unixOffset, dayjsFormat) => {
  return dayjs.unix(unix + unixOffset).utc(true).format(dayjsFormat)
}

export const dayIsToday = (unix1, unix2, unixOffset) => {
  const day1 = dayjs.unix(unix1 + unixOffset).utc(true).day()
  const day2 = dayjs.unix(unix2 + unixOffset).utc(true).day()

  return day1 === day2
}