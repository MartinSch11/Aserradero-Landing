import { describe, it, expect, vi } from 'vitest';
import { injectLocalBusinessJSONLD } from '@/utils/schema';

describe('schema', () => {
  it('injects LocalBusiness JSON-LD', () => {
    (import.meta as any).env = {
      VITE_SITE_NAME: 'Aserradero X',
      VITE_PHONE: '3511234567',
      VITE_EMAIL: 'hola@test.com',
      VITE_CITY: 'Córdoba',
      VITE_PROVINCE: 'Córdoba',
      VITE_HOURS: 'Mo-Fr 09:00-17:00',
      VITE_SERVICE_AREA: 'Córdoba y alrededores',
      VITE_SITE_URL: 'https://example.com'
    };
    const data = injectLocalBusinessJSONLD();
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.name).toBe('Aserradero X');
  });
});
