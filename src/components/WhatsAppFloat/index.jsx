import { useEffect, useState } from 'react';
import { contact, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { WhatsAppIcon } from '../ui/icons.jsx';
import styles from './styles.module.css';

// Botão fixo de WhatsApp: aparece depois que o hero sai da tela.
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={`drip ${styles.float} ${visible ? styles.visible : ''}`}
      href={whatsappUrl(contact.whatsapp, messages.budget)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir orçamento no WhatsApp"
      tabIndex={visible ? undefined : -1}
    >
      <WhatsAppIcon />
      <span>Orçamento</span>
    </a>
  );
}
