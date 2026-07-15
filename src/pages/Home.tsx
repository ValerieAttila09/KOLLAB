import { useEffect, useRef } from 'react'
import { ArrowRight, Compass, Handshake, HeartHandshake, Sparkles, TrendingUp, Users, CheckCircle2, QuoteIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import AudienceChips from '../components/AudienceChips'
import ValuesGrid from '../components/ValuesGrid'
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

      <section className="mx-auto max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="reveal-about grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="max-w-2xl text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Tentang KOLLAB</p>
            <h2 className="mt-4 text-3xl font-black leading-[1.1] text-brand-navy sm:text-4xl lg:text-5xl">
              {homeContent.about.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {homeContent.about.body}
            </p>
            <div className="mt-8 space-y-4 text-left">
              {homeContent.problems.slice(0, 2).map((problem: string) => (
                <div key={problem} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-brand-green" />
                  <p className="text-base text-slate-600">{problem}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-brand-green/10 via-white to-brand-blue/10 shadow-[0_20px_80px_rgba(15,23,42,0.08)] overflow-hidden">
            <img src="/public/images/Home_Section2.jpeg" alt="" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="reveal-why grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Mengapa KOLLAB Ada</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Masalah pertumbuhan yang nyata.
            </h2>
            <div className="mt-8 space-y-6">
              {homeContent.problems.map((problem: string, idx: number) => (
                <div key={problem} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-base font-medium text-slate-700">{problem}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-brand-navy to-slate-900 p-8 text-white shadow-[0_25px_80px_rgba(15,23,42,0.16)] sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Compass className="h-7 w-7 text-brand-green" />
              </div>
              <h3 className="mt-8 text-3xl font-black leading-tight">KOLLAB hadir sebagai jawaban.</h3>
              <p className="mt-6 text-lg leading-8 text-slate-300">{homeContent.solution}</p>
              <div className="mt-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 w-fit">
                <div className="h-2 w-2 rounded-full bg-brand-green" />
                <span className="text-sm font-semibold">Connect. Collaborate. Grow.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="reveal-what mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Apa yang Kami Lakukan</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-brand-navy sm:text-5xl">
            Ruang untuk connect, collaborate, dan grow.
          </h2>
        </div>
        <div className="reveal-what grid gap-8 lg:grid-cols-3">
          {homeContent.features.map((feature: { title: string; desc: string; microcopy: string; accent: string }) => {
            const featureIconMap = {
              'Connect': Users,
              'Collaborate': Handshake,
              'Grow': TrendingUp,
            }
            const Icon = featureIconMap[feature.title as keyof typeof featureIconMap] || Sparkles
            return (
              <div
                key={feature.title}
                className={`group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-10`}
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${feature.accent}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-brand-navy">{feature.title}</h3>
                <p className="mt-3 text-lg text-slate-600">{feature.desc}</p>
                <p className="mt-4 text-sm font-medium text-slate-500">{feature.microcopy}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="reveal-programs mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Program Kami</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-brand-navy sm:text-5xl">
            Cara kami mendampingi pertumbuhan Anda.
          </h2>
        </div>
        <div className="reveal-programs grid gap-8 lg:grid-cols-2">
          {homeContent.programs.map((program: { title: string; summary: string; cta: string; bullets: string[] }, idx: number) => (
            <div
              key={program.title}
              className={`rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)] lg:p-12 ${idx === 0 ? 'lg:border-brand-green/30 lg:bg-gradient-to-br lg:from-brand-green/5 lg:to-white' : 'lg:border-brand-blue/30 lg:bg-gradient-to-br lg:from-brand-blue/5 lg:to-white'
                }`}
            >
              <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${idx === 0 ? 'text-brand-green' : 'text-brand-blue'}`}>
                {idx === 0 ? 'Program' : 'Program'}
              </p>
              <h3 className="mt-3 text-3xl font-black text-brand-navy">{program.title}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">{program.summary}</p>
              <ul className="mt-8 space-y-4">
                {program.bullets.map((bullet: string) => (
                  <li key={bullet} className="flex gap-3">
                    <span className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${idx === 0 ? 'bg-brand-green' : 'bg-brand-blue'}`} />
                    <span className="text-base text-slate-600">{bullet}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-8 inline-flex items-center font-semibold transition ${idx === 0 ? 'text-brand-green hover:text-brand-green/80' : 'text-brand-blue hover:text-brand-blue/80'
                }`}>
                {program.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="mx-auto flex w-full max-w-[15rem] items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-brand-blue shadow sm:mx-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-brand-green">
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
              </svg>
              <span className="font-semibold">Community Experience</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">A space to learn, meet, and grow together.</h1>
            <p className="text-base text-neutral-600 sm:text-lg">KOLLAB dirancang sebagai ruang yang hangat untuk bertemu orang baru, berbagi cerita, belajar dari pengalaman, dan membuka pulang kolaborasi.</p>
            <div className="relative overflow-hidden rounded-2xl w-full h-auto p-8 space-y-4 bg-linear-to-r from-brand-blue to-brand-green">
              <QuoteIcon size={48} className="text-white/35"/>
              <blockquote className="max-w-3/5 text-xl text-white font-semibold sm:text-2xl">
                Built for people who believe growth feels better when shared.
              </blockquote>
              <img src="/images/Main_Icon-removebg-preview.png" alt="" className="absolute -bottom-12 -right-20 saturate-0 size-56 opacity-50 sm:size-72"/>
            </div>
          </div>
          <div className="w-full">
            <img src="/images/Frame 2.png" alt="" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="reveal-audience rounded-[2rem] border border-slate-200 bg-brand-grey p-8 sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Untuk Siapa</p>
          <h2 className="mt-3 text-4xl font-black text-brand-navy sm:text-5xl">Untuk orang yang ingin tumbuh bersama komunitas yang selaras.</h2>
          <div className="mt-10">
            <AudienceChips items={homeContent.audiences} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="reveal-values mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Nilai Komunitas</p>
          <h2 className="mt-3 text-4xl font-black text-brand-navy sm:text-5xl">Nilai yang menjaga kami tetap hangat dan kredibel.</h2>
        </div>
        <div className="reveal-values">
          <ValuesGrid items={values} />
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 pb-20 sm:px-6 lg:px-12">
        <div className="reveal-partner rounded-[2rem] border border-slate-200 bg-gradient-to-r from-brand-green/10 via-white to-brand-blue/10 p-8 shadow-sm sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Berkolaborasi Bersama Kami</p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Bersama kami, kolaborasi terasa lebih dekat dan berdampak.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Jika Anda membangun komunitas, program pembelajaran, atau kesempatan bagi orang-orang yang ingin bertumbuh, kami terbuka untuk berkolaborasi dengan pendekatan yang human dan supportif.
            </p>
            <a
              href="mailto:hello@kollab.id"
              className="mt-8 inline-flex items-center rounded-full bg-brand-navy px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green"
            >
              Ajak Kami Berkolaborasi
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
