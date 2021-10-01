import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavSearch from './NavSearch'

import Logo from '../public/weatherghostlogo.svg'

export default function Nav() {
  const [units, setUnits] = useState()

  const { pathname } = useRouter()

  const localUnitsToState = (stateSetter) => {
    const localUnits = localStorage.getItem('units') || 'imperial'
    stateSetter(localUnits)
  }

  useEffect(() => localUnitsToState(setUnits), [])

  const onUnitClick = (e) => {
    localStorage.setItem('units', e.target.value)
    localUnitsToState(setUnits)
  }

  const unitClass = (buttonUnits) => {
    return units === buttonUnits
      ? 'Nav__units-unit Nav__units-unit--active'
      : 'Nav__units-unit'
  }

  return (
    <nav className='Nav'>
      <div className='Nav__logo'>
        <Link href='/'><a><Logo /></a></Link>
      </div>
      <div className='Nav__right'>
        <div className='Nav__search'>
          {pathname !== '/' && <NavSearch />}
        </div>
        <div className='Nav__units'>
          <button 
            className={unitClass('imperial')}
            value='imperial'
            onClick={onUnitClick}
          >
            &#176;F
          </button>
          <button 
            className={unitClass('metric')}
            value='metric'
            onClick={onUnitClick}
          >
            &#176;C
          </button>
        </div>
      </div>
    </nav>
  )
}