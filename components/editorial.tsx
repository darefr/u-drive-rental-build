import Link from 'next/link'
import { ArrowRight, ArrowUpRight, ChevronRight, Plus } from 'lucide-react'
import { Eyebrow } from './brand'
import type { ReactNode } from 'react'

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((i) => (
        <span key={i.label}>
          <ChevronRight size={13} />
          {i.href ? (
            <Link href={i.href}>{i.label}</Link>
          ) : (
            <span aria-current="page">{i.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="text-action" href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  )
}
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="page-intro">
      <Eyebrow>{label}</Eyebrow>
      <h1 className="display page-title">{title}</h1>
      {children && <p className="intro-description">{children}</p>}
    </div>
  )
}
export function CTASection({
  title = 'Ready to drive?',
  href = '/booking',
  label = 'Book Your Car',
}: {
  title?: string
  href?: string
  label?: string
}) {
  return (
    <section className="closing-cta photo-cta">
      <div className="shell closing-inner">
        <div>
          <p className="overline">YOUR NEXT JOURNEY</p>
          <h2 className="display">{title}</h2>
        </div>
        <Link href={href} className="action action-gold">
          {label} <ArrowRight />
        </Link>
      </div>
    </section>
  )
}
export type Question = { q: string; a: string }
export function FAQAccordion({ questions }: { questions: Question[] }) {
  return (
    <div className="questions">
      {questions.map(({ q, a }) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={19} aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}
