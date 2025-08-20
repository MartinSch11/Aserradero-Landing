export function setSEO(opts: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}) {
  // ⬇️ Asegurar <title> en el <head> + document.title
  let titleEl = document.head.querySelector('title');
  if (!titleEl) {
    titleEl = document.createElement('title');
    document.head.appendChild(titleEl);
  }
  titleEl.textContent = opts.title;
  document.title = opts.title;

  setMeta('description', opts.description);
  setOG('og:title', opts.title);
  setOG('og:description', opts.description);
  if (opts.image) setOG('og:image', opts.image);
  if (opts.url) setOG('og:url', opts.url);
  setMeta('twitter:title', opts.title);
  setMeta('twitter:description', opts.description);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setOG(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
