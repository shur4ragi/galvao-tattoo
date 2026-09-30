export function whatsappUrl(phone, message = '') {
  const base = `https://wa.me/${String(phone).replace(/\D/g, '')}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
