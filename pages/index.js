import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

import Home from '../components/Home'

export default function Index() {
  const [location, setLocation] = useState('')
  const [unit, setUnit] = useState('imperial')

  return (
    <Layout>
      <Home 
        location={location} 
        setLocation={setLocation}
        unit={unit}
        setUnit={setUnit}
      />
    </Layout>
  )
}
