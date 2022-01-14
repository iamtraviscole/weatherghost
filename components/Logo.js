import React from 'react'
import Link from 'next/link'

import LogoSVG from '../public/weatherghostlogo.svg'

export default function Logo() {
  return (
    <div className='Logo__logo'>
      <Link href='/'><a><LogoSVG /></a></Link>
    </div>
  )
}
