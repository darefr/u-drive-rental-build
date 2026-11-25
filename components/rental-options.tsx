import Link from 'next/link'
import { ArrowUpRight, MapPinned, UserRoundCheck } from 'lucide-react'
import { WheelIcon } from '@/components/brand'
import { bookingLink } from '@/lib/fleet'

export function RentalOptions() {
  const options = [
    {
      title: 'Self Drive',
      text: 'Take the wheel. Set your pace.',
      icon: WheelIcon,
      href: bookingLink(undefined, 'self-drive'),
    },
    {
      title: 'With Driver',
      text: 'Sit back with a professional driver.',
      icon: UserRoundCheck,
      href: bookingLink(undefined, 'with-driver'),
    },
    {
      title: 'All-Nepal Service',
      text: 'Kathmandu and everywhere beyond.',
      icon: MapPinned,
      href: '/#service-area',
    },
  ]
  return (
    <section id="rental-options" className="rental-band" aria-label="Rental options and coverage">
      <div className="shell rental-band-inner">
        {options.map(({ icon: Icon, ...option }) => (
          <Link href={option.href} key={option.title} className="rental-shortcut">
            <span className="shortcut-icon">
              <Icon />
            </span>
            <span className="shortcut-copy">
              <strong>{option.title}</strong>
              <span>{option.text}</span>
            </span>
            <ArrowUpRight className="shortcut-arrow" size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  )
}
