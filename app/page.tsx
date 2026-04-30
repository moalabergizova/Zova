'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Reality from '@/components/Reality'
import WhatZovaIs from '@/components/WhatZovaIs'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import MetricsStrip from '@/components/MetricsStrip'
import FAQ from '@/components/FAQ'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Reality />
      <Ticker />
      <WhatZovaIs />
      <HowItWorks />
      <MetricsStrip />
      <Services selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
      <ContactForm selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
      <FAQ />
      <Footer />
    </main>
  )
}
