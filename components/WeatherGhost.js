import React from 'react'

export default function WeatherGhost({ filename }) {
  return (
    <div className='WeatherGhost'>
      <img src={`/ghosts/${filename}`} alt='' />
    </div>
  )
}
