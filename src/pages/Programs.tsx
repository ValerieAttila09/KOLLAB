import { useEffect } from 'react'
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  Coffee,
  Globe,
  Handshake,
  HeartHandshake,
  Laptop2,
  Lightbulb,
  MapPin,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react'

const overviewPrograms = [
  {
    title: 'Growth Circle',
    description: 'Networking santai untuk bertemu orang sejalan dan membangun koneksi meaningful.',
    action: 'Join Circle',
    path: '#growth-circle',
    icon: Users,
    accent: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'Creator Class',
    description: 'Ruang belajar skill creator, personal branding, AI workflow, content planning, dan monetization.',
    action: 'Explore Class',
    path: '#creator-class',
    icon: Sparkles,
    accent: 'bg-brand-teal/10 text-brand-teal',
  },
  {
    title: 'Community Activation',
    description: 'Coffee circle, sharing session, workshop, dan pengalaman komunitas yang lebih human.',
    action: 'See Activities',
    path: '#community-activation',
    icon: Coffee,
    accent: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    title: 'Partnership Program',
    description: 'Kolaborasi dengan brand, venue, komunitas, kampus, creator, dan business partner.',
    action: 'Partner With Us',
    path: '#partnership-program',
    icon: Handshake,
    accent: 'bg-brand-navy/10 text-brand-navy',
  },
]

const growthBenefits = [
  {
    title: 'Coffee Circle',
    description: 'Obrolan santai yang membuka koneksi baru.',
    icon: Coffee,
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'Sharing Session',
    description: 'Belajar dari cerita, insight, dan pengalaman nyata.',
    icon: Sparkles,
    color: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    title: 'Meaningful Networking',
    description: 'Bertemu orang yang relevan, bukan sekadar tukar kontak.',
    icon: Users,
    color: 'bg-brand-teal/10 text-brand-teal',
  },
  {
    title: 'Collaboration Opportunity',
    description: 'Membuka kemungkinan project, ide, dan partnership baru.',
    icon: Handshake,
    color: 'bg-brand-navy/10 text-brand-navy',
  },
]

const creatorFocus = [
  {
    title: 'Personal Branding',
    description: 'Bangun positioning dan pesan yang lebih jelas.',
    icon: Sparkles,
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'AI Workflow',
    description: 'Gunakan AI untuk mempercepat riset, ide, dan produksi.',
    icon: Laptop2,
    color: 'bg-brand-teal/10 text-brand-teal',
  },
  {
    title: 'Content Planning',
    description: 'Susun konten dengan struktur dan tujuan yang lebih rapi.',
    icon: Calendar,
    color: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    title: 'Creative Skill',
    description: 'Editing, photography, short-form video, dan visual storytelling.',
    icon: Camera,
    color: 'bg-brand-navy/10 text-brand-navy',
  },
  {
    title: 'Creator Monetization',
    description: 'Pahami peluang affiliate, clipper, portfolio, dan income stream.',
    icon: HeartHandshake,
    color: 'bg-brand-green/10 text-brand-green',
  },
]

const activationItems = [
  {
    title: 'Coffee Circle',
    description: 'Obrolan santai yang memulai koneksi.',
    icon: Coffee,
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'Sharing Session',
    description: 'Ruang berbagi insight dan pengalaman.',
    icon: Sparkles,
    color: 'bg-brand-teal/10 text-brand-teal',
  },
  {
    title: 'Workshop',
    description: 'Belajar skill praktis bersama mentor dan peers.',
    icon: BookOpen,
    color: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    title: 'Networking Meetup',
    description: 'Bertemu orang sejalan dalam suasana yang lebih natural.',
    icon: Users,
    color: 'bg-brand-navy/10 text-brand-navy',
  },
  {
    title: 'Collaboration Day',
    description: 'Membuka peluang ide, project, dan partnership.',
    icon: Handshake,
    color: 'bg-brand-green/10 text-brand-green',
  },
]

