import { useEffect, useRef } from 'react'
import { ArrowRight, BookOpen, Compass, Handshake, HeartHandshake, Sparkles, TrendingUp, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import ProgramCard from '../components/ProgramCard'
import AudienceChips from '../components/AudienceChips'
import ValuesGrid from '../components/ValuesGrid'
import LeadForm from '../components/LeadForm'
import homeContent from '../data/home.json'
import { animateHero, registerGsap, revealOnScroll } from '../animations/gsap'

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Handshake,
  Users,
  TrendingUp,
  HeartHandshake,
}

const Home = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsap()

    document.title = 'KOLLAB — Grow Through Collaboration'
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', 'KOLLAB adalah Human Collaboration Ecosystem untuk learner, creator, profesional, dan business builder yang ingin belajar, bertemu, berkolaborasi, dan bertumbuh bersama.')
    }

    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'KOLLAB',
      url: 'https://kollab.id',
      description: 'Human Collaboration Ecosystem untuk learner, creator, profesional, dan business builder.',
      sameAs: ['https://www.instagram.com', 'https://www.linkedin.com'],
    })
    document.head.appendChild(schema)

    const ctx = gsap.context(() => {
      animateHero({
        headline: headlineRef.current,
        body: bodyRef.current,
        ctas: ctaRef.current,
        visual: visualRef.current,
      })
      revealOnScroll([
        document.querySelector('.reveal-about'),
        document.querySelector('.reveal-why'),
        document.querySelector('.reveal-what'),
        document.querySelector('.reveal-programs'),
        document.querySelector('.reveal-audience'),
        document.querySelector('.reveal-values'),
        document.querySelector('.reveal-lead'),
        document.querySelector('.reveal-partner'),
      ], document.querySelector('main'))
    })

    return () => {
      ctx.revert()
      schema.remove()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const values = (homeContent.values ?? []).map((item: { title: string; description: string; icon: string }) => ({
    ...item,
    icon: iconMap[item.icon] ?? Sparkles,
  }))

  return (
    <div className="overflow-hidden bg-white">
      <Hero
        headline={homeContent.hero.headline}
        subheadline={homeContent.hero.subheadline}
        primaryCta={homeContent.hero.primaryCta}
        secondaryCta={homeContent.hero.secondaryCta}
        headlineRef={headlineRef}
        bodyRef={bodyRef}
        ctaRef={ctaRef}
        visualRef={visualRef}
      />

      <section className="mx-auto max-w-360 px-6 py-10 sm:px-8 lg:px-12">
        <div className="reveal-about rounded-[2rem] border border-slate-200 bg-brand-grey p-8 shadow-sm sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">About KOLLAB</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
            {homeContent.about.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{homeContent.about.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12">
        <div className="reveal-why grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Why KOLLAB exists</p>
            <h2 className="mt-4 text-3xl font-black text-brand-navy">Masalah yang sering menghambat pertumbuhan.</h2>
            <ul className="mt-6 space-y-4 text-base text-slate-600">
              {homeContent.problems.map((problem: string) => (
                <li key={problem} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-brand-green" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-navy to-slate-900 p-8 text-white shadow-[0_25px_80px_rgba(15,23,42,0.16)] sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Compass className="h-6 w-6 text-brand-green" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">KOLLAB hadir sebagai jawaban.</h3>
            <p className="mt-4 text-base leading-8 text-slate-300">{homeContent.solution}</p>
            <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold">
              Connect. Collaborate. Grow.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12">
        <div className="reveal-what mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">What we do</p>
          <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">Ruang yang membuat koneksi, kerja sama, dan perkembangan terasa nyata.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {homeContent.features.map((feature: { title: string; desc: string; microcopy: string; accent: string }) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              desc={feature.desc}
              microcopy={feature.microcopy}
              icon={feature.title === 'Connect' ? Users : feature.title === 'Collaborate' ? Handshake : TrendingUp}
              accent={feature.accent}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12">
        <div className="reveal-programs grid gap-6 lg:grid-cols-2">
          {homeContent.programs.map((program: { title: string; summary: string; cta: string; bullets: string[] }) => (
            <ProgramCard
              key={program.title}
              title={program.title}
              summary={program.summary}
              cta={program.cta}
              bullets={program.bullets}
              accent={program.title.includes('Creator') ? 'bg-gradient-to-br from-brand-green/10 to-white' : 'bg-gradient-to-br from-brand-blue/10 to-white'}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12">
        <div className="reveal-audience rounded-[2rem] border border-slate-200 bg-brand-grey p-8 sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Who it’s for</p>
          <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">Untuk orang-orang yang ingin tumbuh lewat komunitas yang selaras.</h2>
          <div className="mt-8">
            <AudienceChips items={homeContent.audiences} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12">
        <div className="reveal-values mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Community values</p>
          <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">Nilai yang menjaga komunitas KOLLAB tetap hangat dan kredibel.</h2>
        </div>
        <ValuesGrid items={values} />
      </section>

      <section className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12">
        <div className="reveal-lead grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Upcoming activation</p>
            <h2 className="mt-3 text-3xl font-black text-brand-navy">Tertarik bergabung atau berkolaborasi?</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Tinggalkan kontakmu dan kami akan mengirimkan info kegiatan yang paling relevan untukmu.
            </p>
            <div className="mt-8 rounded-[1.5rem] bg-brand-grey p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="mt-4 text-lg font-semibold text-brand-navy">Growth Circle dan Creator Class sedang dibuka.</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Sesi kami dirancang untuk mendorong koneksi yang lebih manusiawi, bukan sekadar networking.</p>
            </div>
          </div>
          <LeadForm title="Tertarik bergabung atau berkolaborasi? Tinggalkan kontakmu." description="Kami akan menghubungi kamu dengan opsi yang paling relevan: Growth Circle, Creator Class, atau partner." />
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 pb-20 pt-4 sm:px-8 lg:px-12">
        <div className="reveal-partner rounded-[2rem] border border-slate-200 bg-gradient-to-r from-brand-green/10 via-white to-brand-blue/10 p-8 sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Partner With KOLLAB</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black text-brand-navy sm:text-4xl">Bersama kami, kolaborasi bisa terasa lebih dekat, relevan, dan berdampak.</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Jika kamu sedang membangun komunitas, program pembelajaran, atau kesempatan bagi orang-orang yang ingin bertumbuh, kami terbuka untuk berkolaborasi dengan pendekatan yang human dan supportif.
          </p>
          <a href="mailto:hello@kollab.id" className="mt-8 inline-flex items-center rounded-full bg-brand-navy px-6 py-3 font-semibold text-white transition hover:bg-brand-green">
            Partner With Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
