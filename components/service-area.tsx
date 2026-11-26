import Image from 'next/image'
import { MapPin, Route, KeyRound } from 'lucide-react'
import { Eyebrow } from './brand'
import { TextLink } from './editorial'

export function ServiceArea() {
  return (
    <section className="shell section-space regional-feature">
      <div className="regional-photo">
        <Image
          src="/images/kathmandu.webp"
          alt="Warm brick rooftops and pagodas across the Kathmandu valley"
          fill
          sizes="(max-width: 720px) 95vw, 48vw"
        />
        <span className="image-location">
          <MapPin size={14} /> KATHMANDU, NEPAL
        </span>
      </div>
      <div className="regional-copy">
        <Eyebrow>WHY U DRIVE</Eyebrow>
        <h2 className="editorial-title">
          Kathmandu roots.
          <br />
          Nepal-wide reach.
        </h2>
        <p>
          Start in the city or request a car where your journey begins. U Drive brings self-drive
          and driver-assisted rentals together with delivery across Nepal.
        </p>
        <ul className="fact-list">
          <li>
            <KeyRound /> Choose who takes the wheel
          </li>
          <li>
            <MapPin /> Kathmandu-based rental access
          </li>
          <li>
            <Route /> Delivery arranged around your itinerary
          </li>
        </ul>
        <TextLink href="/service-area">Explore service area</TextLink>
      </div>
    </section>
  )
}
