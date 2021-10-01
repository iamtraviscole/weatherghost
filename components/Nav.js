import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavSearch from './NavSearch'

import Logo from '../public/weatherghostlogo.svg'

import { UnitsContext } from '../contexts/UnitsContext'

export default function Nav() {
  const { units, setUnits } = useContext(UnitsContext)

  const { pathname } = useRouter()

  const onUnitClick = (e) => {
    setUnits(e.target.value)
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