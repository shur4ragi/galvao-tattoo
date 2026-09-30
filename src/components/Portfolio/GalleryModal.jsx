import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { filters, portfolio } from '../../data/site.js';
import { lockScroll } from '../../utils/scrollLock.js';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import Mark from '../ui/Mark.jsx';
import styles from './GalleryModal.module.css';

// Tempo mínimo dos skeletons ao abrir e ao trocar de filtro, para a entrada ter ritmo.
const SKELETON_MS = 900;

// Todos os trabalhos em um modal de tela cheia, com filtros e skeletons de tinta na abertura.
export default function GalleryModal({ onClose, onOpenPhoto, blockEscape }) {
  const [filter, setFilter] = useState('all');
  const closeRef = useRef(null);

  const items = useMemo(
    () => (filter === 'all' ? portfolio : portfolio.filter((item) => item.tags.includes(filter))),
    [filter],
  );

  const counts = useMemo(() => {
    const result = { all: portfolio.length };
    portfolio.forEach((item) => item.tags.forEach((tag) => { result[tag] = (result[tag] || 0) + 1; }));
    return result;
  }, []);

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
      if (e.key === 'Escape' && !blockEscape) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, blockEscape]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="galeria-titulo">
      <div className={styles.sheet}>
        <header className={styles.head}>
          <p id="galeria-titulo" className={styles.title}>
            <Mark /> / Todos os trabalhos <span>{portfolio.length}</span>
          </p>
          <button ref={closeRef} type="button" className="btn btn--soft" onClick={onClose}>
            Fechar <span aria-hidden="true">✕</span>
          </button>
        </header>

        <div className={styles.filters} role="group" aria-label="Filtrar trabalhos">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={filter === f.id ? styles.active : ''}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <sup>{counts[f.id] || 0}</sup>
            </button>
          ))}
        </div>

        <ul className={styles.grid} key={filter}>
          {items.map((item, i) => (
            <li key={item.src} className={item.tall ? styles.tall : ''} style={{ '--i': i }}>
              <button type="button" className={styles.card} onClick={() => onOpenPhoto(items, i)} aria-label={`Ampliar: ${item.alt}`}>
                <img src={item.src} alt={item.alt} width="464" height="464" />
                <InkSkeleton minMs={SKELETON_MS + i * 60} />
                <span className={styles.caption}>{item.alt}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

GalleryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpenPhoto: PropTypes.func.isRequired,
  blockEscape: PropTypes.bool,
};
