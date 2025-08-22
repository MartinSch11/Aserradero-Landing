import express from 'express'
import cors from 'cors'
import { ENV } from './env.js'
import { simpleRateLimit } from './rateLimit.js'
import { ContactSchema } from './types.js'

const app = express()

app.use(express.json({ limit: '100kb' }))

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true) // allow curl/postman
    if (ENV.CORS_ORIGINS.includes(origin)) return cb(null, true)
    cb(new Error('Not allowed by CORS'))
  }
}))

app.use(simpleRateLimit)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/contact', async (req, res) => {
  const parse = ContactSchema.safeParse(req.body)
  if (!parse.success) {
    return res.status(400).json({ ok: false, error: 'Invalid payload', details: parse.error.issues })
  }

  const { name, email, phone, message, captcha } = parse.data

  // Verificación Turnstile
  try {
    const form = new URLSearchParams()
    form.set('secret', ENV.TURNSTILE_SECRET)
    form.set('response', captcha)
    // Opcional: form.set('remoteip', req.ip || '')

    const cf = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form
    }).then(r => r.json() as Promise<{ success: boolean; 'error-codes'?: string[] }>)
    if (!cf.success) {
      return res.status(400).json({ ok: false, error: 'Captcha failed', codes: cf['error-codes'] || [] })
    }
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Captcha verify error' })
  }

  // TODO: Persistir en DB o enviar email
  // Ejemplo de log seguro
  console.log('[CONTACT]', { name, email, phone, len: message.length })

  return res.json({ ok: true })
})

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ ok: false, error: 'Internal error' })
})

app.listen(ENV.PORT, () => {
  console.log(`Contact server listening on http://localhost:${ENV.PORT}`)
})
