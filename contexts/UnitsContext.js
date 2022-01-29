import { createContext, useState, useEffect } from 'react'

export const UnitsContext = createContext()

export default function UnitsContextProvider(props) {
  const [units, setUnits] = useState('imperial')

  useEffect(() => {
    localStorage.setItem('units', units)
    const localUnits = localStorage.getItem('units')
    localUnits && setUnits(localUnits)
  }, [units])

  return (
    <UnitsContext.Provider value={{units, setUnits}}>
      {props.children}
    </UnitsContext.Provider>
  )
}