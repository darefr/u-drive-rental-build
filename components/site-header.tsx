'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, UserRound, X } from 'lucide-react'
import { Brand, WheelIcon } from './brand'
import { business } from '@/lib/fleet'
import { navigation } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const drawer = useRef<HTMLDialogElement>(null)
  const rentalMenu = useRef<HTMLDivElement>(null)
  const rentalToggle = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  useEffect(() => {
    drawer.current?.close()
    setOptionsOpen(false)
  }, [pathname])
  useEffect(() => {
    if (!open) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 1180px)')
    const changed = () => {
      if (desktop.matches) drawer.current?.close()
    }
    desktop.addEventListener('change', changed)
    return () => {
      document.body.style.overflow = overflow
      desktop.removeEventListener('change', changed)
    }
  }, [open])
  useEffect(() => {
    if (!optionsOpen) return
    const outside = (e: PointerEvent) => {
      if (!rentalMenu.current?.contains(e.target as Node)) setOptionsOpen(false)
    }
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOptionsOpen(false)
        rentalToggle.current?.focus()
      }
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [optionsOpen])
  const active = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))
  const current = (href: string) => (active(href) ? ('page' as const) : undefined)
  return (
    <header className="masthead drive-header" data-ready={ready}>
      <div className="shell masthead-inner">
        <Brand reversed />
        <nav className="main-nav" aria-label="Main navigation">
          {navigation
            .filter((n) => !['/faq', '/with-driver'].includes(n.href))
            .map((n) =>
              n.href === '/self-drive' ? (
                <div
                  className="rental-nav"
                  ref={rentalMenu}
                  key={n.href}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setOptionsOpen(false)
                  }}
                >
                  <Link
                    href="/self-drive"
                    aria-current={current('/self-drive') || current('/with-driver')}
                  >
                    Rental Options
                  </Link>
                  <button
                    ref={rentalToggle}
                    type="button"
                    aria-label="Show rental options"
                    aria-expanded={optionsOpen}
                    aria-controls="rental-nav-options"
                    onClick={() => setOptionsOpen(!optionsOpen)}
                  >
                    <ChevronDown size={14} />
                  </button>
                  {optionsOpen && (
                    <div id="rental-nav-options" className="rental-popover">
                      <Link href="/self-drive">
                        <WheelIcon /> Self Drive <ArrowRight size={15} />
                      </Link>
                      <Link href="/with-driver">
                        <UserRound size={16} /> With Driver <ArrowRight size={15} />
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={n.href} href={n.href} aria-current={current(n.href)}>
                  {n.label}
                </Link>
              ),
            )}
        </nav>
        <div className="header-tools">
          <Link className="action action-gold header-cta" href="/booking">
            Book Now <ArrowUpRight />
          </Link>
          <button
            className="menu-trigger icon-button"
            type="button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="navigation-drawer"
            onClick={() => {
              drawer.current?.showModal()
              setOpen(true)
            }}
          >
            <Menu />
          </button>
        </div>
      </div>
      <dialog
        id="navigation-drawer"
        className="navigation-drawer"
        ref={drawer}
        aria-labelledby="drawer-title"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (
            e.target === e.currentTarget &&
            e.clientX < e.currentTarget.getBoundingClientRect().left
          )
            drawer.current?.close()
        }}
      >
        <div className="drawer-top">
          <Brand />
          <h2 id="drawer-title" className="sr-only">
            U Drive navigation
          </h2>
          <button
            autoFocus
            type="button"
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => drawer.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav className="drawer-links" aria-label="Mobile navigation">
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={current(n.href)}
              onClick={() => drawer.current?.close()}
            >
              {n.label === 'Fleet' ? 'Our Fleet' : n.label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
        <Link
          className="action action-gold drawer-book"
          href="/booking"
          onClick={() => drawer.current?.close()}
        >
          Book Now <ArrowRight />
        </Link>
        <a className="drawer-contact" href={`tel:${business.phone}`}>
          <Phone size={16} />
          {business.phoneDisplay}
        </a>
      </dialog>
    </header>
  )
}
