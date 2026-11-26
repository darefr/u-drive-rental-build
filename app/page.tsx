import { HomeHero } from '@/components/home-hero'
import { QuickPlanner } from '@/components/quick-planner'
import { FleetShowcase } from '@/components/fleet-showcase'
import { RentalOptions } from '@/components/rental-options'
import { ServiceArea } from '@/components/service-area'
import { ProcessPreview } from '@/components/process-timeline'
import { CTASection } from '@/components/editorial'
import { business, vehicles } from '@/lib/fleet'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Premium Car Rental Nepal',
  'Choose self-drive or a professional driver in Kathmandu. Explore four U Drive rental cars, exact daily rates, and vehicle delivery across Nepal.',
  '/',
)
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
      name: 'Daily vehicle rentals',
      itemListElement: vehicles.map((v) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${v.name} rental` },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: v.rate,
          priceCurrency: 'NPR',
          unitText: 'day',
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
      <QuickPlanner />
      <FleetShowcase />
      <RentalOptions />
      <ServiceArea />
      <ProcessPreview />
      <CTASection />
    </main>
  )
}
