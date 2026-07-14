import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const registerGsap = () => {
  gsap.registerPlugin(ScrollTrigger)
}

export const animateHero = ({
  headline,
  body,
  ctas,
  visual,
}: {
  headline: HTMLElement | null
  body: HTMLElement | null
  ctas: HTMLElement | null
  visual: HTMLElement | null
}) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    if (headline) gsap.set(headline, { autoAlpha: 1, y: 0 })
    if (body) gsap.set(body, { autoAlpha: 1, y: 0 })
    if (ctas) gsap.set(ctas, { autoAlpha: 1, y: 0 })
    if (visual) gsap.set(visual, { autoAlpha: 1, scale: 1 })
    return null
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(headline, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8 })
    .fromTo(body, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.45')
    .fromTo(ctas, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15 }, '-=0.3')
    .fromTo(visual, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 0.9 }, '-=0.45')

  return tl
}

export const revealOnScroll = (elements: Array<HTMLElement | null>, root: HTMLElement | null) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    elements.forEach((element) => {
      if (element) gsap.set(element, { autoAlpha: 1, y: 0 })
    })
    return
  }

  elements.forEach((element) => {
    if (!element) return
    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )
  })

  if (root) {
    ScrollTrigger.refresh()
  }
}
