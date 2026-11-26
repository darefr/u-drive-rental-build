import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, MapPin, Route } from 'lucide-react'
import { ReviewCarousel } from './review-carousel'

export function HomeStory() {
  return (
    <section className="shell section-space home-story">
      <div className="home-story-image">
        <Image
          src="/images/destinations/kathmandu.webp"
          alt="Carved temples and brick courtyards of Kathmandu Durbar Square"
          fill
          sizes="(max-width:700px) 92vw, 45vw"
        />
        <span className="story-place">
          <MapPin size={14} /> Kathmandu Valley, Nepal
        </span>
      </div>
      <div className="home-story-words">
        <p className="drive-eyebrow">Why U Drive</p>
        <h2 className="drive-section-title">
          Kathmandu roots.
          <br />
          Open-road possibilities.
        </h2>
        <p className="body-copy">
          We’re a Kathmandu-based rental service for people who want to explore Nepal their own way.
          Choose the keys or the passenger seat. We’ll work out the details with you.
        </p>
        <div className="story-points">
          <div>
            <Route />
            <span>
              <strong>A rental that fits your route</strong>Self-drive freedom or a professional
              driver.
            </span>
          </div>
          <div>
            <BadgeCheck />
            <span>
              <strong>Know your daily rate</strong>Compare every model before making a request.
            </span>
          </div>
          <div>
            <MapPin />
            <span>
              <strong>A handover that works for you</strong>Agree your pickup or request delivery
              across Nepal.
            </span>
          </div>
        </div>
        <Link href="/about" className="text-action">
          Get to know U Drive <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  )
}
export function ReviewPreview() {
  return (
    <section className="shell section-space">
      <div className="drive-section-head">
        <div>
          <p className="drive-eyebrow">Traveller journal</p>
          <h2 className="drive-section-title">Stories from the road.</h2>
        </div>
        <Link href="/reviews" className="drive-section-link">
          All Reviews <ArrowUpRight size={16} />
        </Link>
      </div>
      <ReviewCarousel />
    </section>
  )
}
