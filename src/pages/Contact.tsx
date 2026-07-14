import React, { useEffect, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Camera, ChevronDown, Mail, MapPin, MessageCircleMore, Send, Sparkles } from 'lucide-react'

type InterestKey = 'Partnership' | 'Community' | 'Event' | 'Business Collaboration' | 'Media' | 'General Inquiry'

const contactCards = [
  {
    title: 'Email',
    value: 'hello@kollab.id',
    description: 'For partnerships, collaborations, and thoughtful conversations.',
    icon: Mail,
  },
  {
    title: 'WhatsApp',
    value: '+62 812 3456 7890',
    description: 'Fast replies for new ideas, community inquiries, and opportunities.',
    icon: MessageCircleMore,
  },
  {
    title: 'Instagram',
    value: '@kollab.id',
    description: 'Follow our stories, community rhythms, and upcoming activations.',
    icon: Camera,
  },
  {
    title: 'LinkedIn',
    value: 'KOLLAB Ecosystem',
    description: 'Connect with our network of builders, creators, and professionals.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Office Location',
    value: 'Medan, North Sumatra, Indonesia',
    description: 'A human-first base for growth, connection, and collaboration.',
    icon: MapPin,
  },
]

const interests: InterestKey[] = ['Partnership', 'Community', 'Event', 'Business Collaboration', 'Media', 'General Inquiry']

