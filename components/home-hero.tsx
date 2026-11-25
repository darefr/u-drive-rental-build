import Link from 'next/link'
import { ArrowRight, ArrowUpRight, MapPin, MessageCircle } from 'lucide-react'
import { money, vehicles, whatsappLink } from '@/lib/fleet'

export function HomeHero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <picture className="hero-art">
        <source media="(max-width: 640px)" srcSet="/images/hero-mobile.webp" />
        <source media="(max-width: 1100px)" srcSet="/images/hero-medium.webp" />
        <img
          src="/images/hero-wide.webp"
          width={1600}
          height={696}
          fetchPriority="high"
          decoding="async"
          alt="A silver Deepal S05 on an open road against the Himalayan mountains"
        />
      </picture>
      <div className="hero-shade" />
      <div className="shell hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <MapPin size={15} aria-hidden="true" /> KATHMANDU, NEPAL
          </p>
          <h1 id="hero-heading" className="display hero-title">
            DRIVE NEPAL.
            <br />
            <em>YOUR WAY.</em>
            <span className="sr-only"> Car rental in Kathmandu</span>
          </h1>
          <p className="hero-description">
            Premium cars. Flexible rentals. From Kathmandu
            <br className="wide-only" /> to the open roads of Nepal.
          </p>
          <div className="hero-actions">
            <Link href="/#fleet" className="action action-gold">
              Explore the Fleet <ArrowRight aria-hidden="true" />
            </Link>
            <a
              className="action action-glass"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>
        <Link
          href="/cars/deepal-s05"
          className="hero-caption"
          aria-label="View featured vehicle, Deepal S05"
        >
          <span className="caption-rule" />
          <span>
            <span className="caption-kicker">FEATURED VEHICLE</span>
            <strong>
              Deepal S05 <span className="caption-price">{money(vehicles[0].rate)}/day</span>
            </strong>
          </span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