const partnershipItems = [
  {
    title: 'Brand Collaboration',
    description: 'Campaign, activation, dan community engagement.',
    icon: Globe,
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'Venue Partnership',
    description: 'Ruang untuk coffee circle, workshop, dan meetup.',
    icon: MapPin,
    color: 'bg-brand-teal/10 text-brand-teal',
  },
  {
    title: 'Community Partnership',
    description: 'Kolaborasi antar komunitas untuk memperluas impact.',
    icon: Users,
    color: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    title: 'Campus Collaboration',
    description: 'Program belajar, sharing session, dan creator activation.',
    icon: BookOpen,
    color: 'bg-brand-navy/10 text-brand-navy',
  },
  {
    title: 'Creator Activation',
    description: 'Menghubungkan creator dengan brand, audience, dan peluang.',
    icon: Camera,
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'Workshop Collaboration',
    description: 'Membangun sesi belajar yang praktis dan relevan.',
    icon: Wrench,
    color: 'bg-brand-teal/10 text-brand-teal',
  },
]

const pathOptions = [
  {
    title: 'Aku butuh circle',
    description: 'Mulai dari Growth Circle.',
    action: 'Join Growth Circle',
    icon: Users,
    color: 'bg-brand-green/10 text-brand-green',
  },
  {
    title: 'Aku butuh skill',
    description: 'Mulai dari Creator Class.',
    action: 'Explore Creator Class',
    icon: Lightbulb,
    color: 'bg-brand-teal/10 text-brand-teal',
  },
  {
    title: 'Aku ingin ikut aktivitas',
    description: 'Mulai dari Community Activation.',
    action: 'See Activities',
    icon: Calendar,
    color: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    title: 'Aku ingin kolaborasi',
    description: 'Mulai dari Partnership Program.',
    action: 'Collaborate With Us',
    icon: Handshake,
    color: 'bg-brand-navy/10 text-brand-navy',
  },
]

