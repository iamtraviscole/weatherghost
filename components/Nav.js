import React from 'react'
import Link from 'next/link'

import Logo from '../public/weatherghostlogo.svg'

export default function Nav() {
  return (
    <nav className='Nav'>
      <div className='Nav__logo'>
        <Link href='/'><a><Logo /></a></Link>
      </div>
      <ul className='Nav__links'>
        <li><Link href='/'><a>Lorem</a></Link></li>
        <li><Link href='/'><a>Ipsum</a></Link></li>
      </ul>
    </nav>
  )
}