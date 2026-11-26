import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from './brand'
import { TextLink } from './editorial'
import { vehicles, money, type Vehicle } from '@/lib/fleet'

export function VehicleCard({ vehicle: v }: { vehicle: Vehicle }) {
  return (
    <article className="fleet-preview-card">
      <Link href={`/fleet/${v.slug}`} aria-label={`View ${v.name}, ${money(v.rate)} per day`}>
        <div className="fleet-preview-photo">
          <Image
            src={`/images/${v.slug}.webp`}
            alt={v.imageAlt}
            fill
            sizes="(max-width: 680px) 78vw, (max-width: 960px) 44vw, 23vw"
          />
          <span className="photo-category">{v.label}</span>
        </div>
        <div className="fleet-preview-title">
          <h3>{v.name}</h3>
          <span className="view-model-arrow">
            <ArrowUpRight size={17} />
          </span>
        </div>
        <p className="fleet-preview-rate">
          <strong>{money(v.rate)}</strong> / day
        </p>
      </Link>
    </article>
  )
}
export function FleetShowcase() {
  return (
    <section className="shell home-fleet section-space" aria-labelledby="fleet-heading">
      <div className="section-heading-row">
        <div>
          <Eyebrow>THE COLLECTION</Eyebrow>
          <h2 id="fleet-heading" className="editorial-title">
            Find your drive.
          </h2>
        </div>
        <TextLink href="/fleet">View all vehicles</TextLink>
      </div>
      <div className="preview-grid">
        {vehicles.map((v) => (
          <VehicleCard key={v.slug} vehicle={v} />
        ))}
      </div>
    </section>
  )
}
