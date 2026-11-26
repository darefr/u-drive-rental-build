'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Mountain, ChevronLeft, ChevronRight } from 'lucide-react'
import { vehicles } from '@/lib/fleet'

const frames = [
  {
    wide: 'nepal-drive-panorama',
    mobile: 'nepal-drive-mobile',
    alt: 'A silver Deepal S05 on the mountain road below the sunlit Himalayas',
    vehicle: vehicles[0],
  },
  {
    wide: 'byd-atto-3-profile',
    mobile: 'byd-atto-3-profile',
    alt: 'The blue BYD Atto 3 on a green hillside road',
    vehicle: vehicles[1],
  },
  {
    wide: 'tata-nexon-profile',
    mobile: 'tata-nexon-profile',
    alt: 'A teal Tata Nexon on a wooded road in the foothills',
    vehicle: vehicles[2],
  },
]

export function HomeHero() {
  const [index, setIndex] = useState(0)
  const frame = frames[index]
  return (
    <section className="drive-hero" aria-labelledby="cover-title" data-frame={index}>
      <picture className="drive-photograph" key={index}>
        <source media="(max-width: 700px)" srcSet={`/images/${frame.mobile}.webp`} />
        <img
          src={`/images/${frame.wide}.webp`}
          width={1680}
          height={700}
          alt={frame.alt}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
        />
      </picture>
      <div className="drive-scrim" />
      <div className="shell drive-scene">
        <div className="drive-copy">
          <p className="journey-kicker">
            <Mountain size={17} aria-hidden="true" /> KATHMANDU BASED <i /> NEPAL WIDE
          </p>
          <h1 id="cover-title">
            Drive Your Journey
            <br />
            <em>Across Nepal.</em>
          </h1>
          <p className="drive-lead">
            Self-drive freedom or a driver at the wheel. Premium car rentals from Kathmandu, across
            Nepal.
          </p>
          <div className="action-row hero-actions">
            <Link href="/booking" className="action action-gold">
              Book a Car <ArrowRight />
            </Link>
            <Link href="/fleet" className="action action-glass">
              Explore Our Fleet <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className="drive-caption">
          <div className="scene-controls" aria-label="Featured vehicle photographs">
            <span className="scene-page" aria-live="polite">
              0{index + 1}
              <span> / 03</span>
            </span>
            <span className="scene-progress" aria-hidden="true">
              {frames.map((_, i) => (
                <i key={i} data-active={i === index} />
              ))}
            </span>
            <button
              type="button"
              aria-label="Previous featured vehicle"
              onClick={() => setIndex((index + 2) % 3)}
            >
              <ChevronLeft size={15} />
            </button>
            <button
              type="button"
              aria-label="Next featured vehicle"
              onClick={() => setIndex((index + 1) % 3)}
            >
              <ChevronRight size={15} />
            </button>
          </div>
          <Link href={`/fleet/${frame.vehicle.slug}`} className="pictured-car">
            <span className="pictured-indicator" />
            <span>In frame</span>
            <strong>{frame.vehicle.name}</strong>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
