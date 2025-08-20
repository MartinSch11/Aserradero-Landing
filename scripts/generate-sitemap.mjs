import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE = process.env.VITE_SITE_URL || 'https://example.com'; // TODO: setear en Vercel

const urls = ['/', '/#servicios', '/#especies', '/#calidad', '/#logistica', '/#galeria', '/#testimonios', '/#faqs', '/#contacto'];

const now = new Date().toISOString();
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) => `  <url>
    <loc>${SITE}${u === '/' ? '' : u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : '0.6'}</priority>
  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

writeFileSync(resolve('public', 'sitemap.xml'), xml, 'utf8');
console.log('✓ sitemap.xml generado');
