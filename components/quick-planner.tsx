import Form from 'next/form'
import { ArrowRight, CalendarDays, CarFront, ChevronDown } from 'lucide-react'
import { WheelIcon } from './brand'
import { vehicles } from '@/lib/fleet'

export function QuickPlanner() {
  return (
    <section className="planner-band" aria-labelledby="planner-title">
      <div className="shell planner-inner">
        <div className="planner-heading">
          <span className="planner-emblem">
            <CalendarDays size={23} />
          </span>
          <div>
            <p className="overline">START HERE</p>
            <h2 id="planner-title">Plan your drive</h2>
          </div>
        </div>
        <Form className="quick-form" action="/booking">
          <label>
            <CarFront size={19} />
            <span>
              <span className="quick-label">Vehicle</span>
              <select name="vehicle" aria-label="Vehicle for your rental" defaultValue="">
                <option value="">Choose a car</option>
                {vehicles.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.name}
                  </option>
                ))}
              </select>
            </span>
            <ChevronDown className="select-chevron" size={15} />
          </label>
          <label>
            <WheelIcon />
            <span>
              <span className="quick-label">Rental mode</span>
              <select name="mode" aria-label="Rental mode for your trip" defaultValue="self-drive">
                <option value="self-drive">Self Drive</option>
                <option value="with-driver">With Driver</option>
              </select>
            </span>
            <ChevronDown className="select-chevron" size={15} />
          </label>
          <button className="action action-dark" type="submit">
            Choose dates <ArrowRight />
          </button>
        </Form>
      </div>
    </section>
  )
}
