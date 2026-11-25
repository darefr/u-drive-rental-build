export type RentalMode = 'self-drive' | 'with-driver'
export type Vehicle = {
  slug: string
  name: string
  rate: number
  category: 'SUV' | 'Hatchback'
  label: string
  description: string
  introduction: string
  imageAlt: string
}

export const vehicles: readonly Vehicle[] = [
  {
    slug: 'deepal-s05',
    name: 'Deepal S05',
    rate: 10000,
    category: 'SUV',
    label: 'Electric SUV',
    description: 'A refined electric SUV for the open road.',
    introduction:
      'A sculpted electric SUV for a journey beyond the everyday. Choose the Deepal S05 for your next drive from Kathmandu, with your route and rental mode confirmed by our team.',
    imageAlt: 'Silver Deepal S05 on a road overlooking green mountain ridges',
  },
  {
    slug: 'byd-atto-3',
    name: 'BYD Atto 3',
    rate: 9000,
    category: 'SUV',
    label: 'Electric SUV',
    description: 'Easygoing electric travel, in town and beyond.',
    introduction:
      'An electric SUV that feels at home on city streets and longer journeys. Plan your route in the BYD Atto 3 and ask the team about your preferred pickup and drop-off.',
    imageAlt: 'Blue BYD Atto 3 beside a hillside stone retaining wall',
  },
  {
    slug: 'tata-nexon',
    name: 'Tata Nexon',
    rate: 7500,
    category: 'SUV',
    label: 'Compact SUV',
    description: 'Compact proportions. A confident SUV stance.',
    introduction:
      'The Nexon brings a compact SUV shape to your Kathmandu plans. Share your itinerary and our team will confirm the vehicle, rental arrangement, and final terms.',
    imageAlt: 'Deep teal Tata Nexon parked on a tree-lined roadside',
  },
  {
    slug: 'byd-atto-1',
    name: 'BYD Atto 1',
    rate: 6500,
    category: 'Hatchback',
    label: 'Electric hatchback',
    description: 'A compact electric companion for city days.',
    introduction:
      'A city-sized electric hatchback and the lowest daily rate in our fleet. Choose the BYD Atto 1 for a compact way to explore, with a rental arranged around your plans.',
    imageAlt: 'Ivory BYD Atto 1 hatchback outside a modern concrete building',
  },
]

export const business = {
  name: 'U Drive Rental Car Kathmandu',
  phone: '+9779800899505',
  phoneDisplay: '+977 980-0899505',
  whatsapp: '9779800899505',
  email: 'udriverentalservice@gmail.com',
  facebook: 'https://www.facebook.com/people/U-Drive/61584871988112/',
} as const

export function findVehicle(slug: string | undefined) {
  return vehicles.find((vehicle) => vehicle.slug === slug)
}

export function money(amount: number) {
  return `NPR ${new Intl.NumberFormat('en-NP').format(amount)}`
}

export function modeName(mode: RentalMode) {
  return mode === 'self-drive' ? 'Self drive' : 'With driver'
}

export function bookingLink(slug?: string, mode?: RentalMode) {
  const query = new URLSearchParams()
  if (slug) query.set('vehicle', slug)
  if (mode) query.set('mode', mode)
  return `/book${query.size ? `?${query}` : ''}`
}

export function whatsappLink(
  message = 'Hello U Drive! I would like to ask about a car rental in Nepal.',
) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
}
