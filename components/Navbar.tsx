'use client'

export default function Navbar() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: 'rgba(245,245,243,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '0.5px solid rgba(107,107,107,0.2)' }}
    >
      <div className="max-w-6xl mx-auto px-8 h-28 flex items-center justify-between">

        {/* Logo — exact reference image, light version */}
        <img
          src="/logo-navbar.png"
          alt="ZOVA"
          draggable={false}
          style={{
            height: '96px',
            width: 'auto',
            display: 'block',
            imageRendering: 'auto',
          }}
        />

        {/* Right controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={scrollToContact}
            className="hidden sm:block font-light text-carbon hover:opacity-60 transition-opacity"
            style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}
          >
            Get started
          </button>

          {/* Language toggle */}
          <div className="flex items-center gap-2">
            <button className="font-light text-carbon" style={{ fontSize: '9px', letterSpacing: '3px' }}>
              EN
            </button>
            <span style={{ fontSize: '9px', color: 'rgba(107,107,107,0.3)' }}>|</span>
            <button
              className="font-light cursor-not-allowed"
              style={{ fontSize: '9px', letterSpacing: '3px', color: 'rgba(107,107,107,0.35)' }}
              title="Arabic — coming soon"
              disabled
            >
              AR
            </button>
          </div>
        </div>

      </div>
    </nav>
  )
}
