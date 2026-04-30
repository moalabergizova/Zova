import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const DATABASE_ID = process.env.NOTION_DATABASE_ID!

export interface LeadData {
  name: string
  phone: string
  email: string
  company: string
  services: string[]
  message?: string
}

export async function createLead(data: LeadData) {
  const { name, phone, email, company, services, message } = data

  const response = await notion.pages.create({
    parent: { database_id: DATABASE_ID },
    properties: {
      Name: {
        title: [{ text: { content: name } }],
      },
      Company: {
        rich_text: [{ text: { content: company } }],
      },
      Services: {
        rich_text: [{ text: { content: services.length ? services.join('\n') : '—' } }],
      },
      Status: {
        select: { name: 'New' },
      },
      Email: {
        email: email,
      },
      'Phone No.': {
        phone_number: phone,
      },
      Notes: {
        rich_text: [{ text: { content: message?.trim() || '' } }],
      },
      'Submitted At': {
        date: { start: new Date().toISOString() },
      },
    } as Parameters<typeof notion.pages.create>[0]['properties'],
  })

  console.log('[Notion] Lead created:', response.id)
}
