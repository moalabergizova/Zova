import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const LOGO_URL = 'https://www.z-ova.com/logo-dark.png'
const NOTIFY_TO = 'zova@z-ova.com'
const FROM_NOTIFY = 'ZOVA System <noreply@z-ova.com>'
const FROM_CONFIRM = 'ZOVA <zova@z-ova.com>'

export interface EmailData {
  name: string
  phone: string
  email: string
  company: string
  services: string[]
  message?: string
}

export async function sendNotificationEmail(data: EmailData) {
  const { name, phone, email, company, services, message } = data

  const submittedAt = new Date().toLocaleString('en-SA', {
    timeZone: 'Asia/Riyadh',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const servicesList = services.length
    ? services.map((s) => `· ${s}`).join('\n')
    : '· None selected'

  await resend.emails.send({
    from: FROM_NOTIFY,
    to: NOTIFY_TO,
    subject: `New Lead — ${name} · ${company}`,
    text: `
NEW SUBMISSION · ZOVA
─────────────────────────────

Name      ${name}
Phone     ${phone}
Email     ${email}
Company   ${company}

Services
${servicesList}${message ? `\n\nMessage\n"${message}"` : ''}

─────────────────────────────
Submitted: ${submittedAt}
    `.trim(),
  })
}

export async function sendConfirmationEmail(data: EmailData) {
  const { name, email, services } = data

  const servicesHtml = services.length
    ? services
        .map(
          (s) =>
            `<tr><td style="padding:5px 0;font-size:13px;color:#6B6B6B;line-height:1.6;">· ${s}</td></tr>`
        )
        .join('')
    : ''

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>We received your request — ZOVA</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F5F3;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;max-width:560px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding:40px 48px 32px;border-bottom:1px solid rgba(30,30,30,0.08);">
              <img src="${LOGO_URL}" alt="ZOVA" width="140" style="display:block;height:auto;border:0;">
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px 0;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:3px;color:#6B6B6B;text-transform:uppercase;">
                CONFIRMATION
              </p>
              <h1 style="margin:0 0 24px;font-weight:200;font-size:30px;color:#0E0E0E;line-height:1.15;letter-spacing:-0.5px;">
                Thank you, ${name}.
              </h1>
              <p style="margin:0 0 36px;font-size:14px;color:#6B6B6B;line-height:1.85;">
                We've received your request. Our team reviews every submission personally and will be in touch within 48 hours.
              </p>

              ${
                services.length
                  ? `
              <p style="margin:0 0 14px;font-size:11px;letter-spacing:3px;color:#0E0E0E;text-transform:uppercase;">
                YOUR SELECTED SERVICES
              </p>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:40px;">
                ${servicesHtml}
              </table>
              `
                  : ''
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px 40px;border-top:1px solid rgba(30,30,30,0.08);">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:2.5px;color:#ABABAB;text-transform:uppercase;">
                ZOVA · INTELLIGENCE OPERATIONS · SAUDI ARABIA
              </p>
              <p style="margin:0;font-size:12px;color:#ABABAB;">
                <a href="https://www.z-ova.com" style="color:#ABABAB;text-decoration:none;">z-ova.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  await resend.emails.send({
    from: FROM_CONFIRM,
    to: email,
    subject: 'We received your request — ZOVA',
    html,
  })
}
