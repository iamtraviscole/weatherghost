import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavSearch from './NavSearch'

import Logo from '../public/weatherghostlogo.svg'

export default function Nav() {
  const [unit, setUnit] = useState('')
  const { pathname } = useRouter()

  const localUnitToState = () => {
    const localUnit = localStorage.getItem('unit') || 'imperial'
    setUnit(localUnit)
  }

  useEffect(() => localUnitToState(), [])

  const onUnitClick = (e) => {
    localStorage.setItem('unit', e.target.value)
    localUnitToState()
  }

  const unitClass = (buttonUnit) => {
    return unit === buttonUnit
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