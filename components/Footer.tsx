'use client'

import ZovaLogo from './ZovaLogo'
import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { content } = useLang()
  const t = content.footer

  return (
    <footer style={{ backgroundColor: '#0E0E0E' }} className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <ZovaLogo theme="dark" className="w-64 md:w-96 mb-16" />

        <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.25)', marginBottom: '40px' }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 300, fontSize: '13px', color: '#6B6B6B', lineHeight: 1.8, maxWidth: '400px',
          }}>
            {t.tagline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:justify-items-end">
            <div>
              <p style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '2.5px', color: 'rgba(107,107,107,0.5)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Email
              </p>
              <a href={`mailto:${t.email}`} style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 300, fontSize: '12px', color: '#F5F5F3', textDecoration: 'none', opacity: 0.8,
              }}>
                {t.email}
              </a>
            </div>

            <div>
              <p style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '2.5px', color: 'rgba(107,107,107,0.5)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Website
              </p>
              <p style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 300, fontSize: '12px', color: 'rgba(245,245,243,0.8)',
              }}>
                {t.website}
              </p>
            </div>

            <div>
              <p style={{ fontWeight: 300, fontSize: '9px', letterSpacing: '2.5px', color: 'rgba(107,107,107,0.5)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Founder
              </p>
              <p style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 300, fontSize: '12px', color: 'rgba(245,245,243,0.8)',
              }}>
                {t.founder}
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '0.5px solid rgba(107,107,107,0.2)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{
            fontWeight: 300, fontSize: '9px', letterSpacing: '2.5px',
            color: 'rgba(107,107,107,0.5)', textTransform: 'uppercase',
          }}>
            {t.legal}
          </p>
          <p style={{
            fontFamily: "'Noto Sans Arabic', Arial, sans-serif",
            fontWeight: 400, fontSize: '11px', color: 'rgba(107,107,107,0.35)',
          }}>
            زوّة
          </p>
        </div>
      </div>
    </footer>
  )
}
