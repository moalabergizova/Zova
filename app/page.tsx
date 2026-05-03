'use client'

import { useState, useEffect, useRef } from 'react'
import { LangProvider, useLang } from '@/context/LangContext'
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

function PageContent() {
  const { lang } = useLang()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const prevLang = useRef(lang)

  useEffect(() => {
    if (prevLang.current !== lang) {
      setSelectedServices([])
      prevLang.current = lang
    }
  }, [lang])

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ fontFamily: lang === 'ar' ? "var(--font-arabic), 'Helvetica Neue', Helvetica, Arial, sans-serif" : undefined }}>
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

export default function Home() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  )
}
