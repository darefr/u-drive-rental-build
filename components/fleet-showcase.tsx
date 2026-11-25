'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Info } from 'lucide-react'
import { Eyebrow } from '@/components/brand'
import { bookingLink, money, vehicles, type Vehicle } from '@/lib/fleet'

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="vehicle-card">
      <Link
        href={`/cars/${vehicle.slug}`}
        className="vehicle-detail-link"
        aria-label={`Explore ${vehicle.name}, ${money(vehicle.rate)} per day`}
      >
        <div className="vehicle-photo">
          <Image
            src={`/images/${vehicle.slug}-card.webp`}
            alt={vehicle.imageAlt}
            fill
            sizes="(max-width: 370px) 100vw, (max-width: 1000px) 50vw, 25vw"
          />
          <span className="vehicle-category">
            <i aria-hidden="true" />
            {vehicle.label}
          </span>
        </div>
        <div className="vehicle-info">
          <div className="vehicle-name-row">
            <h3>{vehicle.name}</h3>
            <ArrowUpRight size={18} aria-hidden="true" />
          </div>
          <p className="day-rate card-rate">
            <strong>{money(vehicle.rate)}</strong>
            <span>/day</span>
          </p>
          <p className="vehicle-description">{vehicle.description}</p>
        </div>
      </Link>
      <div className="card-requests">
        <p className="vehicle-modes">
          <span className="request-label">ON REQUEST</span>Self drive / With driver
        </p>
        <Link
          href={bookingLink(vehicle.slug)}
          className="small-book"
          aria-label={`Book ${vehicle.name}`}
        >
          Book <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  )
}

const categories = ['All vehicles', 'SUVs', 'Hatchbacks'] as const
export function FleetShowcase() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All vehicles')
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const displayed = vehicles.filter(
    (v) => filter === 'All vehicles' || v.category === (filter === 'SUVs' ? 'SUV' : 'Hatchback'),
  )
  return (
    <section
      id="fleet"
      className="fleet-section"
      aria-labelledby="fleet-heading"
      data-ready={ready}
    >
      <div className="shell">
        <div className="section-heading-row">
          <div>
            <Eyebrow>THE FLEET</Eyebrow>
            <h2 id="fleet-heading" className="display section-title">
              CHOOSE YOUR RIDE<span className="brand-period">.</span>
            </h2>
          </div>
          <fieldset className="fleet-filters">
            <legend className="sr-only">Filter vehicles by body style</legend>
            {categories.map((category) => (
              <label key={category}>
                <input
                  className="sr-only"
                  type="radio"
                  name="body-style"
                  value={category}
                  checked={filter === category}
                  onChange={() => setFilter(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </fieldset>
        </div>
        <p className="sr-only" role="status">
          Showing {displayed.length} {displayed.length === 1 ? 'vehicle' : 'vehicles'}.
        </p>
        <div className="fleet-grid">
          {displayed.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
        <p className="fleet-note">
          <Info size={15} aria-hidden="true" />
          Daily vehicle rates in Nepalese rupees. Availability, rental mode, and final price are
          confirmed with your inquiry. Images are illustrative.
        </p>
      </div>
    </section>
  )
}
