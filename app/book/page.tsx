import './booking.css'
import type { Metadata } from 'next'
import { BookingFlow } from '@/components/booking-flow'
import { findVehicle, vehicles } from '@/lib/fleet'
import { todayInNepal } from '@/lib/rental-request'

export const metadata: Metadata = {
  title: 'Plan your car rental',
  description:
    'Choose a rental car, dates, and self drive or with driver. Review your estimate and send a rental inquiry directly to U Drive Kathmandu.',
  robots: { index: false, follow: true },
}
export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const query = await searchParams
  const selected =
    findVehicle(typeof query.vehicle === 'string' ? query.vehicle : undefined) ?? vehicles[0]
  const mode = query.mode === 'with-driver' ? 'with-driver' : 'self-drive'
  return (
    <BookingFlow
      key={`${selected.slug}-${mode}`}
      initialVehicle={selected.slug}
      initialMode={mode}
      today={todayInNepal()}
    />
  )
}
