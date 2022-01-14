import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import '../styles/global/reset.scss'
import '../styles/global/theme.scss'

import '../styles/other/nprogress.scss'

import '../styles/components/Layout.scss'
import '../styles/components/HomeNav.scss'
import '../styles/components/Nav.scss'
import '../styles/components/Logo.scss'
import '../styles/components/NavSearch.scss'
import '../styles/components/UnitButtons.scss'
import '../styles/components/Footer.scss'
import '../styles/components/Home.scss'
import '../styles/components/Weather.scss'
import '../styles/components/WeatherAlerts.scss'
import '../styles/components/WeatherHourly.scss'
import '../styles/components/WeatherDaily.scss'
import '../styles/components/WeatherGhost.scss'

import UnitsContext from '../contexts/UnitsContext'  

NProgress.configure({showSpinner: false})

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const npStart = () => NProgress.start()
    const npDone = () => NProgress.done()

    router.events.on('routeChangeStart', npStart)
    router.events.on('routeChangeComplete', npDone)
    router.events.on('routeChangeError', npDone)

    return () => {
      router.events.off('routeChangeStart', npStart)
      router.events.off('routeChangeComplete', npDone)
      router.events.off('routeChangeError', npDone)
    }
  }, [router])

  return (
    <UnitsContext>
      <Component {...pageProps} />
    </UnitsContext>
  )
    
}

export default MyApp
