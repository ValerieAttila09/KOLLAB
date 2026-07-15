import { useEffect, useRef, useState } from 'react'
import { Rocket, Share2, Eye, Heart, Laptop, ArrowRight, Compass, Users, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const [activeStar, setActiveStar] = useState<number | null>(null)

  const whyExistCardsRef = useRef<HTMLDivElement>(null)
  const statsSectionRef = useRef<HTMLElement>(null)
  const statsGridRef = useRef<HTMLDivElement>(null)
  const pipelineRef = useRef<HTMLDivElement>(null)
  const personalityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger stats text
      gsap.fromTo('.stat-fade',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Why We Exist Cards animation
      gsap.fromTo('.why-exist-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: whyExistCardsRef.current,
            start: 'top 85%'
          }
        }
      )

      // Count up numbers animation
      gsap.fromTo('.stat-num',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: 'top 85%'
          }
        }
      )

      // Pipeline card animations
      gsap.fromTo('.pipeline-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pipelineRef.current,
            start: 'top 80%'
          }
        }
      )

      // Personality cards stagger
      gsap.fromTo('.personality-card',
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: personalityRef.current,
            start: 'top 85%'
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const pipelineSteps = [
    {
      step: '1',
      title: 'Small Pieces',
      desc: 'Orang, ide, pengalaman, dan potensi yang awalnya tersebar terpisah.',
      subtags: ['Orang', 'Ide', 'Pengalaman', 'Potensi'],
      color: 'border-brand-green/20 hover:border-brand-green'
    },
    {
      step: '2',
      title: 'One System',
      desc: 'Sistem dan ruang kolaborasi yang mempertemukan dan menghubungkan mereka.',
      subtags: ['Bertemu', 'Terhubung', 'Berbagi', 'Berkolaborasi'],
      color: 'border-brand-teal/20 hover:border-brand-teal'
    },
    {
      step: '3',
      title: 'Growth',
      desc: 'Hasil nyata berupa pembelajaran, koneksi, reputasi, dan peluang bisnis.',
      subtags: ['Pembelajaran', 'Koneksi', 'Reputasi', 'Peluang'],
      color: 'border-brand-blue/20 hover:border-brand-blue'
    }
  ]

  const personalities = [
    {
      icon: <Rocket className="w-6 h-6 text-brand-green" />,
      title: 'Modern',
      desc: 'Relevan dengan perkembangan teknologi, berorientasi masa depan, dan adaptif terhadap kebutuhan digital.',
      bg: 'bg-brand-green/10'
    },
    {
      icon: <Share2 className="w-6 h-6 text-brand-teal" />,
      title: 'Collaborative',
      desc: 'Terbuka pada kerja sama multisektoral, berbagi wawasan secara sehat, dan mendorong interaksi dua arah.',
      bg: 'bg-brand-teal/10'
    },
    {
      icon: <Eye className="w-6 h-6 text-brand-blue" />,
      title: 'Visionary',
      desc: 'Tidak hanya fokus pada kebutuhan hari ini, namun membangun ekosistem jangka panjang yang berkelanjutan.',
      bg: 'bg-brand-blue/10'
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      title: 'Open & Friendly',
      desc: 'Menciptakan ruang aman dan nyaman bagi pemula serta menyambut hangat setiap anggota baru.',
      bg: 'bg-pink-50'
    },
    {
      icon: <Laptop className="w-6 h-6 text-indigo-500" />,
      title: 'Professional but Relaxed',
      desc: 'Memiliki reputasi kredibel secara organisasi, namun dikomunikasikan secara santai dan humanis.',
      bg: 'bg-indigo-50'
    }
  ]

  const whyExistCards = [
    {
      id: 1,
      icon: <Users className="w-8 h-8 text-brand-blue" />,
      title: 'People',
      desc: 'Orang yang ingin belajar dan bertumbuh bersama.',
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue',
      position: 'top-left'
    },
    {
      id: 2,
      icon: <Compass className="w-8 h-8 text-brand-teal" />,
      title: 'Ideas',
      desc: 'Insight, pengalaman, dan gagasan yang dibagikan.',
      bg: 'bg-brand-teal/10',
      border: 'border-brand-teal',
      position: 'bottom-left'
    },
    {
      id: 3,
      icon: <Sparkles className="w-8 h-8 text-brand-blue" />,
      title: 'Opportunities',
      desc: 'Peluang koneksi, proyek, dan kolaborasi nyata.',
      bg: 'bg-brand-blue/10',
      border: 'border-brand-blue',
      position: 'bottom-right'
    },
    {
      id: 4,
      icon: <Sparkles className="w-8 h-8 text-brand-teal" />,
      title: 'Association',
      desc: 'Membuka koneksi dan koneksi baru.',
      bg: 'bg-brand-teal/10',
      border: 'border-brand-teal',
      position: 'bottom-right'
    }
  ]

  return (
    <div className="py-20 sm:py-24">
      <div className="relative w-full overflow-hidden bg-linear-to-b from-white to-brand-grey">
        <section className="mx-auto grid min-h-[70vh] max-w-360 gap-10 px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:py-24">
          <div className="flex flex-col items-start justify-center space-y-6 text-center sm:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-6 sm:justify-start">
                <div className="h-0.5 w-16 bg-linear-to-r from-brand-green to-brand-blue" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-green">about kollab</h4>
              </div>
              <h1 className="text-4xl font-bold text-brand-navy sm:text-5xl md:text-6xl">
                Grow Through Collaboration<span className="text-brand-green">.</span>
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                KOLLAB adalah Human Collaboration Ecosystem untuk learner, creator, profesional, dan business builder yang ingin bertumbuh melalui kolaborasi, koneksi, dan peluang nyata.
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 sm:justify-start">
              <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border border-neutral-200">
                <img src="/images/Main_Icon-removebg-preview.png" alt="" className="size-10" />
              </div>
              <p className="text-lg font-medium text-brand-blue">
                Where Collaboration Creates Growth
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <button className="flex items-center justify-center gap-4 rounded-full bg-linear-to-r from-brand-green to-brand-blue px-6 py-3 text-lg font-medium text-white">
                <span>Join Growth Circle</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button className="flex items-center justify-center gap-4 rounded-full border border-neutral-300 bg-white px-6 py-3 text-lg font-medium text-brand-navy">
                <span>Explore Creator Class</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full">
            <img src="/images/Frame 3.png" alt="" className="h-full w-full object-cover" />
          </div>
        </section>
      </div>

      <div className="w-full bg-brand-grey">
        <section className="mx-auto grid max-w-360 gap-10 px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-12 lg:py-24">
          <div className="flex items-center justify-center">
            <img src="/images/p.png" alt="" className="w-full max-w-[440px] object-contain p-2 sm:p-6" />
          </div>
          <div className="flex flex-col items-start justify-center space-y-8 text-center sm:text-left">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-brand-green tracking-widest uppercase">
                Why We Exist
              </h4>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Banyak orang ingin berkembang, tapi sering berjalan sendiri.
              </h2>
              <p className="font-medium leading-relaxed text-slate-600">
                Banyak learner, creator, profesional, dan business builder ingin naik level, tapi sering bingung harus mulai dari mana, tidak punya circle yang supportif, atau merasa networking terlalu kaku. KOLLAB hadir untuk membuat growth terasa lebih human, sehat, dan meaningful.
              </p>
            </div>
            <div ref={whyExistCardsRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyExistCards.map((card) => (
                <div
                  key={card.id}
                  className={`why-exist-card flex items-center gap-4 group bg-white border-2 p-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${card.border}`}
                >
                  <div className={`size-16 rounded-xl ${card.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <div className="">
                    <h3 className="text-lg font-bold text-brand-navy">{card.title}</h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center pt-8 border-t border-slate-200/50">
              <p className="text-sm font-bold text-slate-600">
                <span className="text-brand-green">Growth tidak harus dibangun sendirian.</span>
              </p>
            </div>
          </div>
        </section>
      </div>

      <section ref={statsSectionRef} className="mx-auto max-w-360 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24 lg:px-12">
        <div className="grid h-full items-center gap-12 lg:grid-cols-12">
          {/* Left Side - Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header with Logo */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="15" y="10" width="18" height="80" rx="4" fill="#34B26A" />
                  <path d="M40,50 L75,15 C78,12 83,14 83,18 L83,40 L58,62 L40,50 Z" fill="#21A6A6" />
                  <path d="M48,58 L80,90 C83,93 88,91 88,87 L88,65 L62,45 L48,58 Z" fill="#2777C9" />
                </svg>
              </div>
              <span className="text-sm font-bold text-slate-600 tracking-wide">Grow Through Collaboration</span>
            </div>

            {/* Green Line */}
            <div className="w-12 h-1 bg-brand-green rounded-full" />

            {/* Main Heading */}
            <h2 className="text-4xl md:text-6xl font-black text-brand-navy leading-tight tracking-tight">
              Where<br />Collaboration<br />Creates <span className="text-brand-green">Growth</span>
            </h2>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed font-medium text-base max-w-lg">
              KOLLAB percaya bahwa growth tidak hanya datang dari usaha sendiri, tapi juga dari ruang yang tepat, koneksi yang sehat, insight baru, dan peluang kolaborasi.
            </p>

            {/* Bottom Connected Icons */}
            <div className="flex items-center gap-6 pt-8">
              <div className="w-12 h-12 rounded-full border-2 border-brand-green flex items-center justify-center bg-brand-green/10">
                <Users className="w-6 h-6 text-brand-green" />
              </div>
              <div className="flex-1 h-0.5 border border-dashed border-slate-300" />
              <div className="w-12 h-12 rounded-full border-2 border-brand-teal flex items-center justify-center bg-brand-teal/10">
                <Share2 className="w-6 h-6 text-brand-teal" />
              </div>
              <div className="flex-1 h-0.5 border border-dashed border-slate-300" />
              <div className="w-12 h-12 rounded-full border-2 border-brand-blue flex items-center justify-center bg-brand-blue/10">
                <Rocket className="w-6 h-6 text-brand-blue" />
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Diagram */}
          <div className="lg:col-span-6 h-full flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center p-4">

              {/* Circular Connecting Lines */}
              <div className="absolute w-[75%] h-[75%] border-2 border-dashed border-slate-200 rounded-full animate-spin [animation-duration:60s]" />

              {/* Decorative Dots */}
              <div className="absolute w-[85%] h-[85%] flex items-center justify-center pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1.5 h-1.5 rounded-full bg-brand-green/30" />
                <div className="absolute top-1/4 left-0 w-1 h-1 rounded-full bg-brand-teal/30" />
                <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-brand-blue/30" />
                <div className="absolute right-0 top-1/2 w-1 h-1 rounded-full bg-brand-green/30" />
                <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-brand-teal/30" />
                <div className="absolute bottom-1/4 left-0 w-1 h-1 rounded-full bg-brand-blue/30" />
              </div>

              {/* Central spinning logo */}
              <div className="absolute w-24 h-24 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center z-10 transition-transform duration-500 hover:scale-110">
                <img src="/public/images/Main_Icon-removebg-preview.png" alt="" className="w-full h-full p-4" />
              </div>

              {/* Node 1: People (Top) */}
              <button
                onMouseEnter={() => setActiveStar(1)}
                onMouseLeave={() => setActiveStar(null)}
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-3xl border-2 bg-white flex flex-col items-center justify-center p-4 text-center transition-all duration-300 shadow-lg ${activeStar === 1 ? 'scale-110 border-brand-green shadow-brand-green/30' : 'border-slate-200'
                  }`}
              >
                <div className="w-7 h-7 text-brand-green mb-2 flex items-center justify-center">
                  <Users className="w-7 h-7" />
                </div>
                <span className="text-sm font-bold text-brand-navy">People</span>
                <div className="w-1 h-1 bg-brand-green rounded-full mx-auto mt-1" />
              </button>

              {/* Node 2: Ideas (Bottom-Left) */}
              <button
                onMouseEnter={() => setActiveStar(2)}
                onMouseLeave={() => setActiveStar(null)}
                className={`absolute bottom-6 left-6 w-28 h-28 rounded-3xl border-2 bg-white flex flex-col items-center justify-center p-4 text-center transition-all duration-300 shadow-lg ${activeStar === 2 ? 'scale-110 border-brand-teal shadow-brand-teal/30' : 'border-slate-200'
                  }`}
              >
                <div className="w-7 h-7 text-brand-teal mb-2 flex items-center justify-center">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-sm font-bold text-brand-navy">Ideas</span>
                <div className="w-1 h-1 bg-brand-teal rounded-full mx-auto mt-1" />
              </button>

              {/* Node 3: Opportunities (Bottom-Right) */}
              <button
                onMouseEnter={() => setActiveStar(3)}
                onMouseLeave={() => setActiveStar(null)}
                className={`absolute bottom-6 right-6 w-28 h-28 rounded-3xl border-2 bg-white flex flex-col items-center justify-center p-4 text-center transition-all duration-300 shadow-lg ${activeStar === 3 ? 'scale-110 border-brand-blue shadow-brand-blue/30' : 'border-slate-200'
                  }`}
              >
                <div className="w-7 h-7 text-brand-blue mb-2 flex items-center justify-center">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-sm font-bold text-brand-navy">Opportunities</span>
                <div className="w-1 h-1 bg-brand-blue rounded-full mx-auto mt-1" />
              </button>
            </div>

            {/* Bottom Footer Text */}
            <div className="absolute -bottom-6 flex items-center justify-center gap-2 text-center">
              <p className="text-xs md:text-sm font-medium text-slate-600">
                Connected in one <span className="font-bold text-brand-teal">Human Collaboration Ecosystem</span>.
              </p>
              <div className="w-5 h-5 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="15" y="10" width="18" height="80" rx="4" fill="#34B26A" />
                  <path d="M40,50 L75,15 C78,12 83,14 83,18 L83,40 L58,62 L40,50 Z" fill="#21A6A6" />
                  <path d="M48,58 L80,90 C83,93 88,91 88,87 L88,65 L62,45 L48,58 Z" fill="#2777C9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="border-y border-slate-200/50 bg-brand-grey py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8 lg:px-12">

          <div className="mb-12 max-w-3xl space-y-4 sm:mb-16">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-green">Brand Idea</h4>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Small Pieces &rarr; One System &rarr; Growth
            </h2>
            <p className="text-base text-slate-600 font-medium leading-relaxed">
              KOLLAB dibangun dari gagasan bahwa pertumbuhan tidak terjadi sendirian. Individu, ide, skill, pengalaman, dan peluang yang awalnya terpisah akan menjadi lebih kuat ketika disatukan dalam sistem kolaboratif yang sehat.
            </p>
          </div>

          <div ref={pipelineRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {pipelineSteps.map((step, idx) => (
              <div
                key={idx}
                className={`pipeline-card relative bg-white border rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${step.color} shadow-sm hover:shadow-lg`}
              >
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-400">
                  {step.step}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-brand-navy">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {step.subtags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold border border-slate-200/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {idx < 2 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-10 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow border border-slate-100 items-center justify-center text-slate-400">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-sm font-bold text-slate-400 max-w-2xl mx-auto leading-relaxed border-t border-slate-200/50 pt-8">
            <span className="text-brand-green">Ketika setiap bagian terhubung dalam sistem yang tepat, kolaborasi menciptakan nilai nyata.</span> KOLLAB mengubah potensi terpisah menjadi pertumbuhan bersama.
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-360 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24 lg:px-12">
        <div className="mb-12 max-w-3xl space-y-4 sm:mb-16">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-blue">Brand Personality</h4>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
            Kepribadian Brand KOLLAB.
          </h2>
          <p className="text-slate-600 font-medium leading-relaxed">
            Kepribadian brand KOLLAB harus terasa dekat, modern, dan cukup profesional untuk dipercaya, agar terasa approachable tanpa kehilangan kualitas.
          </p>
        </div>

        <div ref={personalityRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {personalities.map((trait, idx) => (
            <div
              key={idx}
              className="personality-card group bg-white border border-slate-200/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-300"
            >
              <div className={`w-12 h-12 rounded-xl ${trait.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {trait.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-3">{trait.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                {trait.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default About