const Programs = () => {
  useEffect(() => {
    document.title = 'Programs | KOLLAB — Grow Through Collaboration'
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', 'KOLLAB Programs page menjelaskan Growth Circle, Creator Class, Community Activation, dan Partnership Program sebagai jalan untuk bertumbuh bersama.')
    }
  }, [])

  return (
    <div className="overflow-hidden bg-white text-brand-navy">
      <section className="relative overflow-hidden bg-brand-grey/50 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-green/10 to-transparent" />
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
            <div className="mx-auto max-w-2xl space-y-8 text-center sm:text-left">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-green">Program Page</p>
                <h1 className="text-4xl font-black leading-tight tracking-[-0.03em] text-brand-navy sm:text-5xl lg:text-6xl">
                  Mulai dari belajar skill, membangun circle, atau berkolaborasi.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  KOLLAB menghadirkan ruang untuk learner, creator, profesional, business builder, dan early founder agar bisa belajar, bertemu, berkolaborasi, dan bertumbuh bersama.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#overview" className="inline-flex items-center justify-center rounded-full bg-brand-green px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-green/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-green/90">
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a href="#growth-circle" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-brand-navy transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal">
                  Join Growth Circle
                </a>
              </div>

              <p className="text-base font-medium text-slate-500">
                Choose your path to grow through collaboration.
              </p>
            </div>

            <img src="/images/ff1.png" alt="" className="w-full h-auto"/>
          </div>
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-360 px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-green">PROGRAM OVERVIEW</p>
            <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Empat cara untuk mulai bertumbuh bersama KOLLAB.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Kamu bisa mulai dari kebutuhan yang paling relevan: membangun circle, belajar skill creator, mengikuti pengalaman komunitas, atau membuka peluang partnership.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {overviewPrograms.map((program) => {
              const Icon = program.icon
              return (
                <div key={program.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${program.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-brand-navy">{program.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{program.description}</p>
                  <a href={program.path} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal">
                    {program.action}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
        <p className="mt-10 text-base font-medium text-slate-500">Start from what you need most.</p>
      </section>

      <section id="growth-circle" className="bg-brand-grey/50 py-16 sm:py-20">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-green">GROWTH CIRCLE</p>
              <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
                Networking santai untuk koneksi yang lebih meaningful.
              </h2>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Growth Circle adalah ruang untuk bertemu orang yang sejalan, ngobrol dengan lebih natural, berbagi pengalaman, dan membuka peluang kolaborasi tanpa harus merasa kaku.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {growthBenefits.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#" className="inline-flex items-center justify-center rounded-full bg-brand-green px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-green/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-green/90">
                  Join Growth Circle
                </a>
                <p className="text-sm font-medium text-slate-500">Growth tidak harus dibangun sendirian.</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
              <div className="absolute right-8 top-10 h-24 w-24 rounded-full bg-brand-blue/10 blur-2xl" />
              <div className="absolute left-8 bottom-12 h-24 w-24 rounded-full bg-brand-green/10 blur-2xl" />
              <div className="relative rounded-2xl border border-slate-100 bg-brand-grey p-6">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-3xl bg-white shadow-sm" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">Coffee Circle</p>
                    <p className="mt-2 text-sm text-slate-500">Obrolan santai, koneksi nyata.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-3xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                        <Coffee className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">Ngobrol santai</p>
                        <p className="text-sm text-slate-500">Koneksi terasa lebih alami.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-brand-navy">Tim kecil, dampak besar</p>
                        <p className="text-sm text-slate-500">Circle yang membantu Anda bertemu orang tepat.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="creator-class" className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-brand-grey p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
            <div className="absolute -right-8 top-10 h-32 w-32 rounded-full bg-brand-teal/10 blur-3xl" />
            <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-brand-green/10 blur-3xl" />
            <div className="relative rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Creator Workflow</p>
                  <p className="text-xs text-slate-500">Learning, planning, creating.</p>
                </div>
                <div className="rounded-full bg-brand-green/10 px-3 py-2 text-sm font-semibold text-brand-green">Focus</div>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                      <Laptop2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">Desk planning</p>
                      <p className="text-sm text-slate-500">Rencana konten dan workflow yang jelas.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">Content snapshot</p>
                      <p className="text-sm text-slate-500">Visual, video, dan storytelling direction.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-teal">CREATOR CLASS</p>
            <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Belajar skill creator dengan arah yang lebih jelas.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Creator Class adalah ruang belajar untuk creator, freelancer, profesional muda, dan creative builder yang ingin mengembangkan personal branding, AI workflow, content planning, editing, photography, dan monetization.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {creatorFocus.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-brand-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#" className="inline-flex items-center justify-center rounded-full bg-brand-teal px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-teal/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-teal/90">
                Explore Creator Class
              </a>
              <p className="text-sm font-medium text-slate-500">Skill yang tepat membantu growth jadi lebih terarah.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="community-activation" className="bg-brand-grey/50 py-16 sm:py-20">
        <div className="mx-auto max-w-360 px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-green">COMMUNITY ACTIVATION</p>
              <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
                Pengalaman nyata untuk belajar, bertemu, dan bertumbuh.
              </h2>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                KOLLAB membangun koneksi melalui pengalaman yang santai, relevan, dan meaningful. Dari coffee circle, sharing session, workshop ringan, sampai collaboration meetup.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {activationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${item.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-3xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <Coffee className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-navy">Offline connection</p>
                    <p className="text-sm text-slate-500">Rangkaian pengalaman yang terasa nyata dan hangat.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-brand-grey p-4">
                  <p className="text-sm font-semibold text-brand-navy">Coffee circle</p>
                  <p className="text-sm text-slate-600">Tempat memulai percakapan tanpa tekanan.</p>
                </div>
              </div>

              <div className="rounded-2xl bg-brand-blue/10 border border-brand-blue/25 p-6 shadow-[0_20px_80px_rgba(39,119,201,0.12)]">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-3xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-navy">Warm meetup</p>
                    <p className="text-sm text-slate-600">Bertemu orang dengan tujuan yang saling melengkapi.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-brand-navy">Sharing session</p>
                  <p className="text-sm text-slate-600">Belajar dari cerita nyata dan insight praktis.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#" className="inline-flex items-center justify-center rounded-full bg-brand-blue px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-blue/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-blue/90">
              See Community Activities
            </a>
            <p className="text-sm font-medium text-slate-500">Online conversation. Offline connection. Real collaboration.</p>
          </div>
        </div>
      </section>

      <section id="partnership-program" className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-teal">PARTNERSHIP PROGRAM</p>
            <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Let’s create growth through collaboration.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              KOLLAB terbuka untuk kolaborasi dengan brand, venue, komunitas, kampus, creator, mentor, dan business owner yang ingin membangun ruang pertumbuhan bersama.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-navy/15 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-blue">
                Collaborate With KOLLAB
              </a>
              <p className="text-sm font-medium text-slate-500">Where Collaboration Creates Growth.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {partnershipItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="choose-path" className="bg-brand-grey/50 py-16 sm:py-20">
        <div className="mx-auto max-w-360 px-6 sm:px-8 lg:px-12">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-green">CHOOSE YOUR PATH</p>
            <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Kamu bisa mulai dari kebutuhanmu dulu.
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600">
              Tidak semua orang mulai dari tempat yang sama. Pilih ruang yang paling relevan dengan kebutuhan growth kamu saat ini.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {pathOptions.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-brand-green/20 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.description}</p>
                  <a href="#" className="mt-6 text-nowrap inline-flex items-center gap-2 text-sm font-semibold text-brand-teal transition group-hover:text-brand-blue">
                    {item.action}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              )
            })}
          </div>

          <p className="mt-10 text-center text-base font-medium text-slate-500">Start small. Connect better. Grow together.</p>
        </div>
      </section>

      <section id="final-cta" className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-green">START WITH KOLLAB</p>
            <h2 className="text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Mulai dari ruang yang paling kamu butuhkan.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Kamu tidak harus punya semuanya dari awal. Mulai dari belajar skill, membangun circle, mengikuti aktivitas komunitas, atau membuka peluang kolaborasi bersama KOLLAB.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <a href="#growth-circle" className="inline-flex text-nowrap items-center justify-center rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-green/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-green/90">
                Join Growth Circle
              </a>
              <a href="#creator-class" className="inline-flex text-nowrap items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy transition duration-300 hover:-translate-y-0.5 hover:border-brand-teal hover:text-brand-teal">
                Explore Creator Class
              </a>
              <a href="#partnership-program" className="inline-flex text-nowrap items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-brand-blue transition duration-300 hover:border-brand-green hover:text-brand-green">
                Collaborate With KOLLAB
              </a>
            </div>

            <p className="text-base font-medium text-slate-500">Grow Through Collaboration.</p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-brand-grey p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
            <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-brand-green/10 blur-3xl" />
            <div className="absolute left-6 bottom-8 h-32 w-32 rounded-full bg-brand-blue/10 blur-3xl" />
            <div className="relative rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="flex justify-between items-center rounded-xl bg-brand-blue/5 p-5">
                <div>
                  <p className="text-sm font-semibold text-brand-navy">Community circle</p>
                  <p className="text-sm text-slate-500">Diskusi hangat dengan tim creator dan partner.</p>
                </div>
                <div className="h-12 w-12 rounded-3xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Handshake className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-brand-grey p-5">
                  <p className="font-semibold text-brand-navy">Warm circle</p>
                  <p className="mt-2 text-sm text-slate-600">Ruang yang terasa mendukung dan bukan kaku.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-brand-grey p-5">
                  <p className="font-semibold text-brand-navy">Practical growth</p>
                  <p className="mt-2 text-sm text-slate-600">Pengalaman yang bisa langsung dibawa ke langkah nyata.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Programs
