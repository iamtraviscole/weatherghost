import Head from 'next/head'
import { useRouter } from 'next/router'

import HomeNav from './HomeNav'
import Nav from './Nav'
import Footer from './Footer'

export default function Layout(props) {
  const { pathname } = useRouter()

  return (
    <> 
    <Head>
      <title>Weather Ghost</title>
      <meta name='description' content='' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <div className='Layout'>
      <header className='Layout__header'>
        {pathname === '/' ? <HomeNav /> : <Nav />}
      </header>
      <main className='Layout__main'>
        {props.children}
      </main>
      <footer className='Layout__footer'>
        <Footer />
      </footer>
    </div>
    </>
  )
}