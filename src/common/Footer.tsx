import { Link } from 'react-router-dom'
import { Send, ArrowUpRight } from 'lucide-react'

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for subscribing to KOLLAB newsletter!')
  }

  return (
    <footer className="bg-brand-navy text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Upper Footer: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/public/images/Main_Icon-removebg-preview.png" alt="" className="size-10 p-4" />
              <span className="text-2xl font-bold tracking-tight text-white">
                kollab<span className="text-brand-green">.</span>
              </span>
            </Link>
            
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-medium">
              KOLLAB adalah ruang kolaboratif modern yang dirancang untuk mempertemukan individu, kreator, profesional, dan bisnis dalam satu ekosistem pertumbuhan.
            </p>
            
            <div className="flex space-x-4">
              {/* Custom Twitter / X SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-450 hover:bg-brand-green hover:text-white transition-colors duration-300" aria-label="Twitter X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Custom LinkedIn SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-450 hover:bg-brand-blue hover:text-white transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* Custom Instagram SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-450 hover:bg-brand-teal hover:text-white transition-colors duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Newsletter Form */}
          <div className="lg:col-span-7 lg:pl-12 space-y-6">
            <h4 className="text-lg font-bold text-white tracking-wide">Stay Connected</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium">
              Dapatkan insight kolaboratif terbaru, update event komunitas, dan peluang networking eksklusif langsung di inbox kamu.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex max-w-md relative">
              <input
                type="email"
                placeholder="Masukkan email kamu"
                required
                className="w-full px-5 py-3 bg-slate-800 text-white placeholder-slate-500 rounded-full border border-slate-700 focus:outline-none focus:border-brand-green text-sm pr-14"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-2 bg-brand-green hover:bg-brand-green/90 text-white rounded-full transition-all duration-300 focus:outline-none shadow-md group"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>

        {/* Lower Footer: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          
          {/* Link Col 1 */}
          <div className="space-y-4">
            <h5 className="text-white font-bold text-sm tracking-widest uppercase">Halaman</h5>
            <ul className="space-y-2 text-sm text-slate-450 font-medium">
              <li><Link to="/" className="hover:text-brand-green transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-green transition-colors">About Us</Link></li>
              <li><Link to="/ecosystem" className="hover:text-brand-green transition-colors">Ecosystem</Link></li>
              <li><Link to="/partner" className="hover:text-brand-green transition-colors">Partners & Team</Link></li>
              <li><Link to="/blog" className="hover:text-brand-green transition-colors">Insights Blog</Link></li>
            </ul>
          </div>
          
          {/* Link Col 2 */}
          <div className="space-y-4">
            <h5 className="text-white font-bold text-sm tracking-widest uppercase">Ekosistem</h5>
            <ul className="space-y-2 text-sm text-slate-450 font-medium">
              <li><Link to="/ecosystem" className="hover:text-brand-green transition-colors">Wadah Koneksi</Link></li>
              <li><Link to="/ecosystem" className="hover:text-brand-green transition-colors">Ruang Pembelajaran</Link></li>
              <li><Link to="/ecosystem" className="hover:text-brand-green transition-colors">Ecosystem Pertumbuhan</Link></li>
              <li><Link to="/ecosystem" className="hover:text-brand-green transition-colors">Unique Values</Link></li>
            </ul>
          </div>
          
          {/* Link Col 3 */}
          <div className="space-y-4">
            <h5 className="text-white font-bold text-sm tracking-widest uppercase">Tagline Utama</h5>
            <div className="space-y-2 text-sm text-slate-400 font-medium">
              <p className="font-semibold text-brand-green">Connect.</p>
              <p className="font-semibold text-brand-teal">Collaborate.</p>
              <p className="font-semibold text-brand-blue">Grow.</p>
            </div>
          </div>
          
          {/* Link Col 4 */}
          <div className="space-y-4">
            <h5 className="text-white font-bold text-sm tracking-widest uppercase">Hubungi Kami</h5>
            <ul className="space-y-2 text-sm text-slate-400 font-medium">
              <li className="flex items-center space-x-1">
                <span>hello@kollab.id</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </li>
              <li><span>Jakarta, Indonesia</span></li>
              <li className="pt-2 text-xs text-slate-500 font-medium leading-relaxed">
                Hubungi kami untuk kolaborasi komersial, media partnership, atau keanggotaan institusi.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} KOLLAB. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
