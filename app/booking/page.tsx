import { BookingFlow } from '@/components/booking-flow'
import { findVehicle, vehicles } from '@/lib/fleet'
import { todayInNepal } from '@/lib/rental-request'
import { pageMeta } from '@/lib/site'

export const metadata = pageMeta(
  'Book a Car — Plan Your Rental',
  'Choose your car, rental mode, pickup and return dates. Review a live NPR estimate before sending your rental request directly to U Drive.',
  '/booking',
)
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const q = await searchParams
  const car = findVehicle(typeof q.vehicle === 'string' ? q.vehicle : undefined) ?? vehicles[0]
  const mode = q.mode === 'with-driver' ? 'with-driver' : 'self-drive'
  return (
    <main id="main-content">
      <BookingFlow
        key={`${car.slug}-${mode}`}
        initialVehicle={car.slug}
        initialMode={mode}
        today={todayInNepal()}
      />
    </main>
  )
}
