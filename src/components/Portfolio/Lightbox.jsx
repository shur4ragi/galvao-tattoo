import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { lockScroll } from '../../utils/scrollLock.js';
import { ArrowIcon } from '../ui/icons.jsx';
import styles from './Lightbox.module.css';

export default function Lightbox({ items, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const item = items[index];
  const go = (step) => onChange((index + step + items.length) % items.length);

  useEffect(() => {
    const release = lockScroll();
    const previous = document.activeElement;
    closeRef.current?.focus();
    return () => {
      release();
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onChange, onClose]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Portfólio em tela cheia"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.top}>
        <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          Fechar <span aria-hidden="true">✕</span>
        </button>
      </div>

      <figure className={styles.figure} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img key={item.src} src={item.src} alt={item.alt} />
        <figcaption>{item.alt}</figcaption>
      </figure>

      {items.length > 1 && (
        <>
          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label="Foto anterior">
            <ArrowIcon />
          </button>
          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label="Próxima foto">
            <ArrowIcon />
          </button>
        </>
      )}
    </div>
  );
}

Lightbox.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string })).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
