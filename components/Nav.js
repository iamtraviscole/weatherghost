import NavSearch from './NavSearch'
import UnitButtons from './UnitButtons'
import Logo from './Logo'

export default function Nav() {
  return (
    <nav className='Nav'>
      <div className='Nav__logo'>
        <Logo />
      </div>
      <div className='Nav__right'>
        <div className='Nav__search'>
          <NavSearch />
        </div>
        <div className='Nav__units'>
          <UnitButtons />
        </div>
      </div>
    </nav>
  )
}