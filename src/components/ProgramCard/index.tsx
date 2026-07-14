import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'

interface ProgramCardProps {
  title: string
  summary: string
  cta: string
  bullets: string[]
  accent: string
}

const ProgramCard = ({ title, summary, cta, bullets, accent }: ProgramCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      scale: 1.01,
      boxShadow: '0 24px 60px rgba(15, 23, 42, 0.12)',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 15px 40px rgba(15, 23, 42, 0.08)',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      tabIndex={0}
      className={`rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_15px_40px_rgba(15,23,42,0.08)] ${accent}`}
    >
      <div className="inline-flex rounded-full bg-brand-grey px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-navy/70">
        Program spotlight
      </div>
      <h3 className="mt-6 text-2xl font-bold text-brand-navy">{title}</h3>
      <p className="mt-3 text-base leading-8 text-slate-600">{summary}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-600">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-green" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <button className="mt-8 inline-flex items-center font-semibold text-brand-navy transition hover:text-brand-green">
        {cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  )
}

export default ProgramCard
