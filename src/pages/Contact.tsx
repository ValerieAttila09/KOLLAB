import React, { useEffect, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Camera, ChevronDown, Mail, MapPin, MessageCircleMore, Send, Sparkles } from 'lucide-react'

type InterestKey = 'Partnership' | 'Community' | 'Event' | 'Business Collaboration' | 'Media' | 'General Inquiry'

const contactCards = [
  {
    title: 'Email',
    value: 'hello@kollab.id',
    description: 'Untuk kolaborasi, partnership, dan percakapan yang bernilai.',
    icon: Mail,
    href: 'mailto:hello@kollab.id',
    action: 'Kirim Email',
  },
  {
    title: 'WhatsApp',
    value: '+62 812 3456 7890',
    description: 'Respons cepat untuk ide baru, pertanyaan komunitas, dan peluang kolaborasi.',
    icon: MessageCircleMore,
    href: 'https://wa.me/6281234567890',
    action: 'Chat di WhatsApp',
  },
  {
    title: 'Instagram',
    value: '@kollab.id',
    description: 'Ikuti cerita, momen komunitas, dan aktivasi yang akan datang.',
    icon: Camera,
    href: 'https://www.instagram.com',
    action: 'Lihat Instagram',
  },
  {
    title: 'LinkedIn',
    value: 'KOLLAB Ecosystem',
    description: 'Terhubung dengan creator, profesional, dan partner bisnis.',
    icon: BriefcaseBusiness,
    href: 'https://www.linkedin.com',
    action: 'Buka LinkedIn',
  },
  {
    title: 'Kantor',
    value: 'Jl. Gatot Subroto No.19, Petisah Tengah, Kec. Medan Petisah, Kota Medan, Sumatera Utara, Indonesia.',
    description: 'Rumah kami untuk kolaborasi yang bermakna dan pertumbuhan yang sehat.',
    icon: MapPin,
    href: 'https://maps.google.com',
    action: 'Lihat Lokasi',
  },
]

const interests: InterestKey[] = ['Partnership', 'Community', 'Event', 'Business Collaboration', 'Media', 'General Inquiry']

