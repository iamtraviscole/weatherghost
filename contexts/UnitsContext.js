import { createContext, useState, useEffect } from 'react'

export const UnitsContext = createContext()

export default function UnitsContextProvider(props) {
  const [units, setUnits] = useState('imperial')

  useEffect(() => {
    const units = localStorage.getItem('units')
    units && setUnits(units)
  }, [])

  useEffect(() => {
    localStorage.setItem('units', units)
  }, [units])

  return (
    <UnitsContext.Provider value={{units, setUnits}}>
      {props.children}
    </UnitsContext.Provider>
  )
}