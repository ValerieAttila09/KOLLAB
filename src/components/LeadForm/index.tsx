import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface LeadFormProps {
  title: string
  description: string
}

const LeadForm = ({ title, description }: LeadFormProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('Growth Circle')
  const [status, setStatus] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload = { name, email, interest }

    try {
      await fetch('/api/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus('Terima kasih! Kami akan menghubungi kamu segera.')
      setName('')
      setEmail('')
      setInterest('Growth Circle')
    } catch {
      setStatus('Maaf, ada gangguan. Coba lagi nanti.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm" aria-label="Lead form">
      <h3 className="text-2xl font-bold text-brand-navy">{title}</h3>
      <p className="mt-3 text-base leading-8 text-slate-600">{description}</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-semibold text-brand-navy">
          Nama
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            aria-label="Nama"
            className="mt-2 w-full rounded-full border border-slate-200 bg-brand-grey px-4 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </label>
        <label className="block text-sm font-semibold text-brand-navy">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            aria-label="Email"
            className="mt-2 w-full rounded-full border border-slate-200 bg-brand-grey px-4 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
          />
        </label>
      </div>
      <label className="mt-5 block text-sm font-semibold text-brand-navy">
        Kebutuhan
        <select
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          aria-label="Interest"
          className="mt-2 w-full rounded-full border border-slate-200 bg-brand-grey px-4 py-3 text-sm text-brand-navy outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
        >
          <option>Growth Circle</option>
          <option>Creator Class</option>
          <option>Partner</option>
        </select>
      </label>
      <button
        type="submit"
        className="mt-8 inline-flex items-center rounded-full bg-brand-navy px-6 py-3 font-semibold text-white transition hover:bg-brand-green"
      >
        Submit
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
      {status ? <p className="mt-4 text-sm font-medium text-brand-green">{status}</p> : null}
    </form>
  )
}

export default LeadForm
