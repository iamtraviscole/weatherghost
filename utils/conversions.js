export const fOrC = (temp, units) => {
  return units === 'metric' 
    ? Math.round(((temp - 32) * 5/9).toPrecision(4)) 
    : Math.round(temp)
}