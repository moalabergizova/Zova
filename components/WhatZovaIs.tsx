'use client'

import AnimateIn from './AnimateIn'
import { useLang } from '@/context/LangContext'

export default function WhatZovaIs() {
  const { content } = useLang()
  const t = content.whatZovaIs

  return (
    <section style={{ backgroundColor: '#E0E0DC' }} className="py-32 px-8">
      <div className="max-w-6xl mx-auto">

        <AnimateIn>
          <p style={{ fontWeight: 300, fontSize: '16px', letterSpacing: '3px', color: '#6B6B6B', textTransform: 'uppercase', marginBottom: '28px' }}>
            {t.label}
          </p>
          <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.25)', marginBottom: '56px' }} />
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <AnimateIn delay={1}>
            <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200, fontSize: 'clamp(30px, 4vw, 48px)', color: '#0E0E0E', lineHeight: 1.1, letterSpacing: '-0.3px' }}>
              {t.headline}
            </h2>
          </AnimateIn>
          <AnimateIn delay={2} className="flex flex-col justify-end gap-5">
            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '14px', color: '#1E1E1E', lineHeight: 1.85 }}>
              {t.body}
            </p>
            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontStyle: 'italic', fontWeight: 300, fontSize: '13px', color: '#6B6B6B' }}>
              &ldquo;{t.quote}&rdquo;
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ alignItems: 'stretch' }}>
          {t.pillars.map((pillar, i) => (
            <AnimateIn key={i} delay={(i + 1) as 1 | 2 | 3} className="flex">
              <div style={{ border: '0.5px solid rgba(107,107,107,0.25)', padding: '32px 28px', marginInlineStart: i > 0 ? '-0.5px' : '0', flex: 1 }}>
                <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '13px', color: '#0E0E0E', marginBottom: '12px' }}>
                  {pillar.title}
                </p>
                <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '13px', color: '#6B6B6B', lineHeight: 1.8 }}>
                  {pillar.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
