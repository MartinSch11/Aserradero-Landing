export function scrollToSection(hash: string) {
  const id = hash.startsWith('#') ? hash : `#${hash}`;
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
