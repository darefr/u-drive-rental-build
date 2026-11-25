'use client'

import { useState } from 'react'
import { Check, Copy, Mail, MessageCircle } from 'lucide-react'
import { business, modeName, money, whatsappLink, type Vehicle } from '@/lib/fleet'
import { prettyDate, rentalDays, type RentalRequest } from '@/lib/rental-request'

export function InquiryReview({ request, vehicle }: { request: RentalRequest; vehicle: Vehicle }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'manual'>('idle')
  const [opened, setOpened] = useState(false)
  const days = rentalDays(request.pickupDate, request.returnDate) ?? 0
  const rows = [
    ['Vehicle', vehicle.name],
    ['Rental preference', modeName(request.mode)],
    ['Pickup date', prettyDate(request.pickupDate)],
    ['Return date', prettyDate(request.returnDate)],
    ['Pickup location', request.pickupLocation.trim()],
    [
      'Drop-off location',
      request.sameReturn ? request.pickupLocation.trim() : request.returnLocation.trim(),
    ],
    ['Daily rate', `${money(vehicle.rate)}/day`],
    ['Duration', `${days} ${days === 1 ? 'day' : 'days'}`],
    ['Vehicle-rate estimate', money(days * vehicle.rate)],
    ['Name', request.name.trim()],
    ['Phone', request.phone.trim()],
    ...(request.notes.trim() ? [['Trip notes', request.notes.trim()]] : []),
  ]
  const message = [
    'Hello U Drive, I would like to request a rental.',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Please confirm availability, pickup arrangements, and the final rental terms and amount.',
  ].join('\n')
  async function copy() {
    try {
      await navigator.clipboard.writeText(message)
      setCopyState('copied')
    } catch {
      setCopyState('manual')
    }
  }
  return (
    <div className="inquiry-review">
      <dl className="review-list">
        {rows.map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="send-note">
        <strong>One last step: send your message.</strong>
        <p>
          WhatsApp opens with your inquiry filled in. Tap Send there. Your car is not reserved until
          U Drive confirms your booking.
        </p>
      </div>
      <a
        className="action action-gold send-action"
        target="_blank"
        rel="noopener noreferrer"
        href={whatsappLink(message)}
        onClick={() => setOpened(true)}
      >
        <MessageCircle />
        {opened ? 'Open WhatsApp again' : 'Continue to WhatsApp'}
      </a>
      <div className="send-alternatives">
        <a
          href={`mailto:${business.email}?subject=${encodeURIComponent(`Rental inquiry: ${vehicle.name}`)}&body=${encodeURIComponent(message)}`}
        >
          <Mail size={16} />
          Send by email
        </a>
        <button type="button" onClick={copy}>
          {copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
          {copyState === 'copied' ? 'Inquiry copied' : 'Copy inquiry'}
        </button>
      </div>
      <p className="sr-only" role="status">
        {copyState === 'copied' ? 'Rental inquiry copied to your clipboard.' : ''}
      </p>
      {copyState === 'manual' && (
        <label className="manual-copy">
          Copy this message and send it to the team:
          <textarea readOnly value={message} onFocus={(e) => e.target.select()} rows={6} />
        </label>
      )}
      {opened && (
        <p className="handoff-notice" role="status">
          Finish sending in WhatsApp. If it didn’t open, use email or copy your inquiry instead.
        </p>
      )}
    </div>
  )
}
