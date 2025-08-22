import type { Request, Response, NextFunction } from 'express'

const BUCKET = new Map<string, { count: number; ts: number }>()
const WINDOW_MS = 60_000
const LIMIT = 30

export function simpleRateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const rec = BUCKET.get(ip)

  if (!rec || now - rec.ts > WINDOW_MS) {
    BUCKET.set(ip, { count: 1, ts: now })
    return next()
  }

  rec.count += 1
  if (rec.count > LIMIT) {
    return res.status(429).json({ ok: false, error: 'Too many requests' })
  }
  next()
}
