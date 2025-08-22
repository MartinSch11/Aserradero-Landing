export function injectLocalBusinessJSONLD() {
  const NAME = import.meta.env.VITE_SITE_NAME;
  const TEL = import.meta.env.VITE_PHONE;
  const EMAIL = import.meta.env.VITE_EMAIL;
  const CITY = import.meta.env.VITE_CITY;
  const PROV = import.meta.env.VITE_PROVINCE;
  const HOURS = (import.meta.env.VITE_HOURS || '').split(';').map((s: string) => s.trim());
  const AREA = import.meta.env.VITE_SERVICE_AREA;
  const URL = import.meta.env.VITE_SITE_URL;

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
