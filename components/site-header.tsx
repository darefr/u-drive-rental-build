'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { Brand } from './brand'
import { business, whatsappLink } from '@/lib/fleet'
import { navigation } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  useEffect(() => {
    dialog.current?.close()
  }, [pathname])
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 1180px)')
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close()
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.body.style.overflow = original
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [open])
  const active = (path: string) =>
    pathname === path || (path === '/fleet' && pathname.startsWith('/fleet/'))
  return (
    <>
      <div className="utility-bar">
        <div className="shell utility-inner">
          <span className="utility-place">
            <MapPin size={13} aria-hidden="true" /> Kathmandu, Nepal <i />{' '}
            <span>Nepal-wide service</span>
          </span>
          <div className="utility-contact">
            <a href={`tel:${business.phone}`}>
              <Phone size={12} /> {business.phoneDisplay}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={13} /> WhatsApp <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
      <header className="masthead" data-ready={ready}>
        <div className="shell masthead-inner">
          <Brand />
          <nav className="main-nav" aria-label="Main navigation">
            {navigation
              .filter((n) => n.label !== 'FAQ')
              .map((n) => (
                <Link key={n.href} href={n.href} aria-current={active(n.href) ? 'page' : undefined}>
                  {n.label}
                </Link>
              ))}
          </nav>
          <div className="header-tools">
            <Link className="action action-gold header-cta" href="/booking">
              Book a Car <ArrowUpRight />
            </Link>
            <button
              className="menu-trigger icon-button"
              type="button"
              aria-label="Open navigation"
              aria-haspopup="dialog"
              aria-controls="navigation-drawer"
              aria-expanded={open}
              onClick={() => {
                dialog.current?.showModal()
                setOpen(true)
              }}
            >
              <Menu />
            </button>
          </div>
        </div>
        <dialog
          className="navigation-drawer"
          id="navigation-drawer"
          ref={dialog}
          aria-labelledby="drawer-title"
          onClose={() => setOpen(false)}
          onClick={(e) => {
            if (
              e.target === e.currentTarget &&
              e.clientX < e.currentTarget.getBoundingClientRect().left
            )
              dialog.current?.close()
          }}
        >
          <div className="drawer-top">
            <span id="drawer-title" className="eyebrow">
              U DRIVE / NAVIGATION
            </span>
            <button
              type="button"
              autoFocus
              className="icon-button"
              aria-label="Close navigation"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="drawer-links">
            {navigation.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? 'page' : undefined}
                onClick={() => dialog.current?.close()}
              >
                {n.label === 'Fleet' ? 'Our Fleet' : n.label}
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </nav>
          <Link
            className="action action-gold drawer-book"
            href="/booking"
            onClick={() => dialog.current?.close()}
          >
            Book a Car <ArrowUpRight />
          </Link>
          <a className="drawer-contact" href={`tel:${business.phone}`}>
            <Phone size={16} />
            {business.phoneDisplay}
          </a>
        </dialog>
      </header>
    </>
  )
}
