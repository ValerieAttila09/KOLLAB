import { ArrowUpRight, Send, Globe, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-brand-navy">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-green via-brand-teal to-brand-blue p-2">
                <div className="h-full w-full rounded-full border border-white/60" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">kollab.</span>
            </Link>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
              KOLLAB adalah ruang kolaboratif untuk belajar, bertemu, berkolaborasi, dan bertumbuh bersama.
            </p>
            <div className="mt-6 flex gap-3">
              {[Globe, Mail, MessageCircle].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-brand-green hover:text-brand-green"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8">
            <h3 className="text-xl font-bold text-white">Partner With KOLLAB</h3>
            <p className="mt-3 text-sm leading-8 text-slate-400">
              Kami terbuka untuk kolaborasi komunitas, workshop, program learning, dan partner yang selaras.
            </p>
            <a href="mailto:hello@kollab.id" className="mt-6 inline-flex items-center font-semibold text-brand-green">
              hello@kollab.id
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/programs#growth-circle" className="inline-flex items-center rounded-full bg-brand-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-green/90">
                Join Growth Circle
                <Send className="ml-2 h-4 w-4" />
              </a>
              <a href="/about" className="inline-flex items-center rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand-teal hover:text-brand-teal">
                About Us
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} KOLLAB. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/about" className="transition hover:text-brand-green">About</Link>
              <Link to="/programs" className="transition hover:text-brand-green">Programs</Link>
              <Link to="/contact" className="transition hover:text-brand-green">Contact</Link>
            </div>
          </div>
      </div>
    </footer>
  )
}

export default Footer
