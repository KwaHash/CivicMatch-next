'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CgClose } from 'react-icons/cg'
import { SlMenu } from 'react-icons/sl'
import MobileNavLink from '@/components/header/mobile-nav-link'
import NavLink from '@/components/header/nav-link'
import { Button } from '@/components/ui/button'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full fixed bg-white shadow-lg z-50">
      <div className="mx-auto px-8">
        <div className="flex justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-all duration-300 ease-out">
              CivicMatch
            </span>
          </Link>

          <div className="hidden xl:flex items-center space-x-10">
            <NavLink 
              text="マッチング"
              linkUrl="/matching"
            />
            <NavLink 
              text="地域検索"
              linkUrl="/search"
            />
            <NavLink 
              text="政治家登録"
              linkUrl="/politician/register"
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-transparent text-gray-700 hover:text-gray-900 focus:outline-none p-0"
            >
              {isMenuOpen ? (
                <CgClose className="text-3xl" />
              ) : (
                <SlMenu className="text-2xl" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <MobileNavLink
              text="マッチング"
              onClick={() => setIsMenuOpen(false)}
              linkUrl="/matching"
            />
            <MobileNavLink
              text="地域検索"
              onClick={() => setIsMenuOpen(false)}
              linkUrl="/search"
            />
            <MobileNavLink
              text="政治家登録"
              onClick={() => setIsMenuOpen(false)}
              linkUrl="/politician/register"
            />
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar