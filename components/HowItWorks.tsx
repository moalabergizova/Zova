'use client'

import AnimateIn from './AnimateIn'
import { useLang } from '@/context/LangContext'

export default function HowItWorks() {
  const { content } = useLang()
  const t = content.howItWorks

  return (
    <section style={{ backgroundColor: '#F5F5F3' }} className="py-32 px-8">
      <div className="max-w-6xl mx-auto">

        <AnimateIn>
          <p style={{ fontWeight: 300, fontSize: '16px', letterSpacing: '3px', color: '#6B6B6B', textTransform: 'uppercase', marginBottom: '28px' }}>
            {t.label}
          </p>
          <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.25)', marginBottom: '56px' }} />
        </AnimateIn>

        <AnimateIn delay={1}>
          <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200, fontSize: 'clamp(30px, 4vw, 48px)', color: '#0E0E0E', lineHeight: 1.1, letterSpacing: '-0.3px', marginBottom: '80px' }}>
            {t.headline}
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {t.steps.map((step, i) => (
            <AnimateIn key={i} delay={(i + 1) as 1 | 2 | 3}>
              <div style={{ paddingInlineEnd: '40px' }}>
                <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200, fontSize: '96px', color: '#E0E0DC', lineHeight: 1, marginBottom: '20px', letterSpacing: '-4px', userSelect: 'none' }} aria-hidden="true">
                  {step.number}
                </p>
                <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.25)', marginBottom: '20px' }} />
                <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '13px', color: '#0E0E0E', marginBottom: '12px' }}>
                  {step.title}
                </p>
                <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '13px', color: '#6B6B6B', lineHeight: 1.85 }}>
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
