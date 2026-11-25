import './detail.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Check, ChevronRight } from 'lucide-react'
import { Eyebrow } from '@/components/brand'
import { VehicleBookingPanel } from '@/components/vehicle-booking-panel'
import { findVehicle, money, vehicles } from '@/lib/fleet'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export function generateStaticParams() {
  return vehicles.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = findVehicle((await params).slug)
  if (!vehicle) return { title: 'Vehicle not found' }
  const title = `${vehicle.name} rental in Kathmandu — ${money(vehicle.rate)}/day`
  return {
    title,
    description: `${vehicle.description} Explore ${vehicle.name} rental at ${money(vehicle.rate)}/day. Request self drive or a professional driver for a journey across Nepal.`,
    openGraph: { title, images: [{ url: `/images/${vehicle.slug}.webp`, alt: vehicle.imageAlt }] },
  }
}

export default async function VehiclePage({ params }: Props) {
  const vehicle = findVehicle((await params).slug)
  if (!vehicle) notFound()
  return (
    <main id="main-content" className="detail-page shell">
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/">Home</Link>
        <ChevronRight />
        <Link href="/#fleet">Our fleet</Link>
        <ChevronRight />
        <span aria-current="page">{vehicle.name}</span>
      </nav>
      <div className="detail-layout">
        <figure>
          <div className="detail-image">
            <Image
              src={`/images/${vehicle.slug}.webp`}
              alt={vehicle.imageAlt}
              fill
              sizes="(max-width: 780px) 100vw, 52vw"
              preload
            />
            <span className="vehicle-category">
              <i />
              {vehicle.label}
            </span>
          </div>
          <figcaption>Illustrative vehicle image. Colour and trim may vary.</figcaption>
        </figure>
        <div className="detail-content">
          <Eyebrow>THE U DRIVE FLEET</Eyebrow>
          <h1 className="display detail-title">
            {vehicle.name.toUpperCase()}
            <span className="brand-period">.</span>
          </h1>
          <p className="detail-rate">
            {money(vehicle.rate)}
            <span>/day</span>
          </p>
          <p className="detail-intro">{vehicle.introduction}</p>
          <VehicleBookingPanel vehicle={vehicle} />
        </div>
      </div>
      <section className="detail-facts" aria-label="Rental information">
        <div>
          <Check />
          <h2>Daily vehicle rate</h2>
          <p>See a date-based estimate before sending your inquiry.</p>
        </div>
        <div>
          <Check />
          <h2>Kathmandu & all Nepal</h2>
          <p>Share your route and preferred pickup and drop-off locations.</p>
        </div>
        <div>
          <Check />
          <h2>Personally confirmed</h2>
          <p>We confirm the exact car, final price, and terms with you.</p>
        </div>
      </section>
      <section className="other-vehicles">
        <div className="other-heading">
          <h2 className="display">ALSO IN THE FLEET</h2>
          <Link className="back-link" href="/#fleet">
            <ArrowLeft size={15} />
            All vehicles
          </Link>
        </div>
        <div className="other-grid">
          {vehicles
            .filter((v) => v.slug !== vehicle.slug)
            .map((v) => (
              <Link key={v.slug} href={`/cars/${v.slug}`} className="other-car">
                <Image src={`/images/${v.slug}-card.webp`} alt="" width={96} height={60} />
                <span>
                  <strong>{v.name}</strong>
                  <small>{money(v.rate)}/day</small>
                </span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
        </div>
      </section>
    </main>
  )
}
