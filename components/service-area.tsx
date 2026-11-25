import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, MapPin, Plus } from 'lucide-react'
import { Eyebrow } from '@/components/brand'

export function ServiceArea() {
  return (
    <section id="service-area" className="service-section" aria-labelledby="service-heading">
      <div className="shell service-layout">
        <div className="service-photo">
          <Image
            src="/images/nepal-road.webp"
            alt="A winding mountain road through Nepal’s forested hills"
            fill
            sizes="(max-width: 800px) 100vw, 53vw"
          />
          <span>
            <MapPin size={15} aria-hidden="true" /> THE ROADS OF NEPAL
          </span>
        </div>
        <div className="service-copy">
          <Eyebrow>OUR SERVICE AREA</Eyebrow>
          <h2 id="service-heading" className="display section-title">
            KATHMANDU BASED.
            <br />
            NEPAL WIDE<span className="brand-period">.</span>
          </h2>
          <p>
            Start in the city. Take the road beyond it. We arrange self-drive and with-driver
            rentals from Kathmandu for journeys across Nepal.
          </p>
          <ul className="verified-list">
            <li>
              <Check />
              Pickup and drop-off by arrangement
            </li>
            <li>
              <Check />
              Daily, weekly, and monthly rental inquiries
            </li>
            <li>
              <Check />A local team to confirm your trip details
            </li>
          </ul>
          <Link href="/book" className="text-action">
            Plan your journey <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}

const questions = [
  [
    'Can I choose self drive or a professional driver?',
    'Yes. U Drive offers both rental modes. Choose your preference when you inquire, and we will confirm the arrangement for your vehicle, dates, and route.',
  ],
  [
    'How is my rental estimate calculated?',
    'We multiply the daily vehicle rate by the days between your pickup and return dates, counting a same-day trip as one day. For example, three days in the Deepal S05 is estimated at NPR 30,000. The team confirms timing, driver or delivery arrangements, and the final amount before you book.',
  ],
  [
    'Can the car be delivered to my location?',
    'Pickup and drop-off can be arranged. Add your preferred locations to your inquiry so the team can confirm the handover details and any applicable cost.',
  ],
  [
    'When is my booking confirmed?',
    'After you send your inquiry, U Drive checks the vehicle and dates with you directly. Your booking is confirmed only when you and the team agree on availability, price, and rental terms.',
  ],
]

export function RentalGuide() {
  return (
    <section className="guide-section" id="rental-guide" aria-labelledby="guide-heading">
      <div className="shell guide-layout">
        <div className="guide-intro">
          <Eyebrow>WHY U DRIVE</Eyebrow>
          <h2 id="guide-heading" className="display section-title">
            CLEAR RATES.
            <br />
            FLEXIBLE RENTALS<span className="brand-period">.</span>
          </h2>
          <p>
            Choose your car, see your daily rate, and talk directly to the people arranging your
            drive.
          </p>
        </div>
        <div className="questions">
          {questions.map(([q, a]) => (
            <details key={q} name="rental-guide">
              <summary>
                {q}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
