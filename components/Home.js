import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import WeatherGhost from '../public/weatherghost.svg'
import LocationIcon from '../public/icons/location.svg'
import CloseIcon from '../public/icons/close.svg'

export default function Home() {
  const [location, setLocation] = useState('')
  const [recentLocations, setRecentLocations] = useState([])

  const router = useRouter()

  useEffect(() => {
    const localRecentLocations = JSON.parse(localStorage.getItem('recentLocations'))
    localRecentLocations && setRecentLocations(localRecentLocations)
  }, [])

  const onChangeLocation = (e) => setLocation(e.target.value)
  
  const onSubmitSearch = (e) => {
    e.preventDefault()
    router.push(`/weather/${location}`)
  }

  const onClearSearch = () => setLocation('')

  const onClearRecentLocations = () => {
    localStorage.removeItem('recentLocations')
    setRecentLocations([])
  }

  const locationExamplesClass = location.length > 0 
    ? 'Home__search-form-location-examples--hide'
    : 'Home__search-form-location-examples'

  const recentLocationButtons = recentLocations.map((location, i) => {
    return (
      <Link key={i} href={`/weather/${location}`}>
        <a className='Home__recent-locations-location'>{location}</a>
      </Link>
    )
  })

  return (
    <div className='Home'>
      <div className='Home__search-outer-ctr'>
        <div className='Home__search'>
          <div className='Home__search-ghost'>
            <WeatherGhost/>
          </div>
          <form className='Home__search-form' autoComplete='off' onSubmit={onSubmitSearch}>
            <h1>Enter location</h1>
            <div className='Home__search-form-inner-ctr'>
              <span className='Home__search-form-location-icon'>
                <LocationIcon />
              </span>
              {location &&
              <button
                type='button'
                className='Home__search-form-clear-icon'
                onClick={onClearSearch}
              >
                <CloseIcon />
              </button>}
              <input type='text' 
                className='Home__search-form-location'
                id='Home__search-form-location'
                name='Home__search-form-location'
                value={location}
                onChange={onChangeLocation}
              />
              <span className={locationExamplesClass}></span>
            </div>
          </form>
          {recentLocations.length > 0 && 
          <div className='Home__recent'>
            <div className='Home__recent-locations'>
              {recentLocationButtons}
            </div>
            <button 
              className='Home__recent-clear'
              onClick={onClearRecentLocations}
            >
              <CloseIcon /> clear recent locations
            </button>
          </div>}
        </div>
      </div>
    </div>
  )
}
