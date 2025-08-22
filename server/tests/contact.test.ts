import request from 'supertest'
import express from 'express'
import cors from 'cors'
import { ContactSchema } from '../src/types'

function makeApp() {
  const app = express()
  app.use(express.json())
  app.use(cors())

  app.post('/contact', (req, res) => {
    const parse = ContactSchema.safeParse(req.body)
    if (!parse.success) return res.status(400).json({ ok: false })
    return res.json({ ok: true })
  })
  return app
}

describe('POST /contact', () => {
  it('rejects invalid payload', async () => {
    const app = makeApp()
    const res = await request(app).post('/contact').send({ email: 'bad', captcha: '' })
    expect(res.status).toBe(400)
  })

  it('accepts valid payload shape', async () => {
    const app = makeApp()
    const res = await request(app).post('/contact').send({
      name: 'Juan Perez',
      email: 'juan@example.com',
      phone: '351-123',
      message: 'Hola!',
      captcha: 'x'.repeat(20)
    })
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })
})
