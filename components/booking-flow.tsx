'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react'
import { Eyebrow } from '@/components/brand'
import { TripFields, ContactFields } from '@/components/booking-fields'
import { InquiryReview } from '@/components/inquiry-review'
import { RentalEstimate } from '@/components/rental-estimate'
import { business, findVehicle, money, vehicles, type RentalMode } from '@/lib/fleet'
import {
  rentalDays,
  todayInNepal,
  validateTrip,
  validateContact,
  type RentalRequest,
  type RequestErrors,
} from '@/lib/rental-request'

const titles = ['Your trip details', 'A few details about you', 'Review your inquiry']
export function BookingFlow({
  initialVehicle,
  initialMode,
  today,
}: {
  initialVehicle: string
  initialMode: RentalMode
  today: string
}) {
  const [request, setRequest] = useState<RentalRequest>({
    vehicle: initialVehicle,
    mode: initialMode,
    pickupDate: '',
    returnDate: '',
    pickupLocation: '',
    sameReturn: true,
    returnLocation: '',
    name: '',
    phone: '',
    notes: '',
  })
  const [step, setStep] = useState(0)
  const [ready, setReady] = useState(false)
  const [errors, setErrors] = useState<RequestErrors>({})
  const heading = useRef<HTMLHeadingElement>(null)
  const prevStep = useRef(0)
  const vehicle = findVehicle(request.vehicle) ?? vehicles[0]
  const days = rentalDays(request.pickupDate, request.returnDate)
  useEffect(() => setReady(true), [])
  useEffect(() => {
    if (prevStep.current !== step) {
      heading.current?.focus({ preventScroll: true })
      heading.current?.scrollIntoView({ behavior: 'instant', block: 'start' })
      prevStep.current = step
    }
  }, [step])
  function update(patch: Partial<RentalRequest>) {
    setRequest((r) => ({ ...r, ...patch }))
    setErrors((old) => {
      const next = { ...old }
      for (const key of Object.keys(patch) as (keyof RentalRequest)[]) delete next[key]
      return next
    })
  }
  function next(event: React.FormEvent) {
    event.preventDefault()
    const problem = step === 0 ? validateTrip(request, todayInNepal()) : validateContact(request)
    setErrors(problem)
    const first = Object.keys(problem)[0]
    if (first) {
      requestAnimationFrame(() => document.getElementById(first)?.focus())
      return
    }
    setStep((value) => Math.min(2, value + 1))
  }
  return (
    <main id="main-content" className="booking-page shell" data-ready={ready}>
      <Link href="/#fleet" className="back-link">
        <ArrowLeft size={15} />
        Back to the fleet
      </Link>
      <div className="booking-heading">
        <div>
          <Eyebrow>RENTAL INQUIRY</Eyebrow>
          <h1 className="display section-title">
            PLAN YOUR DRIVE<span className="brand-period">.</span>
          </h1>
          <p>Choose your car and dates. We’ll confirm the details with you.</p>
        </div>
        <a className="booking-help" href={`tel:${business.phone}`}>
          <Phone size={17} />
          <span>
            Prefer to call?<strong>{business.phoneDisplay}</strong>
          </span>
        </a>
      </div>
      <div className="booking-layout">
        <div className="booking-form-panel">
          <ol className="booking-steps" aria-label="Booking progress">
            {['Trip details', 'Your details', 'Review'].map((name, i) => (
              <li
                key={name}
                data-current={i === step}
                data-complete={i < step}
                aria-current={i === step ? 'step' : undefined}
              >
                <span>{i < step ? <Check size={11} /> : i + 1}</span>
                {name}
              </li>
            ))}
          </ol>
          <h2 className="form-heading" tabIndex={-1} ref={heading}>
            {titles[step]}
          </h2>
          {step < 2 ? (
            <form noValidate onSubmit={next}>
              {step === 0 ? (
                <TripFields request={request} errors={errors} update={update} today={today} />
              ) : (
                <ContactFields request={request} errors={errors} update={update} />
              )}
              {days !== null && (
                <div className="mobile-estimate" aria-live="polite">
                  <span>
                    {days} {days === 1 ? 'day' : 'days'} × {money(vehicle.rate)}/day
                  </span>
                  <strong>{money(days * vehicle.rate)}</strong>
                  <small>Vehicle-rate estimate. Final rental terms are confirmed by U Drive.</small>
                </div>
              )}
              <div className="form-actions">
                {step > 0 && (
                  <button
                    type="button"
                    className="back-link"
                    onClick={() => {
                      setErrors({})
                      setStep(0)
                    }}
                  >
                    <ArrowLeft size={15} />
                    Back
                  </button>
                )}
                <button className="action action-gold" type="submit">
                  {step === 0 ? 'Continue to your details' : 'Review inquiry'}
                  <ArrowRight />
                </button>
              </div>
            </form>
          ) : (
            <>
              <InquiryReview request={request} vehicle={vehicle} />
              <button className="back-link edit-inquiry" type="button" onClick={() => setStep(0)}>
                <ArrowLeft size={15} />
                Edit trip details
              </button>
              <button className="back-link edit-contact" type="button" onClick={() => setStep(1)}>
                Edit contact details
              </button>
            </>
          )}
        </div>
        <RentalEstimate request={request} vehicle={vehicle} />
      </div>
    </main>
  )
}
