import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Calendar as CalendarIcon, MapPin, CheckCircle, Clock, AlertTriangle, ChevronLeft, ChevronRight, X, Sparkles, LogOut } from 'lucide-react'

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
}

interface RSVP {
  id: number;
  eventId: number;
  status: string; // PENDING, CONFIRMED
  event: Event;
}

const Dashboard = () => {
  const { user, token, logout, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [availableEvents, setAvailableEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  
  // Confirmation Toast State
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'info'>('success')

  // Calendar States
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDayEvents, setSelectedDayEvents] = useState<any[] | null>(null)
  const [selectedDayStr, setSelectedDayStr] = useState<string | null>(null)

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  // Fetch Dashboard Data (RSVPs + Available Events)
  useEffect(() => {
    if (!token) return

    const fetchData = async () => {
      try {
        // Fetch User RSVPs
        const rsvpsRes = await fetch('/api/user/rsvps', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        let userRsvps: RSVP[] = []
        if (rsvpsRes.ok) {
          userRsvps = await rsvpsRes.json()
          setRsvps(userRsvps)
        }

        // Fetch All Events to display upcoming ones
        const eventsRes = await fetch('/api/events')
        if (eventsRes.ok) {
          const allEvents: Event[] = await eventsRes.json()
          
          // Available events are events the user hasn't RSVP'd to yet
          const rsvpedEventIds = new Set(userRsvps.map(r => r.eventId))
          const unRsvped = allEvents.filter(e => !rsvpedEventIds.has(e.id))
          setAvailableEvents(unRsvped)
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [token])

  // Process Search Params for Confirmation Redirect Message
  useEffect(() => {
    const status = searchParams.get('rsvp_confirmed')
    if (status === 'true') {
      setToastType('success')
      setToastMessage('Selamat! RSVP Anda telah dikonfirmasi melalui email. Status kepesertaan Anda sekarang aktif.')
      setShowToast(true)
      // Clear query params
      setSearchParams({})
    } else if (status === 'already') {
      setToastType('info')
      setToastMessage('RSVP Anda sudah pernah dikonfirmasi sebelumnya.')
      setShowToast(true)
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Clock className="w-8 h-8 animate-spin text-brand-green" />
      </div>
    )
  }

  // --- CALENDAR GENERATION LOGIC ---
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDayIndex = getFirstDayOfMonth(year, month) // 0 is Sunday, 1 is Monday, etc.

  const prevMonthDays = getDaysInMonth(year, month - 1)

  // Months labels
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDayEvents(null)
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDayEvents(null)
  }

  // Build calendar cells
  const cells: { day: number; isCurrentMonth: boolean; dateString: string }[] = []

  // Preceding month blank spaces
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    const m = month === 0 ? 11 : month - 1
    const y = month === 0 ? year - 1 : year
    cells.push({
      day: d,
      isCurrentMonth: false,
      dateString: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    })
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isCurrentMonth: true,
      dateString: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    })
  }

  // Next month days padding
  const totalCells = cells.length
  const remaining = 42 - totalCells // 6 weeks grid (42 cells)
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1
    const y = month === 11 ? year + 1 : year
    cells.push({
      day: d,
      isCurrentMonth: false,
      dateString: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    })
  }

  // Match cells with events
  const getEventsForDate = (dateString: string) => {
    const cellDate = new Date(dateString)
    cellDate.setHours(0, 0, 0, 0)

    const list: { type: 'rsvp' | 'available'; status?: string; event: Event }[] = []

    // Check RSVPs
    rsvps.forEach(rsvp => {
      const eDate = new Date(rsvp.event.date)
      eDate.setHours(0, 0, 0, 0)
      if (cellDate.getTime() === eDate.getTime()) {
        list.push({
          type: 'rsvp',
          status: rsvp.status,
          event: rsvp.event
        })
      }
    })

    // Check Available Events
    availableEvents.forEach(event => {
      const eDate = new Date(event.date)
      eDate.setHours(0, 0, 0, 0)
      if (cellDate.getTime() === eDate.getTime()) {
        list.push({
          type: 'available',
          event
        })
      }
    })

    return list
  }

  const handleCellClick = (dateString: string, dayEvents: any[]) => {
    if (dayEvents.length > 0) {
      setSelectedDayEvents(dayEvents)
      const d = new Date(dateString)
      setSelectedDayStr(d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }))
    } else {
      setSelectedDayEvents(null)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Success Confirmation Toast Banner */}
        {showToast && (
          <div className={`flex items-start justify-between p-5 border rounded-3xl shadow-xl transition-all animate-bounce ${
            toastType === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <div className="flex space-x-3">
              <CheckCircle className={`w-6 h-6 flex-shrink-0 ${toastType === 'success' ? 'text-emerald-600' : 'text-blue-600'}`} />
              <div>
                <p className="font-bold text-sm">Notifikasi Konfirmasi</p>
                <p className="text-xs mt-1 leading-relaxed">{toastMessage}</p>
              </div>
            </div>
            <button onClick={() => setShowToast(false)} className="p-1 hover:bg-slate-100/50 rounded-full">
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="bg-gradient-green-blue text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full filter blur-2xl" />
          <div className="z-10">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">User Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
              Hello, {user.name}!
            </h1>
            <p className="text-white/80 text-sm mt-2 max-w-xl">
              Welcome back to KOLLAB workspace. Manage your registered programs, check pending confirmations, or discover upcoming tech events below.
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-6 md:mt-0 flex items-center space-x-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-2xl transition-all cursor-pointer z-10"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Loading Spinner for API Data */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <Loader2 className="w-8 h-8 animate-spin text-brand-green" />
            <p className="text-slate-400 mt-2 text-xs">Loading schedules and registration details...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: User RSVPs and Registered Programs */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Followed Programs Section */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-brand-navy">My Followed Programs</h2>
                    <p className="text-xs text-slate-400">Programs you have registered RSVP for</p>
                  </div>
                  <span className="text-xs font-bold bg-brand-navy/5 text-brand-navy px-3 py-1.5 rounded-full">
                    {rsvps.length} Events
                  </span>
                </div>

                {rsvps.length === 0 ? (
                  <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-sm text-slate-500 font-medium">You haven't RSVP'd to any events yet.</p>
                    <button 
                      onClick={() => navigate('/events')}
                      className="mt-3 text-xs font-bold text-brand-green hover:underline cursor-pointer"
                    >
                      Browse Available Events &rarr;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rsvps.map((rsvp) => (
                      <div 
                        key={rsvp.id}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-slate-100 hover:border-slate-200 rounded-2xl transition-all"
                      >
                        <div className="space-y-1.5 max-w-md">
                          <div className="flex items-center space-x-2">
                            {rsvp.status === 'CONFIRMED' ? (
                              <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                                <AlertTriangle className="w-3 h-3 mr-1" /> Pending Email Confirm
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-brand-navy text-base leading-tight">
                            {rsvp.event.title}
                          </h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-semibold">
                            <span className="flex items-center"><CalendarIcon className="w-3.5 h-3.5 mr-1 text-slate-400" /> {new Date(rsvp.event.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {rsvp.event.location}</span>
                          </div>
                        </div>

                        {rsvp.status === 'PENDING' && (
                          <div className="mt-3 md:mt-0 p-3 bg-amber-50 border border-amber-100 rounded-xl max-w-xs text-[10px] text-amber-800 leading-normal">
                            📧 Silakan konfirmasi RSVP Anda melalui link yang dikirimkan ke email Anda (<strong>{rsvp.email}</strong>).
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended/Available Programs Section */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-brand-navy">Available Programs</h2>
                    <p className="text-xs text-slate-400">Discover new events to join</p>
                  </div>
                  <button 
                    onClick={() => navigate('/events')} 
                    className="text-xs font-bold text-brand-teal hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                {availableEvents.length === 0 ? (
                  <p className="text-slate-400 text-xs py-4 text-center font-medium">No other available events right now.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableEvents.slice(0, 4).map((event) => (
                      <div 
                        key={event.id}
                        onClick={() => navigate('/events')}
                        className="p-4 border border-slate-100 hover:border-brand-green/30 hover:bg-slate-50/50 rounded-2xl cursor-pointer transition-all"
                      >
                        <h4 className="font-bold text-brand-navy text-sm line-clamp-1">{event.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{event.description}</p>
                        <div className="flex items-center mt-3 text-[10px] text-slate-500 font-semibold space-x-1">
                          <CalendarIcon className="w-3 h-3 text-brand-teal" />
                          <span>{new Date(event.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: Calendar Scheduling */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Custom Month Calendar Card */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-brand-navy flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2 text-brand-green" /> Program Calendar
                    </h2>
                    <span className="text-xs text-slate-400 font-semibold capitalize">
                      {monthNames[month]} {year}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <button 
                      onClick={handlePrevMonth} 
                      className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-600" />
                    </button>
                    <button 
                      onClick={handleNextMonth} 
                      className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Days of Week Label */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((cell, index) => {
                    const dayEvents = getEventsForDate(cell.dateString)
                    const hasEvents = dayEvents.length > 0
                    
                    // Style indicators
                    let hasConfirmed = false
                    let hasPending = false
                    let hasAvailable = false

                    dayEvents.forEach(de => {
                      if (de.type === 'rsvp') {
                        if (de.status === 'CONFIRMED') hasConfirmed = true;
                        else hasPending = true;
                      } else {
                        hasAvailable = true;
                      }
                    })

                    let highlightClass = ""
                    let dotColor = ""

                    if (hasConfirmed) {
                      highlightClass = "bg-emerald-50 text-emerald-800 font-bold border border-emerald-200"
                      dotColor = "bg-emerald-500"
                    } else if (hasPending) {
                      highlightClass = "bg-amber-50 text-amber-800 font-bold border border-amber-200"
                      dotColor = "bg-amber-500"
                    } else if (hasAvailable) {
                      highlightClass = "bg-blue-50/70 text-blue-800 border border-blue-100"
                      dotColor = "bg-blue-500"
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleCellClick(cell.dateString, dayEvents)}
                        disabled={!hasEvents}
                        className={`h-11 flex flex-col items-center justify-between p-1 rounded-xl transition-all text-xs font-semibold relative ${
                          cell.isCurrentMonth ? 'text-brand-navy' : 'text-slate-300'
                        } ${highlightClass} ${hasEvents ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
                      >
                        <span>{cell.day}</span>
                        {/* Dot indicator */}
                        {hasEvents && (
                          <span className={`w-1.5 h-1.5 rounded-full ${dotColor} mb-0.5`} />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex justify-between items-center mt-6 pt-5 border-t border-slate-50 text-[10px] text-slate-500 font-semibold">
                  <div className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5" /> Confirmed RSVP
                  </div>
                  <div className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5" /> Pending RSVP
                  </div>
                  <div className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5" /> Other Event
                  </div>
                </div>

                {/* Selected Day Details Panel */}
                {selectedDayEvents && (
                  <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 relative">
                    <button 
                      onClick={() => setSelectedDayEvents(null)} 
                      className="absolute top-2 right-2 p-1 hover:bg-slate-200 rounded-full"
                    >
                      <X className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <h4 className="text-xs font-bold text-brand-teal uppercase tracking-wider">
                      Schedule on {selectedDayStr}
                    </h4>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {selectedDayEvents.map((de, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">
                              {de.type === 'rsvp' ? 'Followed Event' : 'Available Event'}
                            </span>
                            {de.type === 'rsvp' && (
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                de.status === 'CONFIRMED' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                              }`}>
                                {de.status}
                              </span>
                            )}
                          </div>
                          <h5 className="text-sm font-bold text-brand-navy leading-tight">{de.event.title}</h5>
                          <p className="text-[10px] text-slate-500 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1 text-slate-400" /> {new Date(de.event.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-[10px] text-slate-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-slate-400" /> {de.event.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard
