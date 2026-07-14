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
    { name: 'Ecosystem', path: '/ecosystem' },
    { name: 'Blog', path: '/blog' },
  ]


  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'py-4 bg-white/90 backdrop-blur-md shadow-md border-b border-slate-100'
        : 'py-6 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Brand Logo & Name */}
        <div ref={logoRef} className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2 group">
            {/* Custom SVG K-Ascend Icon so it is crisp and high resolution */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-500 group-hover:scale-110">
                {/* Left vertical bars */}
                <rect x="15" y="10" width="18" height="80" rx="4" fill="#34B26A" />
                {/* Middle connector/arrows pointing right-up */}
                <path d="M40,50 L75,15 C78,12 83,14 83,18 L83,40 L58,62 L40,50 Z" fill="#21A6A6" />
                <path d="M48,58 L80,90 C83,93 88,91 88,87 L88,65 L62,45 L48,58 Z" fill="#2777C9" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-brand-navy">
              kollab<span className="text-brand-green">.</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div ref={menuLinksRef} className="hidden md:flex items-center space-x-8 font-medium">
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
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="hidden md:flex items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/ecosystem"
              className="flex items-center space-x-2 px-5 py-2.5 bg-brand-navy text-white font-medium text-sm rounded-full transition-all duration-300 hover:bg-brand-green hover:shadow-[0_4px_20px_rgba(52,178,106,0.3)] hover:-translate-y-0.5 group"
            >
              <span>Join Ecosystem</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-navy hover:text-brand-green transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 p-8 flex flex-col md:hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold text-brand-navy">kollab.</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-brand-navy hover:text-brand-green transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 text-lg font-medium mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-item py-1 transition-colors ${isActive(link.path) ? 'text-brand-green font-bold' : 'text-slate-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mobile-nav-item mt-auto space-y-4">
            <Link
              to="/ecosystem"
              className="flex items-center justify-center space-x-2 w-full py-3 bg-brand-navy text-white text-center font-medium rounded-full transition-all hover:bg-brand-green"
            >
              <span>Join Ecosystem</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar