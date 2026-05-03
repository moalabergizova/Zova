'use client'

import { useState } from 'react'
import AnimateIn from './AnimateIn'
import { useLang } from '@/context/LangContext'

export default function FAQ() {
  const { content } = useLang()
  const t = content.faq
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ backgroundColor: '#E0E0DC' }} className="py-10 px-8">
      <div className="max-w-6xl mx-auto">

        <AnimateIn>
          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300, fontSize: '11px', letterSpacing: '3px', color: '#6B6B6B',
            textTransform: 'uppercase', marginBottom: '14px',
          }}>
            {t.label}
          </p>
          <div style={{ borderTop: '0.5px solid rgba(30,30,30,0.18)', marginBottom: '24px' }} />
        </AnimateIn>

        <AnimateIn delay={1}>
          <h2 style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 200, fontSize: 'clamp(18px, 2vw, 26px)', color: '#0E0E0E',
            lineHeight: 1.1, letterSpacing: '-0.3px', marginBottom: '24px',
          }}>
            {t.headline}
          </h2>
        </AnimateIn>

        <AnimateIn delay={2}>
          <div>
            {t.items.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={i} style={{ borderBottom: '0.5px solid rgba(30,30,30,0.18)' }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: '100%', display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: '32px', padding: '13px 0',
                      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'start' as const,
                    }}
                    aria-expanded={isOpen}
                  >
                    <span style={{
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 300, fontSize: 'clamp(15px, 1.5vw, 18px)', color: '#1E1E1E', lineHeight: 1.4,
                    }}>
                      {item.q}
                    </span>
                    <span style={{
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 200, fontSize: '20px', color: '#6B6B6B',
                      flexShrink: 0, lineHeight: 1, marginTop: '2px', transition: 'opacity 0.2s',
                    }}>
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  <div style={{ maxHeight: isOpen ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                    <p style={{
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: 400, fontSize: '13px', color: '#6B6B6B', lineHeight: 1.85,
                      paddingBottom: '16px', maxWidth: '640px',
                    }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </AnimateIn>

      </div>
    </section>
  )
}
