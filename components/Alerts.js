import React from 'react'

import { locationDate } from '../utils/dates'

export default function Alerts({ alerts, closeModal, timezoneOffset }) {
  const weatherAlerts = alerts.map((alert, i) => {
    return (
      <div key={i} className='Alerts__alerts-alert'>  
        {alert.event && <h3>{alert.event}</h3>}
        {alert.sender_name && <div className='Alerts__alerts-alert-issued'>
          <p>Issued by {alert.sender_name}</p>
        </div>}
        <div className='Alerts__alerts-alert-time'>
          {alert.start && <p>{locationDate(alert.start, timezoneOffset, 'ddd, h:mm A')}</p>}
          {alert.end && <p> Until {locationDate(alert.end, timezoneOffset, 'ddd, h:mm A')}</p>}
        </div>
        {alert.description && <div className='Alerts__alerts-alert-description'>
            <p>{alert.description}</p>
        </div>}
      </div>
    )
  })

  return (
    <div className='Alerts' onClick={closeModal}>
      <div className='Alerts__alerts-ctr'>
        <div className='Alerts__alerts' onClick={e => e.stopPropagation()}>  
          {weatherAlerts}
        </div>
        <div className='Alerts__close'>
          <button onClick={closeModal}>close</button>
        </div>
      </div>
    </div>
  )
}
