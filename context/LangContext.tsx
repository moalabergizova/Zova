'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { en } from '@/content/en'
import { ar } from '@/content/ar'

type Lang = 'en' | 'ar'
type Content = typeof en

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  content: Content
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  content: en,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const content = lang === 'ar' ? (ar as unknown as Content) : en
  return (
    <LangContext.Provider value={{ lang, setLang, content }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
