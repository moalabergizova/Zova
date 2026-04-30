'use client'

import { useState } from 'react'
import { en } from '@/content/en'

const t = en.contact
const services = en.services.items.map((s) => s.name)

interface ContactFormProps {
  selectedServices: string[]
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>
}

interface FormState {
  name: string
  phone: string
  email: string
  company: string
  message: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '0.5px solid rgba(245,245,243,0.18)',
  padding: '14px 0',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontWeight: 400,
  fontSize: '14px',
  color: '#F5F5F3',
  outline: 'none',
  lineHeight: 1.4,
}

const labelStyle: React.CSSProperties = {
  fontWeight: 400,
  fontSize: '12px',
  letterSpacing: '3px',
  color: '#F5F5F3',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '6px',
  textShadow: '0 0 20px rgba(245,245,243,0.5), 0 0 50px rgba(245,245,243,0.2)',
}

export default function ContactForm({ selectedServices, setSelectedServices }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, services: selectedServices }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || t.error)
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMsg(t.error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-16 px-8" style={{ backgroundColor: '#1E1E1E', position: 'relative', overflow: 'hidden' }}>

      {/* ── Glow orbs ── */}
      <style>{`
        @keyframes contact-glow-breathe {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.65; }
        }
        @keyframes contact-glow-breathe-slow {
          0%, 100% { opacity: 0.8; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* top-left corner glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0,
        width: '520px', height: '420px',
        background: 'radial-gradient(ellipse 100% 100% at 0% 0%, rgba(245,245,243,0.28) 0%, rgba(245,245,243,0.10) 35%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'contact-glow-breathe 4s ease-in-out infinite',
      }} />

      {/* bottom-right corner glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '520px', height: '420px',
        background: 'radial-gradient(ellipse 100% 100% at 100% 100%, rgba(245,245,243,0.28) 0%, rgba(245,245,243,0.10) 35%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        animation: 'contact-glow-breathe 4s ease-in-out infinite',
      }} />

      <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <p style={{ fontWeight: 300, fontSize: '16px', letterSpacing: '3px', color: 'rgba(245,245,243,0.5)', textTransform: 'uppercase', marginBottom: '20px' }}>
          {t.label}
        </p>

        {/* Rule */}
        <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.25)', marginBottom: '28px' }} />

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div>
            <h2
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 200,
                fontSize: 'clamp(28px, 4vw, 42px)',
                color: '#F5F5F3',
                lineHeight: 1.15,
                marginBottom: '20px',
                textShadow: '0 0 30px rgba(245,245,243,0.45), 0 0 70px rgba(245,245,243,0.18)',
              }}
            >
              {t.headline}
            </h2>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: '14px',
                color: 'rgba(245,245,243,0.55)',
                lineHeight: 1.8,
              }}
            >
              {t.subline}
            </p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="py-20">
            <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.25)', marginBottom: '48px' }} />
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 200,
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: '#F5F5F3',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              {t.success}
            </p>
            <p style={{ fontWeight: 400, fontSize: '13px', color: '#6B6B6B' }}>
              {t.successSub}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            {/* Contact fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-10">
              <div>
                <label htmlFor="name" style={labelStyle}>{t.fields.name}</label>
                <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="phone" style={labelStyle}>{t.fields.phone}</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>{t.fields.email}</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="company" style={labelStyle}>{t.fields.company}</label>
                <input id="company" name="company" type="text" required value={form.company} onChange={handleChange} style={inputStyle} />
              </div>
            </div>

            {/* Services checkboxes */}
            <div className="mb-10">
              <p style={{ ...labelStyle, marginBottom: '16px' }}>{t.fields.services}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
                {services.map((service) => {
                  const checked = selectedServices.includes(service)
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className="text-left transition-colors duration-150"
                      style={{
                        border: '0.5px solid rgba(245,245,243,0.1)',
                        padding: '16px 20px',
                        marginTop: '-0.5px',
                        marginLeft: '-0.5px',
                        backgroundColor: checked ? 'rgba(245,245,243,0.06)' : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            minWidth: '14px',
                            border: `0.5px solid ${checked ? '#F5F5F3' : 'rgba(245,245,243,0.3)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: checked ? '#F5F5F3' : 'transparent',
                            transition: 'all 150ms',
                          }}
                          aria-hidden="true"
                        >
                          {checked && (
                            <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                              <polyline points="1,2.5 2.8,4.2 6,1" stroke="#0E0E0E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        <span
                          style={{
                            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                            fontWeight: checked ? 400 : 300,
                            fontSize: '13px',
                            color: '#F5F5F3',
                            transition: 'font-weight 150ms',
                          }}
                        >
                          {service}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message field */}
            <div className="mb-10">
              <label htmlFor="message" style={labelStyle}>{t.fields.message}</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'none', paddingTop: '14px' }}
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p style={{ fontWeight: 400, fontSize: '12px', color: '#6B6B6B', marginBottom: '24px' }}>
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                backgroundColor: status === 'loading' ? 'rgba(245,245,243,0.6)' : '#F5F5F3',
                color: '#0E0E0E',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                padding: '16px 48px',
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                minWidth: '200px',
                width: '100%',
                maxWidth: '320px',
              }}
            >
              {status === 'loading' ? t.submitting : t.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
