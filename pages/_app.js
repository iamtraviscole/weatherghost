import '../styles/globals/reset.scss'
import '../styles/globals/theme.scss'

import '../styles/components/Layout.scss'
import '../styles/components/Nav.scss'
import '../styles/components/NavSearch.scss'
import '../styles/components/Footer.scss'
import '../styles/components/Home.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
