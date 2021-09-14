import React from 'react'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className='Nav'>
      <div className='Nav__logo'>
        <Link href='/'><a>logo here</a></Link>
      </div>
      <ul className='Nav__links'>
        <li><Link href='/'><a>Lorem</a></Link></li>
        <li><Link href='/'><a>Ipsum</a></Link></li>
      </ul>
    </nav>
  )
}