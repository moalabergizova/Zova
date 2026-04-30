'use client'

interface ZovaLogoProps {
  theme?: 'dark' | 'light'
  className?: string
}

export default function ZovaLogo({ theme = 'light', className = '' }: ZovaLogoProps) {
  return (
    <img
      src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
      alt="ZOVA — Intelligence Operations · Saudi Arabia"
      className={className}
      draggable={false}
      style={{ imageRendering: 'auto', display: 'block' }}
    />
  )
}
