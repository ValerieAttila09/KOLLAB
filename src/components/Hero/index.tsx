import { ArrowRight } from 'lucide-react'
import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import heroPlaceholder from '../../assets/images/kollab-hero-placeholder.svg'

interface HeroProps {
  headline: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
  headlineRef?: RefObject<HTMLHeadingElement | null>
  bodyRef?: RefObject<HTMLParagraphElement | null>
  ctaRef?: RefObject<HTMLDivElement | null>
  visualRef?: RefObject<HTMLDivElement | null>
}

const Hero = ({
  subheadline,
  primaryCta,
  secondaryCta,
  headlineRef,
  bodyRef,
  ctaRef,
  visualRef,
}: HeroProps) => {
  return (
    <section className="mx-auto h-screen grid max-w-360 gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-24">
      <div className="flex flex-col justify-center">
        <div className="mb-6 inline-flex max-w-max items-center rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
          Human Collaboration Ecosystem
        </div>

        <h1
          ref={headlineRef}
          className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-brand-navy sm:text-5xl lg:text-7xl"
        >
          <span className="block">Grow Through</span>
          <span className="block bg-gradient-to-r from-brand-green via-brand-teal to-brand-blue bg-clip-text text-transparent">
            Collaboration.
          </span>
        </h1>

        <p ref={bodyRef} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {subheadline}
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/ecosystem"
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-green/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-green/90"
          >
            {primaryCta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-brand-navy transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
          >
            {secondaryCta}
          </Link>
        </div>

        <p className="mt-6 text-sm font-medium text-slate-500">
          Small circles. Big momentum. Space to learn, connect, and create with intention.
        </p>
      </div>

      <div ref={visualRef} className="relative flex items-center justify-center">
        <img src="/public/images/hero_image.jpeg" alt="" className="w-full h-auto" />
      </div>
    </section>
  )
}

export default Hero
