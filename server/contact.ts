import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const SECRET = process.env.TURNSTILE_SECRET_KEY!
if (!SECRET) {
  console.error('Falta TURNSTILE_SECRET_KEY en .env')
  process.exit(1)
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, captchaToken } = req.body || {}
    if (!captchaToken) return res.status(400).json({ error: 'Captcha faltante' })

    // Verificar token con Cloudflare
    const form = new URLSearchParams()
    form.append('secret', SECRET)
    form.append('response', String(captchaToken))
    // opcional: form.append('remoteip', req.ip || '')

    const vr = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form
    })
    const verify = await vr.json() as { success: boolean; 'error-codes'?: string[] }

    if (!verify.success) {
      return res.status(400).json({ error: 'Captcha inválido', details: verify['error-codes'] })
    }

    // TODO: persistir/enviar email (SendGrid/SMTP) con los datos
    // await sendMail({ name, email, phone, message })

    return res.json({ ok: true })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error de servidor' })
  }
})

export function startServer(port = Number(process.env.PORT) || 5174) {
  app.listen(port, () => console.log(`API contacto en http://localhost:${port}`))
}

if (require.main === module) startServer()
