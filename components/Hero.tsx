'use client'

import ZovaLogo from './ZovaLogo'
import NetworkCanvas from './NetworkCanvas'
import { en } from '@/content/en'

const t = en.hero

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col pt-28 overflow-hidden"
      style={{ backgroundColor: '#0E0E0E' }}
    >
      {/* ── Full-hero animated network ── */}
      <NetworkCanvas />

      {/* ── Left-side reading gradient — keeps text legible ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #0E0E0E 38%, rgba(14,14,14,0.7) 58%, rgba(14,14,14,0.1) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Bottom fade — blends into ticker ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '120px',
          background: 'linear-gradient(to top, #0E0E0E, transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Logo ── */}
      <div className="relative px-8 pt-14 md:pt-20" style={{ zIndex: 2 }}>
        <div className="max-w-6xl mx-auto">
          <ZovaLogo theme="dark" className="w-[300px] md:w-[580px]" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-start px-8 pt-6 pb-16 md:pt-8 md:pb-24" style={{ zIndex: 2 }}>
        <div className="max-w-6xl mx-auto w-full">
          <div style={{ maxWidth: '780px' }}>

            <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.25)', marginBottom: '36px' }} />

            <p
              className="reveal visible"
              style={{ fontWeight: 300, fontSize: '11px', letterSpacing: '3px', color: '#6B6B6B', textTransform: 'uppercase', marginBottom: '28px' }}
            >
              {t.label}
            </p>

            <h1
              className="reveal visible reveal-delay-1"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 200,
                fontSize: 'clamp(38px, 4.2vw, 68px)',
                color: '#F5F5F3',
                lineHeight: 1.08,
                letterSpacing: '-1px',
                marginBottom: '40px',
              }}
            >
              {t.headline}
            </h1>

            <p
              className="reveal visible reveal-delay-2"
              style={{ fontWeight: 300, fontSize: '15px', color: '#6B6B6B', lineHeight: 1.85, marginBottom: '44px', maxWidth: '400px' }}
            >
              {t.subline}
            </p>

            <div className="reveal visible reveal-delay-3">
              <button className="btn-outline" onClick={scrollToContact}>
                <span>{t.cta}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative px-8 pb-6" style={{ zIndex: 2, borderTop: '0.5px solid rgba(107,107,107,0.12)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between pt-5">
          <span style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '3px', color: 'rgba(107,107,107,0.4)', textTransform: 'uppercase' }}>
            ZOVA · INTELLIGENCE OPERATIONS · SAUDI ARABIA
          </span>
          <span style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '2px', color: 'rgba(107,107,107,0.22)' }}>
            2026
          </span>
        </div>
      </div>
    </section>
  )
}
