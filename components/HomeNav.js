import Logo from './Logo'
import UnitButtons from "./UnitButtons";

export default function HomeNav() {
  return (
    <nav className='HomeNav'>
      <div className='HomeNav__logo'>
        <Logo />
      </div>
      <div className='HomeNav__units'>
        <UnitButtons />
      </div>
    </nav>
  )
}
