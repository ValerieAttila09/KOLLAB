import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './common/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Ecosystem from './pages/Ecosystem'
import Blog from './pages/Blog'

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
      <div className="flex flex-col min-h-screen bg-white selection:bg-brand-green selection:text-white font-sans text-brand-navy">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App