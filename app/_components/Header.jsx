"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <div className="relative bg-white rounded-md shadow-sm">
      <div className="flex items-center justify-between p-4 md:px-20">
        <div className=''>
          <Link href={'/'}><Image src="/logo.png" alt="logo" width={100} height={100} /></Link>
        </div>

        <div className="hidden md:block">
          <ul className='flex items-center justify-center text-xl font-semibold gap-14'>
            <li className={`cursor-pointer ${isActive('/movies') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/movies'}>Movies</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/sherehe') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/sherehe'}>Sherehe</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/sports') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/sports'}>Sports</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/meetups') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/meetups'}>Meetups</Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center mt-4 lg:mt-0">
          <Button>Get Started</Button>

          <button
            className="ml-4 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <ul className='flex flex-col items-center justify-center gap-4 py-4 text-xl font-semibold'>
            <li className={`cursor-pointer ${isActive('/movies') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/movies'} onClick={handleLinkClick}>Movies</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/sherehe') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/sherehe'} onClick={handleLinkClick}>Sherehe</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/sports') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/sports'} onClick={handleLinkClick}>Sports</Link>
            </li>
            <li className={`cursor-pointer ${isActive('/meetups') ? 'opacity-100 after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-secondary' : 'opacity-65 hover:opacity-100'} relative`}>
              <Link href={'/meetups'} onClick={handleLinkClick}>Meetups</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Header