import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CarFront, Check, Gauge, Users, Zap } from 'lucide-react'
import { vehicles, money, type Vehicle } from '@/lib/fleet'
import { modelDetails } from '@/lib/vehicle-specs'
import { tripHref, type TripSearch } from '@/lib/trip-search'
import { SwipeRail } from './swipe-rail'

export function VehicleCard({
  vehicle: v,
  trip,
  eager = false,
}: {
  vehicle: Vehicle
  trip?: TripSearch
  eager?: boolean
}) {
  const specs = modelDetails[v.slug]
  const detail = tripHref(`/fleet/${v.slug}`, trip ? { ...trip, vehicle: '' } : {})
  const booking = tripHref('/booking', { ...trip, vehicle: v.slug })
  return (
    <article className="vehicle-tile">
      <Link href={detail} className="vehicle-tile-photo" aria-label={`View ${v.name} gallery`}>
        <Image
          src={`/images/${v.slug}.webp`}
          alt={v.imageAlt}
          fill
          sizes="(max-width:600px) 84vw, (max-width:1050px) 44vw, 25vw"
          loading={eager ? 'eager' : 'lazy'}
        />
        <span className="vehicle-type">
          {specs.power === 'Electric' ? <Zap size={12} /> : <CarFront size={12} />}
          {v.label}
        </span>
      </Link>
      <div className="vehicle-tile-body">
        <div className="vehicle-name-row">
          <h3>
            <Link href={detail}>{v.name}</Link>
          </h3>
          <span className="on-request">
            <i />
            On request
          </span>
        </div>
        <p className="vehicle-brief">{v.description}</p>
        <div className="car-spec-chips">
          <span>
            <Users size={15} />
            {specs.seats === 'Confirm layout' ? 'Compact' : specs.seats}
          </span>
          <span>
            {specs.transmission === 'Automatic' ? <Gauge size={15} /> : <Check size={15} />}
            {specs.transmission === 'Automatic' ? 'Automatic' : 'Self-drive option'}
          </span>
        </div>
        <div className="vehicle-rate">
          <strong>{money(v.rate)}</strong>
          <span> / day</span>
        </div>
        <div className="vehicle-tile-links">
          <Link href={detail} aria-label={`View details for ${v.name}`}>
            View Details <ArrowUpRight size={14} />
          </Link>
          <Link href={booking} aria-label={`Book ${v.name}`}>
            Book Now <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function FleetShowcase() {
  return (
    <section className="shell featured-fleet" aria-labelledby="fleet-heading">
      <div className="drive-section-head">
        <div>
          <p className="drive-eyebrow">The U Drive collection</p>
          <h2 id="fleet-heading" className="drive-section-title">
            Explore our fleet.
          </h2>
        </div>
        <Link href="/fleet" className="drive-section-link">
          View All Vehicles <ArrowUpRight size={16} />
        </Link>
      </div>
      <p className="drive-subtitle">
        Distinctive cars, clear daily rates. Find the right fit for your route.
      </p>
      <SwipeRail label="Featured rental vehicles">
        {vehicles.map((v) => (
          <VehicleCard key={v.slug} vehicle={v} />
        ))}
      </SwipeRail>
    </section>
  )
}
