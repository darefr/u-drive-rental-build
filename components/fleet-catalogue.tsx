'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { bookingLink, money, vehicles } from '@/lib/fleet'

export function FleetCatalogue() {
  const [filter, setFilter] = useState('All vehicles')
  const [sort, setSort] = useState('featured')
  const cars = vehicles
    .filter((v) => filter === 'All vehicles' || v.category === filter)
    .sort((a, b) => (sort === 'low' ? a.rate - b.rate : sort === 'high' ? b.rate - a.rate : 0))
  return (
    <section className="catalogue" aria-label="Vehicle catalogue">
      <div className="catalogue-controls">
        <fieldset className="catalogue-filters">
          <legend className="sr-only">Filter by body style</legend>
          {['All vehicles', 'SUV', 'Hatchback'].map((label) => (
            <label key={label}>
              <input
                className="sr-only"
                type="radio"
                name="body-style"
                value={label}
                checked={filter === label}
                onChange={() => setFilter(label)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <label className="sort-control">
          <SlidersHorizontal size={16} />
          <span className="sr-only">Sort vehicles</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured order</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>
      <p className="result-count" role="status">
        {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'} in this collection
      </p>
      <div className="catalogue-list">
        {cars.map((v, i) => (
          <article key={v.slug} className="catalogue-row">
            <Link
              className="catalogue-image"
              href={`/fleet/${v.slug}`}
              aria-label={`Explore ${v.name}`}
            >
              <Image
                src={`/images/${v.slug}.webp`}
                alt={v.imageAlt}
                fill
                sizes="(max-width: 760px) 94vw, 48vw"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </Link>
            <div className="catalogue-content">
              <p className="eyebrow">
                <span className="lane-mark" />
                {v.label}
              </p>
              <h2>
                <Link href={`/fleet/${v.slug}`}>{v.name}</Link>
              </h2>
              <p className="catalogue-description">{v.description}</p>
              <div className="catalogue-modes">
                <span>Self Drive</span>
                <i /> <span>With Driver</span>
              </div>
              <div className="catalogue-rate">
                <strong>{money(v.rate)}</strong>
                <span> / day</span>
              </div>
              <div className="action-row">
                <Link href={`/fleet/${v.slug}`} className="action action-dark">
                  View details <ArrowUpRight />
                </Link>
                <Link href={bookingLink(v.slug)} className="text-action">
                  Book this car <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
