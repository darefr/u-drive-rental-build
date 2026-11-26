import Image from 'next/image'
import Link from 'next/link'

export function Brand({ reversed = false }: { reversed?: boolean }) {
  return (
    <Link href="/" className="brand-lockup" aria-label="U Drive Rental Car Kathmandu home">
      <Image
        src={reversed ? '/brand/u-drive-reversed.svg' : '/brand/u-drive-user-logo.png'}
        width={1800}
        height={850}
        className="brand-lockup-image"
        alt=""
        unoptimized
      />
    </Link>
  )
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}>
      <span className="lane-mark" aria-hidden="true" />
      {children}
    </p>
  )
}

export function WheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="m3.4 8.2 6.9 2.3m3.4 0 6.9-2.3M10.6 14l.3 7.4m2.5-7.4-.3 7.4M3 10.1l5.6 3m12.4-3-5.6 3" />
    </svg>
  )
}
