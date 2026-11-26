'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Quote, Star, UserRound } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { reviews, type TravellerReview } from '@/lib/reviews'

export function ReviewCard({ review: r }: { review: TravellerReview }) {
  return (
    <article
      className="traveller-review"
      aria-label={`${r.sample ? 'Sample review' : 'Customer review'}, ${r.context}`}
    >
      <div className="review-photo">
        <Image src={r.image} alt={r.imageAlt} fill sizes="(max-width:700px) 100vw, 41vw" />
        <span>THE TRAVEL JOURNAL</span>
      </div>
      <div className="review-words">
        <div className="review-topline">
          <span
            className="review-stars"
            aria-label={`${r.rating} of 5 stars${r.sample ? ', sample rating' : ''}`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} fill={star <= r.rating ? 'currentColor' : 'none'} />
            ))}
          </span>
          {r.sample && <span className="sample-label">Illustrative review</span>}
        </div>
        <Quote className="review-quote-mark" size={24} aria-hidden="true" />
        <blockquote>{r.text}</blockquote>
        <div className="review-attribution">
          <Avatar size="lg">
            {r.avatar && <AvatarImage src={r.avatar} alt="" />}
            <AvatarFallback>
              {r.sample ? <UserRound size={18} /> : r.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <strong>{r.name}</strong>
            <span>{r.context}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
export function ReviewCarousel() {
  const [index, setIndex] = useState(0)
  const origin = useRef<{ x: number; y: number } | null>(null)
  const shift = (direction: number) =>
    setIndex((i) => (i + direction + reviews.length) % reviews.length)
  return (
    <div
      className="review-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Traveller stories"
      onTouchStart={(e) => {
        origin.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }}
      onTouchEnd={(e) => {
        const p = origin.current
        origin.current = null
        if (!p) return
        const dx = e.changedTouches[0].clientX - p.x
        const dy = e.changedTouches[0].clientY - p.y
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) shift(dx < 0 ? 1 : -1)
      }}
    >
      <div key={reviews[index].id} className="review-active" aria-live="polite">
        <ReviewCard review={reviews[index]} />
      </div>
      <div className="review-carousel-foot">
        <div className="review-pages">
          {reviews.map((r, i) => (
            <button
              type="button"
              key={r.id}
              aria-label={`Show story ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <p>
          {reviews[index].sample ? 'Sample content · Not a customer testimonial' : 'Customer story'}
        </p>
        <div className="review-browse">
          <button type="button" aria-label="Previous review" onClick={() => shift(-1)}>
            <ArrowLeft size={16} />
          </button>
          <button type="button" aria-label="Next review" onClick={() => shift(1)}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
