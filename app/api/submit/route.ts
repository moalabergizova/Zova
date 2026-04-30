import { NextRequest, NextResponse } from 'next/server'
import { createLead } from '@/lib/notion'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, company, services, message } = body

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !company?.trim()) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    await createLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      company: company.trim(),
      services: Array.isArray(services) ? services : [],
      message: message?.trim() || '',
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    // Print the full error to terminal so you can see exactly what went wrong
    console.error('[/api/submit] Full error:', err)

    if (err && typeof err === 'object' && 'body' in err) {
      console.error('[/api/submit] Notion error body:', JSON.stringify((err as { body: unknown }).body, null, 2))
    }

    const message =
      err instanceof Error ? err.message : 'Submission failed. Please try again.'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
