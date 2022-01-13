import { useState } from 'react'
import { useRouter } from 'next/router'

import LocationIcon from '../public/icons/location.svg'
import CloseIcon from '../public/icons/close.svg'

export default function NavSearch() {
  const [location, setLocation] = useState('')

  const router = useRouter()

  const onChangeLocation = (e) => setLocation(e.target.value)
  
  const onSubmitSearch = (e) => {
    e.preventDefault()
    location.trim() && router.push(`/weather/${location.trim()}`)
    setLocation('')
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
          placeholder='Enter Location'
          onChange={onChangeLocation}
        />
      </div>
    </form>
  )
}
