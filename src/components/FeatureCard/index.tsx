import { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { gsap } from 'gsap'

interface FeatureCardProps {
  title: string
  desc: string
  microcopy: string
  icon: LucideIcon
  accent: string
}

const FeatureCard = ({ title, desc, microcopy, icon: Icon, accent }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      scale: 1.02,
      boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
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
      className="rounded-[1.5rem] border border-slate-200/80 bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300"
    >
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-brand-navy">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
      <p className="mt-4 text-sm font-semibold text-brand-navy/80">{microcopy}</p>
    </div>
  )
}

export default FeatureCard
