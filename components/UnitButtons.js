import { useContext } from 'react'

import { UnitsContext } from '../contexts/UnitsContext'

export default function UnitButtons() {
  const { units, setUnits } = useContext(UnitsContext)

  const onUnitClick = (e) => {
    setUnits(e.target.value)
  }

  const unitClass = (buttonUnits) => {
    return units === buttonUnits
      ? 'UnitButtons__button UnitButtons__button--active'
      : 'UnitButtons__button'
  }
  
  return (
    <div className='UnitButtons__buttons'>
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
  )
}
