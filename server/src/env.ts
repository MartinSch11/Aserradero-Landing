import 'dotenv/config'

function required(name: string, value: string | undefined) {
  if (!value) throw new Error(`Missing env: ${name}`)
  return value
}

export const ENV = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  TURNSTILE_SECRET: required('TURNSTILE_SECRET', process.env.TURNSTILE_SECRET),
  CORS_ORIGINS: (process.env.CORS_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
}
