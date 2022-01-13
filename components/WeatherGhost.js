import React from 'react'

import { ghostHelper } from '../utils/weather'

export default function WeatherGhost({ weather, filename }) {

  return (
    <div className='WeatherGhost'>
      <img src={`/ghosts/${filename}`} alt='' />
    </div>
  )
}
