export function buildWhatsAppLink(rawPhone: string, message: string) {
  const digits = rawPhone.replace(/[^\d]/g, '');
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildTelLink(rawPhone: string) {
  const digits = rawPhone.replace(/[^\d+]/g, '');
  return `tel:${digits}`;
}
