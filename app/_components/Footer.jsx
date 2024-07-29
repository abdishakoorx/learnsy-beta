import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Footer() {
  return (
    <footer className='mt-10 text-gray-300 bg-gray-900'>
      <div className='max-w-6xl px-4 py-10 mx-auto sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          {/* Company Info */}
          <div>
            <h3 className='mb-4 text-lg font-semibold text-white'>Lernsy</h3>
            <p className='mb-4'>Your one-stop platform for booking events, sports activities, concerts, and movies.</p>
            <div className='flex space-x-4'>
              <Link href={'/'}><Image src={'/instagram.png'} width={30} height={30} className='' alt='instagram' /></Link>
              <Link href={'/'}><Image src={'/facebook.png'} width={30} height={30} className='' alt='facebook' /></Link>
              <Link href={'/'}>
                <div className="relative inline-block">
                  <div className="absolute inset-0 transform bg-white rounded-lg translate-y--1"></div>
                  <Image src={'/twitter.png'} width={30} height={30} className="relative" alt='twitter'/>
                </div>
              </Link>
              <Link href={'/'}><Image src={'/tiktok.png'} width={30} height={30} className='' alt='tiktok' /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='mb-4 text-lg font-semibold text-white'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><Link href={'/'} className='hover:text-white'>Home</Link></li>
              <li><Link href={'/'} className='hover:text-white'>Events</Link></li>
              <li><Link href={'/'} className='hover:text-white'>Movies</Link></li>
              <li><Link href={'/'} className='hover:text-white'>About Us</Link></li>
              <li><Link href={'/'} className='hover:text-white'>Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='mb-4 text-lg font-semibold text-white'>Support</h3>
            <ul className='space-y-2'>
              <li><Link href={'/'} className='hover:text-white'>FAQ</Link></li>
              <li><Link href={'/'} className='hover:text-white'>Terms of Service</Link></li>
              <li><Link href={'/'} className='hover:text-white'>Privacy Policy</Link></li>
              <li><Link href={'/'} className='hover:text-white'>Help Center</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className='mb-4 text-lg font-semibold text-white'>Stay Updated</h3>
            <p className='mb-4'>Subscribe to our newsletter for the latest updates and offers.</p>
            <form className='flex'>
              <input
                type="email"
                placeholder="Enter your email"
                className='flex-grow px-4 py-2 rounded-l-md focus:outline-none'
              />
              <Button
                type="submit"
                className='px-4 py-2 text-white bg-secondary rounded-r-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary'
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className='pt-8 mt-8 text-center border-t border-gray-700'>
          <p>&copy; {new Date().getFullYear()} Lernsy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer