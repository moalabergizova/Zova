import AnimateIn from './AnimateIn'
import { en } from '@/content/en'

const t = en.metrics

export default function MetricsStrip() {
  return (
    <section style={{ backgroundColor: '#0E0E0E' }} className="pt-32 pb-8 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {t.stats.map((stat, i) => (
            <AnimateIn key={i} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div style={{ padding: '0 40px 0 0', borderRight: i < 3 ? '0.5px solid rgba(107,107,107,0.20)' : 'none' }}
                   className="mb-14 md:mb-0">
                <p style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 200,
                  fontSize: 'clamp(52px, 7vw, 96px)',
                  color: '#F5F5F3',
                  lineHeight: 1,
                  letterSpacing: '-1px',
                  marginBottom: '20px',
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontWeight: 300,
                  fontSize: '11px',
                  color: '#6B6B6B',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  lineHeight: 1.8,
                }}>
                  {stat.label}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
