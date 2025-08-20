import { describe, it, expect } from 'vitest';
import { buildTelLink, buildWhatsAppLink } from '@/utils/links';

describe('links', () => {
  it('builds tel link', () => {
    expect(buildTelLink('+54 9 351 123-4567')).toBe('tel:+5493511234567');
  });
  it('builds whatsapp link', () => {
    const url = buildWhatsAppLink('351 123 4567', 'Hola mundo');
    expect(url).toContain('https://wa.me/');
    expect(url).toContain('text=Hola%20mundo');
  });
});
