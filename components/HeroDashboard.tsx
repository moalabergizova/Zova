'use client'

const signals = [
  { id: 'S01', label: 'Market activity', sub: 'Competitors · Prices · Gaps' },
  { id: 'S02', label: 'Operational data', sub: 'Transactions · Spend · KPIs' },
  { id: 'S03', label: 'Growth friction', sub: 'Reports · Research · Tasks' },
  { id: 'S04', label: 'Missed intelligence', sub: 'Suppliers · Markets · Signals' },
]

const layers = [
  { tag: 'INTELLIGENCE LAYER', title: 'Collect', sub: 'Every relevant data point — pulled automatically.' },
  { tag: 'AUTOMATION LAYER', title: 'Analyse', sub: 'AI filters noise. Weighs what matters. 24/7.' },
  { tag: 'DELIVERY LAYER', title: 'Deliver', sub: 'Findings in your tools. Zero manual effort.' },
]

const outputs = [
  { id: 'O01', label: 'Clarity on your market' },
  { id: 'O02', label: 'Control over operations' },
  { id: 'O03', label: 'Financial visibility' },
  { id: 'O04', label: 'Time to lead' },
]

const card: React.CSSProperties = {
  border: '0.5px solid rgba(245,245,243,0.1)',
  backgroundColor: 'rgba(245,245,243,0.03)',
  padding: '12px 14px',
  borderRadius: '1px',
}

const tag: React.CSSProperties = {
  fontWeight: 300,
  fontSize: '7px',
  letterSpacing: '2.5px',
  color: '#6B6B6B',
  textTransform: 'uppercase' as const,
  marginBottom: '5px',
}

const title: React.CSSProperties = {
  fontWeight: 300,
  fontSize: '12px',
  color: 'rgba(245,245,243,0.9)',
  letterSpacing: '0.2px',
}

const sub: React.CSSProperties = {
  fontWeight: 300,
  fontSize: '10px',
  color: 'rgba(107,107,107,0.7)',
  marginTop: '3px',
  lineHeight: 1.5,
}

export default function HeroDashboard() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '580px',
        userSelect: 'none',
      }}
    >
      {/* Outer border frame */}
      <div style={{ border: '0.5px solid rgba(245,245,243,0.08)', padding: '24px', position: 'relative' }}>

        {/* Top label */}
        <p style={{ ...tag, marginBottom: '20px', color: 'rgba(107,107,107,0.5)' }}>
          YOUR BUSINESS GENERATES → ZOVA PROCESSES → YOU RECEIVE
        </p>

        {/* Three-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '0', alignItems: 'center' }}>

          {/* Column 1 — Signals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {signals.map((s) => (
              <div key={s.id} style={card}>
                <p style={tag}>{s.id}</p>
                <p style={title}>{s.label}</p>
                <p style={sub}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Connector 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 10px', gap: '4px' }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'relative', height: '44px', display: 'flex', alignItems: 'center' }}>
                <svg width="28" height="2" viewBox="0 0 28 2">
                  <line x1="0" y1="1" x2="28" y2="1" stroke="rgba(107,107,107,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
                </svg>
                {/* Animated dot */}
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245,245,243,0.4)',
                  animation: `flowDot 2.${i}s linear infinite`,
                }} />
              </div>
            ))}
          </div>

          {/* Column 2 — Processing layers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {layers.map((l, i) => (
              <div key={i} style={{
                ...card,
                borderColor: 'rgba(245,245,243,0.14)',
                backgroundColor: 'rgba(245,245,243,0.05)',
                padding: '14px 16px',
              }}>
                <p style={tag}>{l.tag}</p>
                <p style={{ ...title, fontWeight: 400, fontSize: '13px' }}>{l.title}</p>
                <p style={sub}>{l.sub}</p>
              </div>
            ))}
          </div>

          {/* Connector 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 10px', gap: '4px' }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'relative', height: '44px', display: 'flex', alignItems: 'center' }}>
                <svg width="28" height="2" viewBox="0 0 28 2">
                  <line x1="0" y1="1" x2="28" y2="1" stroke="rgba(107,107,107,0.3)" strokeWidth="0.5" strokeDasharray="3 3" />
                </svg>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245,245,243,0.4)',
                  animation: `flowDot 2.${i + 2}s linear infinite`,
                }} />
              </div>
            ))}
          </div>

          {/* Column 3 — Outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {outputs.map((o) => (
              <div key={o.id} style={card}>
                <p style={tag}>{o.id}</p>
                <p style={title}>{o.label}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom status bar */}
        <div style={{ marginTop: '20px', borderTop: '0.5px solid rgba(107,107,107,0.12)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(245,245,243,0.5)', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            <p style={{ ...tag, marginBottom: 0, letterSpacing: '2px' }}>System running</p>
          </div>
          <p style={{ ...tag, marginBottom: 0, letterSpacing: '2px' }}>24 / 7 · AUTOMATED</p>
        </div>

      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes flowDot {
          0%   { left: 0;    opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% - 3px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
