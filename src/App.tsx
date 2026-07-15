import { useEffect } from 'react'
import { MessageCircleMore } from 'lucide-react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './common/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Programs from './pages/Programs'

const whatsappNumber = '6281234567890'
const whatsappMessage = encodeURIComponent(
  'Halo KOLLAB, saya ingin bertanya mengenai kolaborasi / komunitas / program yang tersedia. Saya sedang mencari informasi lebih lanjut.'
)
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

// Scroll to top on route change for seamless page transition feel
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white font-sans text-brand-navy selection:bg-brand-green selection:text-white">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact KOLLAB on WhatsApp"
          className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_40px_rgba(37,211,102,0.45)] sm:h-16 sm:w-16"
        >
          <MessageCircleMore className="h-7 w-7 sm:h-8 sm:w-8" />
        </a>
      </div>
    </Router>
  )
}

export default App