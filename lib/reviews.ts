export type TravellerReview = {
  id: string
  name: string
  avatar?: string
  rating: number
  text: string
  context: string
  image: string
  imageAlt: string
  sample: boolean
}

export const reviews: TravellerReview[] = [
  {
    id: 'self-drive-example',
    name: 'Sample traveller',
    rating: 5,
    text: 'A car for the city days, and the freedom to stop when the mountain views opened up. That was the kind of trip we wanted.',
    context: 'Self Drive · Kathmandu Valley',
    image: '/images/destinations/kathmandu.webp',
    imageAlt: 'Temple rooftops in the Kathmandu Valley',
    sample: true,
  },
  {
    id: 'driver-example',
    name: 'Sample traveller',
    rating: 5,
    text: 'With a driver at the wheel, our lakeside journey was about the scenery and the people we travelled with.',
    context: 'With Driver · Pokhara itinerary',
    image: '/images/destinations/pokhara.webp',
    imageAlt: 'The lakeside landscape of Pokhara',
    sample: true,
  },
  {
    id: 'city-example',
    name: 'Sample traveller',
    rating: 4,
    text: 'Comparing the daily rates helped shape our budget. We could choose a smaller car and leave room for another day in the valley.',
    context: 'Self Drive · City itinerary',
    image: '/images/destinations/bandipur.webp',
    imageAlt: 'Historic hill-town architecture in Nepal',
    sample: true,
  },
]
