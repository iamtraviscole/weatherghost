import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

import '../styles/globals/reset.scss'
import '../styles/globals/theme.scss'

import '../styles/other/nprogress.scss'

import '../styles/components/Layout.scss'
import '../styles/components/Nav.scss'
import '../styles/components/NavSearch.scss'
import '../styles/components/Footer.scss'
import '../styles/components/Home.scss'

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

  return <Component {...pageProps} />
}

export default MyApp
