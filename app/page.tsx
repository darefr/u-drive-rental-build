import { HomeHero } from '@/components/home-hero'
import { RentalOptions } from '@/components/rental-options'
import { FleetShowcase } from '@/components/fleet-showcase'
import { ServiceArea, RentalGuide } from '@/components/service-area'
import { business, vehicles } from '@/lib/fleet'

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: business.name,
    telephone: business.phone,
    email: business.email,
    logo: '/brand/u-drive-primary.png',
    address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' },
    areaServed: { '@type': 'Country', name: 'Nepal' },
    sameAs: [business.facebook],
    currenciesAccepted: 'NPR',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Daily car rentals',
      itemListElement: vehicles.map((v) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${v.name} rental` },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: v.rate,
          priceCurrency: 'NPR',
          referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' },
        },
      })),
    },
  }
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
      <HomeHero />
      <RentalOptions />
      <FleetShowcase />
      <ServiceArea />
      <RentalGuide />
    </main>
  )
}
