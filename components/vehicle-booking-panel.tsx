'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { ModePicker } from '@/components/mode-picker'
import { bookingLink, whatsappLink, modeName, type RentalMode, type Vehicle } from '@/lib/fleet'

export function VehicleBookingPanel({ vehicle }: { vehicle: Vehicle }) {
  const [mode, setMode] = useState<RentalMode>('self-drive')
  return (
    <div className="detail-booking-panel">
      <ModePicker value={mode} onChange={setMode} />
      <p className="panel-note">Your preferred rental mode and dates are confirmed by our team.</p>
      <div className="detail-actions">
        <Link className="action action-gold" href={bookingLink(vehicle.slug, mode)}>
          Request this car <ArrowRight />
        </Link>
        <a
          className="action action-outline"
          href={whatsappLink(
            `Hello U Drive! I’m interested in the ${vehicle.name} (${modeName(mode)}). Could you help me plan my rental?`,
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle />
          Ask a question
        </a>
      </div>
    </div>
  )
}
