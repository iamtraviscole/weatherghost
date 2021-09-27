import { useState } from 'react'

import LocationIcon from '../public/icons/location.svg'
import CloseIcon from '../public/icons/close.svg'

export default function NavSearch() {
  const [location, setLocation] = useState('')

  const onChangeLocation = (e) => setLocation(e.target.value)
  
  const onSubmitSearch = (e) => {
    e.preventDefault()

    const recentLocations = JSON.parse(localStorage.getItem('recentLocations')) || []
    const newRecentLocations = recentLocations.length < 3 
      ? [...recentLocations, location]
      : [...recentLocations.slice(1), location]
    localStorage.setItem('recentLocations', JSON.stringify(newRecentLocations))
  }

  const onClearSearch = (e) => setLocation('')

  return (
    <form className='NavSearch__form' autoComplete='off' onSubmit={onSubmitSearch}>
      <div className='NavSearch__form-inner-ctr'>
        <span className='NavSearch__form-location-icon'>
          <LocationIcon />
        </span>
        {location &&
        <button
          type='button'
          className='NavSearch__form-clear-icon'
          onClick={onClearSearch}
        >
          <CloseIcon />
        </button>}
        <input type='text' 
          className='NavSearch__form-location'
          id='NavSearch__form-location'
          name='NavSearch__form-location'
          value={location}
          placeholder={'Enter location'}
          onChange={onChangeLocation}
        />
      </div>
    </form>
  )
}
