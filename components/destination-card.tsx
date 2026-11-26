import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { destinations, type Destination } from '@/lib/destinations'

export function DestinationCard({
  destination: d,
  compact = false,
}: {
  destination: Destination
  compact?: boolean
}) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={`destination-card${compact ? ' destination-compact' : ''}`}
      aria-label={`Explore ${d.name} destination guide`}
    >
      <Image
        src={`/images/destinations/${d.slug}.webp`}
        alt={d.alt}
        fill
        sizes="(max-width:680px) 90vw,(max-width:1000px) 48vw, 32vw"
      />
      <span className="destination-veil" />
      <span className="destination-kind">
        <MapPin size={12} />
        {d.kind}
      </span>
      <div className="destination-copy">
        <p>{d.caption}</p>
        <h3>{d.name}</h3>
        {!compact && <p className="destination-description">{d.description}</p>}
        <span className="destination-explore">
          Explore destination <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  )
}
export function DestinationPreview() {
  return (
    <section className="destination-preview">
      <div className="shell section-space">
        <div className="drive-section-head">
          <div>
            <p className="drive-eyebrow">Beyond Kathmandu</p>
            <h2 className="drive-section-title">Where will you go?</h2>
          </div>
          <Link href="/destinations" className="drive-section-link">
            All Destinations <ArrowUpRight size={16} />
          </Link>
        </div>
        <p className="drive-subtitle">
          Valley towns, lakeside stays, and roads into the hills. Start with a place that speaks to
          you.
        </p>
        <div className="destination-preview-grid">
          {destinations
            .filter((d) => ['kathmandu', 'pokhara', 'chitwan', 'nagarkot'].includes(d.slug))
            .map((d) => (
              <DestinationCard key={d.slug} destination={d} compact />
            ))}
        </div>
      </div>
    </section>
  )
}
