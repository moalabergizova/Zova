'use client'

import AnimateIn from './AnimateIn'
import { en } from '@/content/en'

const t = en.services

interface ServicesProps {
  selectedServices: string[]
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Services({ selectedServices, setSelectedServices }: ServicesProps) {
  const toggle = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    )
  }

  return (
    <section id="services" style={{ backgroundColor: '#0E0E0E' }} className="pt-8 pb-32 px-8">
      <div className="max-w-6xl mx-auto">

        <AnimateIn>
          <p style={{ fontWeight: 300, fontSize: '16px', letterSpacing: '3px', color: '#6B6B6B', textTransform: 'uppercase', marginBottom: '28px' }}>
            {t.label}
          </p>
          <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.2)', marginBottom: '56px' }} />
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <AnimateIn delay={1}>
            <h2 style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200, fontSize: 'clamp(30px, 4vw, 48px)', color: '#F5F5F3', lineHeight: 1.1, letterSpacing: '-0.3px' }}>
              {t.headline}
            </h2>
          </AnimateIn>
          <AnimateIn delay={2} className="flex items-end">
            <p style={{ fontWeight: 300, fontSize: '13px', color: '#6B6B6B', lineHeight: 1.8, fontStyle: 'italic' }}>
              {t.subline}
            </p>
          </AnimateIn>
        </div>

        {/* Selection hint */}
        <AnimateIn delay={2}>
          <p style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '2.5px', color: 'rgba(107,107,107,0.5)', textTransform: 'uppercase', marginBottom: '20px' }}>
            Select the services you&apos;re interested in
          </p>
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {t.items.map((item, i) => {
            const isSelected = selectedServices.includes(item.name)
            return (
              <AnimateIn key={i} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <button
                  onClick={() => toggle(item.name)}
                  className={`service-card ${isSelected ? 'selected' : ''} text-left w-full`}
                  style={{ padding: '28px', marginTop: '-0.5px', marginLeft: '-0.5px', display: 'block' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '13px', color: '#F5F5F3', marginBottom: '10px' }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: '12px', color: '#6B6B6B', lineHeight: 1.75 }}>
                        {item.description}
                      </p>
                    </div>
                    {/* Checkbox */}
                    <div style={{ width: '16px', height: '16px', minWidth: '16px', border: `0.5px solid ${isSelected ? 'rgba(245,245,243,0.5)' : 'rgba(107,107,107,0.35)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isSelected ? 'rgba(245,245,243,0.1)' : 'transparent', marginTop: '2px', transition: 'all 200ms' }} aria-hidden="true">
                      {isSelected && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <polyline points="1,3 3,5 7,1" stroke="#F5F5F3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              </AnimateIn>
            )
          })}
        </div>

        {/* Continue hint */}
        {selectedServices.length > 0 && (
          <div className="mt-10 flex items-center gap-4">
            <p style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '2px', color: 'rgba(107,107,107,0.5)', textTransform: 'uppercase' }}>
              {selectedServices.length} selected
            </p>
            <span style={{ color: 'rgba(107,107,107,0.3)', fontSize: '9px' }}>·</span>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '2px', color: 'rgba(245,245,243,0.4)', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer' }}>
              Continue ↓
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
