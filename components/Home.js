import React, { useState, useEffect } from 'react'

import WeatherGhost from '../public/weatherghost.svg'
import LocationIcon from '../public/icons/location.svg'
import CloseIcon from '../public/icons/close.svg'

export default function Home(props) {
  const [recentLocations, setRecentLocations] = useState([])

  const localRecentLocationsToState = () => {
    const localRecentLocations = JSON.parse(localStorage.getItem('recentLocations'))
    localRecentLocations && setRecentLocations(localRecentLocations)
  }

  useEffect(() => {
    localRecentLocationsToState()
  }, [])

  const onChangeLocation = (e) => {
    props.setLocation(e.target.value)
  }
  
  const onSubmitSearch = (e) => {
    e.preventDefault()

    const newRecentLocations = recentLocations.length < 3 
      ? [...recentLocations, props.location]
      : [...recentLocations.slice(1), props.location]

    localStorage.setItem('recentLocations', JSON.stringify(newRecentLocations))
    localRecentLocationsToState()
  }

  const onClearSearch = (e) => {
    props.setLocation('')
  }

  const onClearRecentLocations = (e) => {
    localStorage.removeItem('recentLocations')
    setRecentLocations([])
  }

  const locationExamplesClass = props.location.length > 0 
    ? 'Home__search-form-location-examples--hide'
    : 'Home__search-form-location-examples'

  const recentLocationButtons = recentLocations.map((location, i) => {
    return <button key={i} className='Home__recent-locations-location'>{location}</button>
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
              {props.location &&
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
                value={props.location}
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