const faqs = [
  {
    question: 'How long does KOLLAB usually respond?',
    answer: 'Most inquiries receive a thoughtful response within 1–3 business days, depending on the nature of the request.',
  },
  {
    question: 'Can I collaborate with KOLLAB?',
    answer: 'Absolutely. We welcome collaborations across community, events, business initiatives, and creative experiments.',
  },
  {
    question: 'Can businesses partner with KOLLAB?',
    answer: 'Yes. We work with businesses that care about meaningful community building, growth, and long-term alignment.',
  },
  {
    question: 'How do I join the community?',
    answer: 'You can start by reaching out through this page or following our channels for upcoming community opportunities.',
  },
  {
    question: 'Do you organize offline events?',
    answer: 'Yes, we host thoughtfully curated offline gatherings that create deeper connection and shared momentum.',
  },
]

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0)
  const [selectedInterests, setSelectedInterests] = useState<InterestKey[]>(['Partnership'])
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    document.title = 'Contact KOLLAB | Build Something Meaningful'
    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', 'Reach out to KOLLAB for partnerships, collaborations, community conversations, and meaningful growth opportunities.')
    }

    const revealElements = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.16 },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const toggleInterest = (interest: InterestKey) => {
    setSelectedInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    )
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <div className="overflow-hidden bg-white pb-24 text-brand-navy">
      <section className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="reveal grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2 text-sm font-semibold text-brand-green">
              <Sparkles className="h-4 w-4" />
              Contact KOLLAB
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.03em] text-brand-navy sm:text-5xl lg:text-6xl">
              Let&apos;s build something meaningful together.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Whether you have an idea, partnership opportunity, business inquiry, or simply want to connect, we&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact-form" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green">
                Start the Conversation
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#faq" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-brand-navy transition hover:border-brand-green hover:text-brand-green">
                Explore FAQs
              </a>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-grey via-white to-brand-green/10 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(52,178,106,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(39,119,201,0.14),_transparent_44%)]" />
            <div className="relative">
              <svg viewBox="0 0 520 420" className="w-full" aria-label="Abstract collaboration illustration">
                <rect x="60" y="72" width="110" height="110" rx="24" fill="#F5F7FA" />
                <circle cx="116" cy="126" r="26" fill="url(#personA)" />
                <rect x="352" y="72" width="110" height="110" rx="24" fill="#F5F7FA" />
                <circle cx="408" cy="126" r="26" fill="url(#personB)" />
                <rect x="202" y="214" width="116" height="92" rx="26" fill="#F5F7FA" />
                <circle cx="260" cy="260" r="28" fill="url(#personC)" />
                <path d="M118 126C182 126 222 158 260 260" stroke="url(#flow)" strokeWidth="10" strokeLinecap="round" />
                <path d="M408 126C344 126 304 158 260 260" stroke="url(#flow)" strokeWidth="10" strokeLinecap="round" />
                <path d="M260 260L260 320" stroke="url(#flow)" strokeWidth="10" strokeLinecap="round" />
                <circle cx="260" cy="320" r="18" fill="#34B26A" />
                <circle cx="118" cy="126" r="12" fill="#21A6A6" />
                <circle cx="408" cy="126" r="12" fill="#2777C9" />
                <circle cx="260" cy="260" r="12" fill="#0F172A" />
                <defs>
                  <linearGradient id="personA" x1="90" y1="102" x2="142" y2="152" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34B26A" />
                    <stop offset="1" stopColor="#21A6A6" />
                  </linearGradient>
                  <linearGradient id="personB" x1="382" y1="102" x2="434" y2="152" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2777C9" />
                    <stop offset="1" stopColor="#21A6A6" />
                  </linearGradient>
                  <linearGradient id="personC" x1="232" y1="234" x2="288" y2="286" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0F172A" />
                    <stop offset="1" stopColor="#2777C9" />
                  </linearGradient>
                  <linearGradient id="flow" x1="118" y1="126" x2="260" y2="260" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34B26A" />
                    <stop offset="0.5" stopColor="#21A6A6" />
                    <stop offset="1" stopColor="#2777C9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 py-6 sm:px-8 lg:px-12 lg:py-10">
        <div className="reveal grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon
            return (
              <a key={card.title} href={card.title === 'Email' ? 'mailto:hello@kollab.id' : card.title === 'WhatsApp' ? 'https://wa.me/6281234567890' : '#contact-form'} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-grey text-brand-green transition group-hover:bg-brand-green/10">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-navy">{card.title}</h3>
                <p className="mt-2 text-sm font-medium text-brand-green">{card.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
              </a>
            )
          })}
        </div>
      </section>

      <section id="contact-form" className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="reveal grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:p-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Contact Form</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Share your idea, your vision, or your next move.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We believe the most meaningful work begins with a clear conversation. Tell us what you&apos;re building, and we&apos;ll find the right way to connect.
            </p>
            <div className="mt-8 rounded-[1.5rem] bg-brand-grey p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-semibold text-brand-navy">A thoughtful response, not a templated one.</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">We tailor every reply to the context, the people involved, and the value behind the connection.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Full Name</span>
                <input value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Ayu Pratama" required />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Email Address</span>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Phone Number</span>
                <input value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Optional" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Company / Organization</span>
                <input value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Optional" />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Subject</span>
              <input value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="What would you like to talk about?" required />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Message</span>
              <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="min-h-[170px] w-full rounded-[1.35rem] border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Tell us about your idea, your needs, or your invitation." required />
            </label>

            <div className="rounded-[1.5rem] border border-slate-200 bg-brand-grey p-5">
              <p className="text-sm font-semibold text-brand-navy">I&apos;m interested in:</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {interests.map((interest) => {
                  const checked = selectedInterests.includes(interest)
                  return (
                    <label key={interest} className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${checked ? 'border-brand-green bg-white text-brand-navy shadow-sm' : 'border-transparent bg-white/70 text-slate-600 hover:border-brand-green/30'}`}>
                      <input type="checkbox" checked={checked} onChange={() => toggleInterest(interest)} className="h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green" />
                      {interest}
                    </label>
                  )
                })}
              </div>
            </div>

            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-green via-brand-teal to-brand-blue px-6 py-3.5 font-semibold text-white shadow-[0_16px_50px_rgba(52,178,106,0.22)] transition hover:-translate-y-0.5">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 py-6 sm:px-8 lg:px-12">
        <div className="reveal rounded-[2rem] border border-slate-200 bg-gradient-to-r from-brand-green/10 via-white to-brand-blue/10 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.05)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Collaboration Invitation</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Great collaborations begin with meaningful connections.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              KOLLAB exists to connect people, ideas, and opportunities that create lasting growth. Whether you&apos;re an individual, creator, professional, startup, or business, let&apos;s explore what we can build together.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:hello@kollab.id" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green">
              Become a Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#contact-form" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-brand-navy transition hover:border-brand-green hover:text-brand-green">
              Join the Community
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-360 px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="reveal max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">FAQ</p>
          <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">Questions people often ask before reaching out.</h2>
        </div>
        <div className="reveal mt-8 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div key={faq.question} className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
                <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} className="flex w-full items-center justify-between px-6 py-5 text-left" aria-expanded={isOpen}>
                  <span className="text-base font-semibold text-brand-navy">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-500 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] px-6 pb-5' : 'grid-rows-[0fr] px-6'}`}>
                  <div className="overflow-hidden text-sm leading-7 text-slate-600">{faq.answer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-360 px-6 pb-8 sm:px-8 lg:px-12">
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-slate-200 bg-brand-grey px-8 py-16 text-center shadow-sm sm:px-10 lg:px-16 lg:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(52,178,106,0.16),_transparent_48%)]" />
          <div className="absolute left-8 top-8 h-3 w-3 rounded-full bg-brand-green/70" />
          <div className="absolute right-10 top-12 h-2.5 w-2.5 rounded-full bg-brand-blue/70" />
          <div className="absolute bottom-8 left-16 h-2 w-2 rounded-full bg-brand-teal/70" />
          <div className="absolute bottom-10 right-16 h-3 w-3 rounded-full bg-brand-navy/70" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-lg font-semibold text-brand-green sm:text-xl">“When meaningful people connect, great opportunities naturally follow.”</p>
            <p className="mt-6 text-3xl font-black leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              When meaningful people connect, great opportunities naturally follow.
            </p>
            <p className="mt-6 text-lg font-semibold text-slate-600">— KOLLAB</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
