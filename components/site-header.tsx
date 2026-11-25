'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { Brand } from '@/components/brand'
import { business } from '@/lib/fleet'

const navigation = [
  ['Home', 'home'],
  ['Our Fleet', 'fleet'],
  ['Rental Options', 'rental-options'],
  ['Service Area', 'service-area'],
  ['Contact', 'contact'],
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuButton = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    function closeOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [open])

  useEffect(() => {
    if (pathname !== '/') return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-12% 0px -67% 0px', threshold: 0 },
    )
    navigation.forEach(([, id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [pathname])

  function navLinks(mobile = false) {
    return navigation.map(([title, id]) => (
      <Link
        key={id}
        href={id === 'home' ? '/#home' : `/#${id}`}
        className={pathname === '/' && active === id ? 'nav-link nav-active' : 'nav-link'}
        aria-current={pathname === '/' && active === id ? 'location' : undefined}
        onClick={() => {
          setActive(id)
          setOpen(false)
        }}
      >
        {title}
        {mobile && <ArrowUpRight size={16} aria-hidden="true" />}
      </Link>
    ))
  }

  return (
    <header className="site-header" ref={headerRef}>
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks()}
        </nav>
        <div className="header-actions">
          <Link
            className="action action-gold header-book"
            href="/book"
            onClick={() => setOpen(false)}
          >
            Book a Car <ArrowUpRight aria-hidden="true" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {navLinks(true)}
          <a className="mobile-phone" href={`tel:${business.phone}`}>
            <Phone size={17} />
            {business.phoneDisplay}
          </a>
        </nav>
      )}
    </header>
  )
}
