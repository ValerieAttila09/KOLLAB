import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuLinksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Track scrolling to add shadows/shrink height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar slide down
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
      )

      // Logo and menu items staggered fade-in
      gsap.fromTo([logoRef.current, '.nav-item', ctaRef.current],
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Animate mobile menu drawer
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      )
      // Stagger items inside mobile menu
      gsap.fromTo('.mobile-nav-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [isOpen])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    // { name: 'Community', path: '/programs#community-activation' },
    // { name: 'Partnership', path: '/programs#partnership-program' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/programs') {
      return location.pathname === '/programs'
    }
    return location.pathname === path
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-slate-100'
          : 'bg-transparent'
          }`}
      >
        <div className="mx-auto flex min-h-[72px] max-w-360 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Brand Logo & Name */}
          <div ref={logoRef} className="flex items-center space-x-3">
            <Link to="/" className="w-auto">
              <div className="relative w-32 h-18 overflow-hidden">
                <img src="/images/Main_Logo-without_taglines-removebg-preview.png" alt="KOLLAB" className="absolute -translate-y-6 w-30 h-auto" />
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div ref={menuLinksRef} className="hidden items-center space-x-6 font-medium md:flex lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-item relative py-2 text-sm transition-colors duration-200 hover:text-brand-green ${isActive(link.path) ? 'text-brand-green font-semibold' : 'text-slate-600'
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green rounded-full shadow-[0_2px_8px_rgba(52,178,106,0.4)]" />
                )}
              </Link>
            ))}

            <div className="hidden md:block">
              <Link
                to="/programs#growth-circle"
                className="flex items-center space-x-2 px-5 py-2.5 bg-linear-to-r from-brand-green to-brand-blue text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-brand-green hover:shadow-[0_4px_20px_rgba(52,178,106,0.3)] hover:-translate-y-0.5 group"
              >
                <span>Join Growth Circle</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 text-brand-navy transition-colors hover:text-brand-green md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Drawer Navigation Menu */}
      </nav>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] md:hidden" onClick={() => setIsOpen(false)} />
          <div
            ref={mobileMenuRef}
            className="fixed inset-y-0 right-0 z-50 flex w-[88vw] max-w-[320px] flex-col overflow-hidden rounded-l-[2rem] border-l border-slate-200 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xl font-bold text-brand-navy">kollab.</span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 text-brand-navy transition-colors hover:text-brand-green"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-10 flex flex-col gap-2 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`mobile-nav-item rounded-2xl px-3 py-3 transition-all ${isActive(link.path)
                    ? 'bg-brand-green/10 text-brand-green font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-brand-navy'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mobile-nav-item mt-auto space-y-4">
              <Link
                to="/programs#growth-circle"
                className="flex w-full items-center justify-center space-x-2 rounded-full bg-brand-navy py-3.5 text-center font-medium text-white transition-all hover:bg-brand-green"
              >
                <span>Join Growth Circle</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>

  )
}

export default Navbar