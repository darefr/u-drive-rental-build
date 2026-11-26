import { CalendarDays, CarFront, ClipboardCheck, KeyRound, Route } from 'lucide-react'
import { Eyebrow } from './brand'
import { TextLink } from './editorial'

const steps = [
  {
    title: 'Choose your car',
    short: 'Choose a vehicle',
    icon: CarFront,
    body: 'Browse the four vehicles in our fleet. Compare their daily rental rates and open a model page for a closer look.',
    link: '/fleet',
    action: 'Explore the fleet',
  },
  {
    title: 'Find your rental mode',
    short: 'Pick a rental mode',
    icon: Route,
    body: 'Take the wheel with Self Drive, or request a professional driver to accompany your journey. Select your preference when booking.',
    link: '/self-drive',
    action: 'Explore Self Drive',
  },
  {
    title: 'Set your dates',
    short: 'Select your dates',
    icon: CalendarDays,
    body: 'Choose your pickup and return dates, then add a preferred pickup time in Nepal. Your estimate updates using the vehicle’s daily rate and the number of rental days.',
  },
  {
    title: 'Request & confirm',
    short: 'Confirm your rental',
    icon: ClipboardCheck,
    body: 'Review your estimate and send your request by WhatsApp or email. U Drive confirms the vehicle, final terms, and meeting point with you. Preparing a request does not reserve a car.',
  },
  {
    title: 'Collect your car',
    short: 'Collect or receive',
    icon: KeyRound,
    body: 'Meet at the agreed pickup point or receive your vehicle at the arranged delivery location. For a driver-assisted rental, meet your driver as agreed.',
  },
]
export function ProcessPreview() {
  return (
    <section className="process-preview">
      <div className="shell section-space">
        <div className="section-heading-row">
          <div>
            <Eyebrow>HOW IT WORKS</Eyebrow>
            <h2 className="editorial-title">From plans to keys.</h2>
          </div>
          <TextLink href="/how-it-works">See the process</TextLink>
        </div>
        <ol className="process-index">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-count">0{i + 1}</span>
              <s.icon size={22} />
              <strong>{s.short}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
export function ProcessTimeline() {
  return (
    <ol className="process-timeline">
      {steps.map((s, i) => (
        <li key={s.title}>
          <span className="timeline-number">0{i + 1}</span>
          <div>
            <p className="overline">
              {i < 3 ? 'PLAN YOUR TRIP' : i === 3 ? 'ARRANGE YOUR RENTAL' : 'ON THE ROAD'}
            </p>
            <h2>{s.title}.</h2>
            <p>{s.body}</p>
            {s.link && <TextLink href={s.link}>{s.action}</TextLink>}
          </div>
          <s.icon className="timeline-icon" size={24} />
        </li>
      ))}
    </ol>
  )
}
