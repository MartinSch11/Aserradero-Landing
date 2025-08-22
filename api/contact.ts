// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const body = req.body; // { nombre, email, mensaje, ... }
        // TODO: validar body, enviar mail, guardar, etc.
        return res.status(200).json({ ok: true });
    } catch (e: any) {
        return res.status(500).json({ ok: false, error: e?.message ?? 'Server error' });
    }
}
