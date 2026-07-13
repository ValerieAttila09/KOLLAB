import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Calendar, MapPin, Check, Mail, Phone, User as UserIcon, Loader2, X, FileText, ArrowRight } from 'lucide-react'

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}

const Events = () => {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  
  // RSVP Form States
  const [isRsvpOpen, setIsRsvpOpen] = useState(false)
  const [rsvpName, setRsvpName] = useState('')
  const [rsvpEmail, setRsvpEmail] = useState('')
  const [rsvpPhone, setRsvpPhone] = useState('')
  const [rsvpNotes, setRsvpNotes] = useState('')
  const [submittingRsvp, setSubmittingRsvp] = useState(false)
  
  // RSVP Success State
  const [rsvpSuccess, setRsvpSuccess] = useState(false)
  const [devEmailLink, setDevEmailLink] = useState<string | null>(null)
  const [rsvpError, setRsvpError] = useState<string | null>(null)

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events')
        if (res.ok) {
          const data = await res.json()
          setEvents(data)
        }
      } catch (err) {
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Open RSVP Form Modal
  const handleOpenRsvp = (event: Event) => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login')
      return
    }
    setSelectedEvent(event)
    setRsvpName(user.name)
    setRsvpEmail(user.email)
    setRsvpPhone('')
    setRsvpNotes('')
    setRsvpError(null)
    setRsvpSuccess(false)
    setDevEmailLink(null)
    setIsRsvpOpen(true)
  }

  // Handle RSVP Submit
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEvent || !token) return

    setSubmittingRsvp(true)
    setRsvpError(null)

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          name: rsvpName,
          email: rsvpEmail,
          phone: rsvpPhone,
          notes: rsvpNotes
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit RSVP. Please try again.')
      }

      setRsvpSuccess(true)
      if (data.previewUrl) {
        setDevEmailLink(data.previewUrl)
      }
    } catch (err: any) {
      setRsvpError(err.message || 'An error occurred during RSVP.')
    } finally {
      setSubmittingRsvp(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-green font-bold text-xs uppercase tracking-widest px-3 py-1 bg-brand-green/10 rounded-full">
            Programs & events
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy mt-4 tracking-tight leading-tight">
            Explore KOLLAB <span className="text-gradient-green-blue">Events</span>
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg">
            Follow programs, workshops, and networking events designed to accelerate your growth and ecosystem collaborations.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-brand-green" />
            <p className="text-slate-500 mt-4 text-sm font-medium">Retrieving scheduled events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <p className="text-slate-400 font-medium">No events currently scheduled.</p>
            <p className="text-xs text-slate-400 mt-1">Check back later or launch server.ts to auto-seed default events.</p>
          </div>
        ) : (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div 
                key={event.id}
                className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Event Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-slate-200 text-slate-400 font-bold">
                      KOLLAB
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Event Info */}
                <div className="flex-grow p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy tracking-tight line-clamp-1 group-hover:text-brand-green transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-3 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-50 space-y-3">
                    {/* Date */}
                    <div className="flex items-center text-xs text-slate-500 font-semibold space-x-2">
                      <Calendar className="w-4 h-4 text-brand-teal" />
                      <span>{formatDate(event.date)} &bull; {formatTime(event.date)}</span>
                    </div>
                    {/* Location */}
                    <div className="flex items-center text-xs text-slate-500 font-semibold space-x-2">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>

                    {/* RSVP Button */}
                    <button
                      onClick={() => handleOpenRsvp(event)}
                      className="flex items-center justify-center w-full mt-4 py-3 bg-brand-navy hover:bg-brand-green text-white text-sm font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg group-hover:bg-brand-navy group-hover:hover:bg-brand-green cursor-pointer"
                    >
                      {user ? 'RSVP Now' : 'Sign In to RSVP'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RSVP FORM MODAL */}
        {isRsvpOpen && selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsRsvpOpen(false)}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8 z-10 transition-all border border-slate-100">
              
              {/* Close Button */}
              <button 
                onClick={() => setIsRsvpOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Form Success State */}
              {rsvpSuccess ? (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 text-brand-green rounded-full mb-6">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy">RSVP Request Sent!</h3>
                  <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                    Kami telah mengirimkan tautan konfirmasi ke email Anda: <strong>{rsvpEmail}</strong>. 
                    Silakan buka email Anda dan lakukan konfirmasi agar pendaftaran Anda selesai dan Anda diarahkan ke Dashboard.
                  </p>
                  
                  {devEmailLink && (
                    <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-left">
                      <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Developer Sandbox Tools:</p>
                      <p className="text-xs text-amber-700 mt-1">
                        Mock email generated successfully! Since SMTP is not configured, you can confirm directly using the button below:
                      </p>
                      <a 
                        href={devEmailLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Open Mock Mail Box <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => setIsRsvpOpen(false)}
                    className="w-full mt-8 py-3.5 bg-brand-navy hover:bg-brand-green text-white font-semibold rounded-2xl transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Form Inputs */
                <div>
                  <div className="mb-6">
                    <span className="text-brand-green font-bold text-xs uppercase tracking-wider block">RSVP Form</span>
                    <h3 className="text-2xl font-bold text-brand-navy tracking-tight mt-1">
                      Join: {selectedEvent.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Event Date: {formatDate(selectedEvent.date)} at {formatTime(selectedEvent.date)}
                    </p>
                  </div>

                  {rsvpError && (
                    <div className="p-4 mb-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs">
                      {rsvpError}
                    </div>
                  )}

                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    {/* User Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Your Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <UserIcon className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Confirmation Email</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={rsvpEmail}
                          onChange={(e) => setRsvpEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 leading-none">We will send a confirmation link to this address.</span>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          required
                          value={rsvpPhone}
                          onChange={(e) => setRsvpPhone(e.target.value)}
                          placeholder="e.g. 08123456789"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Notes Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Special Notes (Optional)</label>
                      <div className="relative">
                        <span className="absolute top-3 left-4 text-slate-400">
                          <FileText className="w-4 h-4" />
                        </span>
                        <textarea
                          rows={3}
                          value={rsvpNotes}
                          onChange={(e) => setRsvpNotes(e.target.value)}
                          placeholder="Dietary requirements, accessibility needs, etc."
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Notice */}
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-[11px] leading-relaxed">
                      💡 <strong>Pemberitahuan:</strong> Pendaftaran ini masih berstatus <em>PENDING</em> setelah dikirim. Anda wajib melakukan konfirmasi via tautan yang dikirimkan ke email Anda untuk mengaktifkan status kepesertaan.
                    </div>

                    {/* Form Buttons */}
                    <div className="flex space-x-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsRsvpOpen(false)}
                        className="w-1/3 py-3 border border-slate-200 text-slate-500 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submittingRsvp}
                        className="flex-grow py-3 bg-brand-navy hover:bg-brand-green text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center cursor-pointer"
                      >
                        {submittingRsvp ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Submit RSVP'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Events