const faqs = [
  {
    question: 'Berapa lama KOLLAB biasanya membalas pesan?',
    answer: 'Kebanyakan pertanyaan mendapatkan balasan yang thoughtful dalam waktu 1–3 hari kerja, tergantung pada jenis permintaannya.',
  },
  {
    question: 'Apakah saya bisa berkolaborasi dengan KOLLAB?',
    answer: 'Tentu. Kami menyambut kolaborasi di berbagai bidang, mulai dari komunitas, event, inisiatif bisnis, hingga eksperimen kreatif.',
  },
  {
    question: 'Apakah bisnis bisa menjadi partner KOLLAB?',
    answer: 'Ya. Kami bekerja sama dengan bisnis yang peduli pada pembentukan komunitas yang bermakna, pertumbuhan yang sehat, dan alignment jangka panjang.',
  },
  {
    question: 'Bagaimana cara bergabung dengan komunitas?',
    answer: 'Anda bisa mulai dengan menghubungi kami melalui halaman ini atau mengikuti kanal kami untuk melihat peluang komunitas yang akan datang.',
  },
  {
    question: 'Apakah KOLLAB mengadakan event offline?',
    answer: 'Ya. Kami menyelenggarakan gathering offline yang dirancang dengan hati-hati untuk menciptakan koneksi yang lebih dalam dan momentum bersama.',
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
      <section className="relative min-h-screen ">
        <div className="mx-auto max-w-360 px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-28 reveal grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2 text-sm font-semibold text-brand-green">
              <Sparkles className="h-4 w-4" />
              Hubungi KOLLAB
            </div>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-[-0.03em] text-brand-navy sm:text-5xl lg:text-6xl">
              Mari bangun sesuatu yang bermakna bersama.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Baik Anda punya ide, peluang kolaborasi, pertanyaan bisnis, atau sekadar ingin terhubung, kami dengan senang hati ingin mendengar dari Anda.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start">
              <a href="#contact-form" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green">
                Mulai Percakapan
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#faq" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-brand-navy transition hover:border-brand-green hover:text-brand-green">
                Lihat FAQ
              </a>
            </div>
          </div>
        </div>
        <div className="flex md:absolute inset-y-0 right-0 max-w-max md:max-w-1/2">
          <div className="h-full flex items-center justify-center">
            <img src="/public/images/Frame 5.png" alt="" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="reveal text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/10 px-4 py-2 text-sm font-semibold text-brand-green">
            <Sparkles className="h-4 w-4" />
            Mari Terhubung
          </div>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight text-brand-navy sm:text-5xl lg:text-6xl">
            Setiap Kolaborasi Besar Dimulai dari Percakapan yang Bermakna.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Baik Anda mencari peluang partnership, komunitas, media, atau sekadar ingin terhubung, kami ada di sini untuk memulai percakapan.
          </p>
        </div>

        <div className="reveal relative mt-16 md:mt-20 px-8 md:px-0">
          {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(52,178,106,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(39,119,201,0.10),_transparent_34%)]" /> */}
          <div className="absolute left-[35px] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-brand-green/60 via-brand-teal/50 to-brand-blue/60 md:block" />
          <div className="space-y-8 md:space-y-10">
            {contactCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="group relative md:grid md:grid-cols-[72px_1fr] md:items-start"
                >
                  <div className="relative z-10 flex md:justify-center md:pt-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-green via-brand-teal to-brand-blue text-white shadow-[0_0_0_10px_rgba(52,178,106,0.08)] transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_14px_rgba(52,178,106,0.16)]">
                      <span className="absolute h-12 w-12 rounded-full bg-brand-green/20 blur-lg opacity-0 transition duration-300 group-hover:opacity-100" />
                      <Icon className="relative h-5 w-5 transition duration-300 group-hover:rotate-12" />
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:pl-4">
                    <div className="max-w-2xl transition duration-300 group-hover:translate-x-1">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-green/80">
                        Node 0{index + 1}
                      </div>
                      <h3 className="text-3xl font-semibold text-brand-navy transition duration-300 group-hover:text-brand-green sm:text-[1.8rem]">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xl font-semibold text-brand-navy">{card.value}</p>
                      <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                        {card.description}
                      </p>
                      <a
                        href={card.href}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal transition duration-300 hover:text-brand-green"
                      >
                        <span className="underline-offset-4 transition group-hover:underline">{card.action}</span>
                        <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contact-form" className="mx-auto max-w-360 px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="reveal grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:p-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">Form Kontak</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Ceritakan ide, visi, atau langkah berikutnya Anda.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Kami percaya kerja yang bermakna dimulai dari percakapan yang jelas. Ceritakan apa yang sedang Anda bangun, dan kami akan membantu menemukan cara yang tepat untuk terhubung.
            </p>
            <div className="mt-8 rounded-[1.5rem] bg-brand-grey p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="mt-4 text-lg font-semibold text-brand-navy">Respons yang thoughtful, bukan jawaban yang templated.</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Setiap balasan kami sesuaikan dengan konteks, orang-orang yang terlibat, dan nilai di balik koneksi tersebut.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Nama Lengkap</span>
                <input value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Ayu Pratama" required />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Alamat Email</span>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Nomor Telepon</span>
                <input value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Opsional" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                <span className="mb-2 block">Perusahaan / Organisasi</span>
                <input value={formState.company} onChange={(e) => setFormState({ ...formState, company: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Opsional" />
              </label>
            </div>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Subjek</span>
              <input value={formState.subject} onChange={(e) => setFormState({ ...formState, subject: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Apa yang ingin Anda bicarakan?" required />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              <span className="mb-2 block">Pesan</span>
              <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="min-h-[170px] w-full rounded-[1.35rem] border border-slate-200 bg-brand-grey px-4 py-3.5 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" placeholder="Ceritakan ide, kebutuhan, atau undangan Anda." required />
            </label>

            <div className="rounded-[1.5rem] border border-slate-200 bg-brand-grey p-5">
              <p className="text-sm font-semibold text-brand-navy">Saya tertarik pada:</p>
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
              Kirim Pesan
              <Send className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-12">
        <div className="reveal rounded-[2rem] border border-slate-200 bg-gradient-to-r from-brand-green/10 via-white to-brand-blue/10 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.05)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-green">Undangan Kolaborasi</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Kolaborasi yang luar biasa dimulai dari koneksi yang bermakna.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              KOLLAB hadir untuk menghubungkan orang, ide, dan peluang yang mendorong pertumbuhan yang berkelanjutan. Baik Anda individu, creator, profesional, startup, maupun bisnis, mari jelajahi apa yang bisa kita bangun bersama.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:hello@kollab.id" className="inline-flex items-center justify-center rounded-full bg-brand-navy px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-green">
              Jadi Partner
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#contact-form" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 font-semibold text-brand-navy transition hover:border-brand-green hover:text-brand-green">
              Bergabung dengan Komunitas
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-360 px-4 py-16 sm:px-6 lg:px-12 lg:py-24">
        <div className="reveal grid gap-10 lg:grid-cols-[0.9fr_1.35fr] lg:items-start">
          <div className="lg:max-w-[340px]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-teal">FAQ</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
              Pertanyaan yang sering muncul
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Semua yang perlu Anda ketahui sebelum menjadi bagian dari ekosistem KOLLAB.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Masih ragu? Tim kami siap membantu Anda memulai percakapan.
            </p>

            <div className="mt-6">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-green hover:text-brand-green"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition duration-300 ease-out group-hover:translate-x-1" />
              </a>
            </div>


          </div>

          <div className="reveal w-full lg:max-w-[730px] lg:justify-self-end">
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div
                    key={faq.question}
                    className={`group overflow-hidden rounded-[1.25rem] border transition-all duration-300 ease-out ${isOpen
                      ? 'border-brand-green bg-[linear-gradient(180deg,rgba(52,178,106,0.09),rgba(255,255,255,1))] shadow-[0_0_0_1px_rgba(52,178,106,0.12)]'
                      : 'border-slate-200 bg-white hover:border-brand-green/50 hover:bg-brand-green/[0.03]'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-start gap-3">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full transition-colors duration-300 ${isOpen ? 'bg-brand-green' : 'bg-slate-300 group-hover:bg-brand-green/70'}`} />
                        <span className="text-base font-semibold leading-7 text-brand-navy sm:text-lg">{faq.question}</span>
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition-all duration-300 ease-out group-hover:translate-x-0.5 ${isOpen ? 'rotate-180 text-brand-green' : ''}`} />
                    </button>

                    <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] px-5 pb-5 sm:px-6' : 'grid-rows-[0fr] px-5 sm:px-6'}`}>
                      <div className="overflow-hidden">
                        <div className={`overflow-hidden border-t transition-all duration-300 ease-out ${isOpen ? 'border-brand-green/20 opacity-100' : 'border-transparent opacity-0'}`} />
                        <div className={`pt-4 text-sm leading-7 text-slate-600 transition-all duration-300 ease-out ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}>
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
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
            <p className="text-lg font-semibold text-brand-green sm:text-xl">“Saat orang-orang yang bermakna terhubung, peluang besar akan hadir secara alami.”</p>
            <p className="mt-6 text-3xl font-black leading-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Saat orang-orang yang bermakna terhubung, peluang besar akan hadir secara alami.
            </p>
            <p className="mt-6 text-lg font-semibold text-slate-600">— KOLLAB</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
