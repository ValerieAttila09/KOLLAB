import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { RefObject } from 'react'
import { Link } from 'react-router-dom'

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
    <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-360 gap-10 px-4 py-20 sm:px-6 sm:py-24 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:py-28 lg:gap-16">
      <div className="flex flex-col justify-center sm:justify-start text-center sm:text-left py-8 md:py-4">
        <div className="mb-6 flex mx-auto sm:mx-0 max-w-max sm:items-center justify-center rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green sm:justify-start">
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

        <p ref={bodyRef} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:mx-0 sm:text-lg">
          {subheadline}
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start">
          {/* <Link
            to="/ecosystem"
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-green/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-green/90"
          >
            {primaryCta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link> */}
          <Link
            to="/programs#growth-circle"
            className="flex items-center space-x-2 px-5 py-2.5 bg-linear-to-r from-brand-green to-brand-blue text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-brand-green hover:shadow-[0_4px_20px_rgba(52,178,106,0.3)] hover:-translate-y-0.5 group"
          >
            {primaryCta}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 font-semibold text-brand-navy transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal"
          >
            {secondaryCta}
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-sm font-medium text-slate-500 sm:mx-0">
          Small circles. Big momentum. Space to learn, connect, and create with intention.
        </p>
      </div>

      <div ref={visualRef} className="relative flex items-center justify-center">
        <img src="/images/hero_image.jpeg" alt="" className="w-full max-w-[540px] rounded-[2rem] object-cover shadow-[0_24px_80px_rgba(15,23,42,0.12)]" />
      </div>
    </section>
  )
}

export default Hero
