import Link from 'next/link'
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react'
import { Brand } from './brand'
import { business, vehicles, whatsappLink } from '@/lib/fleet'
import { navigation } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-identity">
            <Brand reversed />
            <p>
              Self-drive and driver-assisted car rentals from Kathmandu. Choose your car, plan your
              route, and explore Nepal at your own pace.
            </p>
            <a
              href={whatsappLink()}
              className="footer-chat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} /> Talk to U Drive <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            {navigation.slice(0, 5).map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <h2>Plan your rental</h2>
            {navigation.slice(5).map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
            <Link href="/booking">
              Book a Car <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="footer-column">
            <h2>Our fleet</h2>
            {vehicles.map((v) => (
              <Link key={v.slug} href={`/fleet/${v.slug}`}>
                {v.name}
              </Link>
            ))}
          </div>
          <div className="footer-column footer-reach">
            <h2>Get in touch</h2>
            <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={business.facebook} target="_blank" rel="noopener noreferrer">
              Facebook <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-base">
          <span>
            © {new Date().getFullYear()} {business.name}
          </span>
          <span>
            <MapPin size={13} /> Kathmandu, Nepal
          </span>
          <Link href="/privacy">Privacy & enquiries</Link>
        </div>
      </div>
    </footer>
  )
}
