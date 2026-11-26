import { BookingFlow } from './booking-flow'
import { todayInNepal } from '@/lib/rental-request'
import type { Vehicle } from '@/lib/fleet'

export function VehicleBookingPanel({ vehicle }: { vehicle: Vehicle }) {
  return (
    <BookingFlow
      initialVehicle={vehicle.slug}
      initialMode="self-drive"
      today={todayInNepal()}
      embedded
    />
  )
}
