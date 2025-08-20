export function injectLocalBusinessJSONLD(
  env: Record<string, string | undefined> = import.meta.env
) {
  const NAME = env.VITE_SITE_NAME;
  const TEL = env.VITE_PHONE;
  const EMAIL = env.VITE_EMAIL;
  const CITY = env.VITE_CITY;
  const PROV = env.VITE_PROVINCE;
  const HOURS = (env.VITE_HOURS || '').split(';').map((s: string) => s.trim());
  const AREA = env.VITE_SERVICE_AREA;
  const URL = env.VITE_SITE_URL;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: NAME,
    url: URL,
    telephone: TEL,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: CITY,
      addressRegion: PROV,
      addressCountry: 'AR'
    },
    openingHours: HOURS,
    areaServed: AREA
  };

  if (typeof document === 'undefined') {
    return data;
  }

  let el = document.getElementById('jsonld-local') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = 'jsonld-local';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
  return data;
}
