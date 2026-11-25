import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Brand, Eyebrow } from '@/components/brand'
import { business, whatsappLink } from '@/lib/fleet'

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <Eyebrow light>GET IN TOUCH</Eyebrow>
            <h2 className="display footer-title">
              LET’S GET YOU
              <br />
              ON THE ROAD<span className="brand-period">.</span>
            </h2>
          </div>
          <div className="contact-block">
            <p className="contact-label">TALK TO THE KATHMANDU TEAM</p>
            <a className="contact-number" href={`tel:${business.phone}`}>
              <Phone />
              {business.phoneDisplay}
            </a>
            <a className="contact-email" href={`mailto:${business.email}`}>
              <Mail size={17} />
              {business.email}
            </a>
            <div className="contact-actions">
              <a
                className="action action-gold"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                WhatsApp Us
              </a>
              <a
                href={business.facebook}
                className="footer-social"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <Brand />
          <p>© {new Date().getFullYear()} U Drive Rental Car Kathmandu</p>
          <span>
            <MapPin size={14} />
            Kathmandu, Nepal
          </span>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
