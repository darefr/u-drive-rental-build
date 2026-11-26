import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from './brand'

const modes = [
  {
    href: '/self-drive',
    label: 'Self Drive',
    title: 'Take the wheel.',
    copy: 'Your route. Your own pace.',
    image: 'driver-view',
    alt: 'A driver at the wheel on a quiet mountain road',
  },
  {
    href: '/with-driver',
    label: 'With Driver',
    title: 'Take in the view.',
    copy: 'Your itinerary, with a professional driver.',
    image: 'nepal-road',
    alt: 'A winding Nepal road opening onto a mountain valley',
  },
]
export function RentalOptions() {
  return (
    <section className="rental-modes-section">
      <div className="shell section-space">
        <div className="section-heading-row">
          <div>
            <Eyebrow light>RENTAL MODES</Eyebrow>
            <h2 className="editorial-title">Two ways to go.</h2>
          </div>
          <p className="section-aside">
            The same open road.
            <br />A different way to experience it.
          </p>
        </div>
        <div className="mode-spreads">
          {modes.map((m) => (
            <Link href={m.href} className="mode-spread" key={m.href}>
              <Image
                fill
                src={`/images/${m.image}.webp`}
                alt={m.alt}
                sizes="(max-width: 680px) 95vw, 47vw"
              />
              <div className="mode-spread-shade" />
              <div className="mode-spread-copy">
                <p className="overline">{m.label}</p>
                <h3 className="display">{m.title}</h3>
                <p>{m.copy}</p>
              </div>
              <span className="mode-open">
                <ArrowUpRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
