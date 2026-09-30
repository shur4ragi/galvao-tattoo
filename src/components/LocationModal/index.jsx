import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { contact } from '../../data/site.js';
import { lockScroll } from '../../utils/scrollLock.js';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import Mark from '../ui/Mark.jsx';
import styles from './styles.module.css';

const query = encodeURIComponent(contact.mapQuery);
const MAP_EMBED = `https://www.google.com/maps?q=${query}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${query}`;
const ROUTE_LINK = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

// Modal de localização: mapa grande, endereço e atalhos para abrir no Maps, traçar rota ou copiar.
// Os links do Google passam pela tela de carregamento (ExternalLoader).
export default function LocationModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const release = lockScroll();
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      release();
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${contact.address}, ${contact.city}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sem permissão de área de transferência: o endereço continua visível para copiar à mão.
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="local-titulo">
        <div className={styles.map}>
          <iframe title="Mapa do studio em Taubaté" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <InkSkeleton variant="machine" label="Carregando mapa" minMs={600} />
        </div>

        <div className={styles.info}>
          <div className={styles.head}>
            <p className={styles.kicker}>
              <Mark /> / Localização
            </p>
            <button ref={closeRef} type="button" className={`drip ${styles.close}`} onClick={onClose} aria-label="Fechar localização">
              ✕
            </button>
          </div>

          <h2 id="local-titulo" className={styles.title}>Studio privado no Centro de Taubaté</h2>
          <address className={styles.address}>
            {contact.address}
            <br />
            {contact.city}
          </address>
          <p className={styles.note}>{contact.hours}. Combine o horário pelo WhatsApp antes de ir.</p>

          <div className={styles.actions}>
            <a className="btn" href={ROUTE_LINK} target="_blank" rel="noopener noreferrer">
              Traçar rota
            </a>
            <a className="btn btn--soft" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
              Abrir no Google Maps
            </a>
            <button type="button" className="btn btn--soft" onClick={copy} aria-live="polite">
              {copied ? 'Endereço copiado ✓' : 'Copiar endereço'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

LocationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
