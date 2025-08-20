type TrackPayload = Record<string, unknown>;
declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: TrackPayload }) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const REQUIRE_CONSENT = (import.meta.env.VITE_REQUIRE_CONSENT as string | undefined) === 'true';

export function initAnalytics() {
  if (PLAUSIBLE_DOMAIN) {
    const s = document.createElement('script');
    s.defer = true;
    s.setAttribute('data-domain', PLAUSIBLE_DOMAIN);
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  }

  if (GA_ID && !REQUIRE_CONSENT) {
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    const s2 = document.createElement('script');
    s2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { anonymize_ip: true });
    `;
    document.head.append(s1, s2);
  }

  // Scroll depth simple (25/50/75)
  let maxDepth = 0;
  const thresholds = [25, 50, 75];
  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const depth = Math.round((scrollTop / Math.max(1, docHeight)) * 100);
    thresholds.forEach((t) => {
      if (depth >= t && maxDepth < t) {
        maxDepth = t;
        track('scroll_depth', { percent: t });
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

export function track(event: string, props?: TrackPayload) {
  if (window.plausible) window.plausible(event, { props });
  if (window.gtag) window.gtag('event', event, props || {});
}
