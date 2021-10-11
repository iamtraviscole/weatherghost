import React from 'react'

import { locationDate } from '../utils/dates'

export default function WeatherAlerts({ alerts, closeModal, timezoneOffset }) {
  const weatherAlerts = alerts.map((alert, i) => {
    return (
      <div key={i} className='WeatherAlerts__alerts-alert'>  
        {alert.event && <h3>{alert.event}</h3>}
        {alert.sender_name && <div className='WeatherAlerts__alerts-alert-issued'>
          <p>Issued by {alert.sender_name}</p>
        </div>}
        <div className='WeatherAlerts__alerts-alert-time'>
          {alert.start && <p>{locationDate(alert.start, timezoneOffset, 'ddd, h:mm A')}</p>}
          {alert.end && <p> Until {locationDate(alert.end, timezoneOffset, 'ddd, h:mm A')}</p>}
        </div>
        {alert.description && <div className='WeatherAlerts__alerts-alert-description'>
            <p>{alert.description}</p>
        </div>}
      </div>
    )
  })

  return (
    <div className='WeatherAlerts' onClick={closeModal}>
      <div className='WeatherAlerts__alerts-ctr'>
        <div className='WeatherAlerts__alerts' onClick={e => e.stopPropagation()}>  
          {weatherAlerts}
        </div>
        <div className='WeatherAlerts__close'>
          <button onClick={closeModal}>close</button>
        </div>
      </div>
    </div>
  )
}
