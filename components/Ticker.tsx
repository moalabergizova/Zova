const items = [
  'Intelligence Operations',
  'Built to run. Designed to think.',
  'Saudi Arabia',
  'Seven services. One system.',
  'We run the operations. You run the vision.',
  'Zero overhead.',
  'Operate smarter. Decide faster.',
]

const text = items.join('   ·   ')

export default function Ticker() {
  return (
    <div
      style={{
        backgroundColor: '#1E1E1E',
        borderTop: '0.5px solid rgba(107,107,107,0.2)',
        borderBottom: '0.5px solid rgba(107,107,107,0.2)',
        overflow: 'hidden',
        padding: '18px 0',
      }}
    >
      <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              paddingRight: '80px',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '3.5px',
              textTransform: 'uppercase',
              color: '#6B6B6B',
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
