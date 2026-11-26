import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Mountain } from 'lucide-react'
import { money, vehicles } from '@/lib/fleet'

export function HomeHero() {
  return (
    <section className="cover" aria-labelledby="cover-title">
      <picture className="cover-art">
        <source media="(max-width: 430px)" srcSet="/images/mountain-tall.webp" />
        <source media="(max-width: 680px)" srcSet="/images/mountain-mobile.webp" />
        <source media="(max-width: 1100px)" srcSet="/images/hero-medium.webp" />
        <img
          src="/images/hero-wide.webp"
          width={1600}
          height={696}
          alt="A silver Deepal S05 on a winding road beneath sunlit Himalayan peaks"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="cover-shade" />
      <div className="shell cover-inner">
        <div className="cover-copy">
          <p className="cover-kicker">
            <span /> PREMIUM CAR RENTAL <i /> KATHMANDU
          </p>
          <h1 className="display cover-title" id="cover-title">
            DRIVE NEPAL.
            <br />
            <em>YOUR WAY.</em>
          </h1>
          <p className="cover-description">
            Self-drive and driver-assisted car rentals from Kathmandu, with delivery across Nepal.
          </p>
          <div className="action-row">
            <Link className="action action-gold" href="/booking">
              Book a Car <ArrowRight />
            </Link>
            <Link className="action action-glass" href="/fleet">
              Explore Fleet <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="cover-foot">
          <Link href="/service-area" className="cover-place">
            <Mountain size={17} /> KATHMANDU + ALL NEPAL <ArrowUpRight size={13} />
          </Link>
          <Link className="cover-model" href="/fleet/deepal-s05">
            <span className="in-frame">IN FRAME</span>
            <strong>Deepal S05</strong>
            <span className="frame-rate">{money(vehicles[0].rate)} / day</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
