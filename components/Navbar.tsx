'use client'

import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx"
import { IoClose } from "react-icons/io5"
import Link from 'next/link'
import { useSession } from "next-auth/react"

type NavLinkProps = {
  href: string
  children: React.ReactNode
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession() 
  
  const navLinks = [
    { name: "PHILOSOPHY", href: "/#Philosophysection" },
    { name: "CATEGORY", href: "/#categories" },
    { name: "ABOUT US", href: "/aboutus" },
    session
      ? { name: "PROFILE", href: "/profile" }
      : { name: "LOGIN", href: "/login" },
  ]

  const DesktopNavLink = ({ href, children }: NavLinkProps) => (
    <li>
      <a
        href={href}
        className="
          relative group font-semibold text-[#6a7077] hover:text-[#005f60] 
          transition-colors duration-100 ease-in-out
          text-[clamp(.8rem,1vw+.5rem,1.1rem)]
          after:content-[''] after:absolute after:bottom-[-5px] after:left-0 
          after:w-0 after:h-4 after:bg-[#005f60] 
          after:transition-all after:duration-300 after:ease-in-out
          hover:after:w-full
        ">
        {children}
      </a>
    </li>
  )

  const MobileNavLink = ({ href, children }: NavLinkProps) => (
    <li>
      <a
        href={href}
        className="text-[#6a7077] hover:text-[#005f60] transition-colors duration-100 ease-in-out"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {children}
      </a>
    </li>
  )

  return (
    <>
      {/* 🧭 Navbar */}
      <nav className="nav w-full h-16 bg-[#ede8e2]
          flex justify-between items-center
          px-6 md:px-12 
          shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
          backdrop-blur-[2.5px]
          border border-[rgba(186,182,178,0.3)]">
        <Link href='/'>
          <div className="logo">
            <img src="/hue-born-logo.svg" alt="logo" />
          </div>
        </Link>

        {/* 🖥 Desktop Menu */}
        <ul className="hidden md:flex nav-menu justify-between items-center gap-[2vw] font-medium">
          {navLinks.map((link) => (
            <DesktopNavLink key={link.name} href={link.href}>
              {link.name}
            </DesktopNavLink>
          ))}
        </ul>

        {/* 📱 Mobile Hamburger */}
        <div className="hamburger md:hidden">
          <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open navigation menu">
            <RxHamburgerMenu size="30" color={'#6a7077'} />
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md 
          bg-[#ede8e2] shadow-xl z-50
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close navigation menu">
            <IoClose size={35} color={'#6a7077'} />
          </button>
        </div>

        <ul className="flex flex-col items-center justify-center gap-8 mt-16">
          {navLinks.map((link) => (
            <MobileNavLink key={link.name} href={link.href}>
              {link.name}
            </MobileNavLink>
          ))}
        </ul>
      </div>

      {/* 🌫 Background overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar
