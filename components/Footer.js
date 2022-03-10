import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='Footer__outer-ctr'>
        <span className='Footer__by'>
          &copy; {new Date().getFullYear()} by <Link href='http://trvscl.com'><a>trvscl.com</a></Link>
        </span>
      </div>
    </div>
  )
}
