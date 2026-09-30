import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { gallerySections, portfolio } from '../../data/site.js';
import { lockScroll } from '../../utils/scrollLock.js';
import { BottleShape, DROP, Puddle } from '../ui/TattooArt.jsx';
import Mark from '../ui/Mark.jsx';
import styles from './GalleryModal.module.css';

// Tempo mínimo do carregamento geral, para a entrada ter ritmo mesmo com as fotos em cache.
const MIN_LOADING_MS = 1100;
const FORCED = new URLSearchParams(window.location.search).has('skeleton');

// Pré-carrega todas as fotos e informa quantas já chegaram.
function usePreload(sources) {
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let count = 0;
    let done = false;
    const start = performance.now();
    let timer = 0;
    const finish = () => {
      if (done || FORCED) return;
      done = true;
      timer = setTimeout(() => setReady(true), Math.max(0, MIN_LOADING_MS - (performance.now() - start)));
    };
    const images = sources.map((src) => {
      const img = new Image();
      const settle = () => {
        count += 1;
        setLoaded(count);
        if (count === sources.length) finish();
      };
      img.onload = settle;
      img.onerror = settle;
      img.src = src;
      return img;
    });
    return () => {
      clearTimeout(timer);
      images.forEach((img) => { img.onload = null; img.onerror = null; });
    };
  }, [sources]);

  return { loaded, ready };
}

// Todos os trabalhos em um modal, separados por seção (cada foto na sua categoria principal).
// Um carregamento geral cobre o modal até todas as fotos chegarem.
export default function GalleryModal({ onClose, onOpenPhoto, blockEscape }) {
  const closeRef = useRef(null);
  const sheetRef = useRef(null);

  const sections = useMemo(
    () => gallerySections
      .map((section) => ({ ...section, items: portfolio.filter((item) => item.tags[0] === section.id) }))
      .filter((section) => section.items.length),
    [],
  );
  const sources = useMemo(() => portfolio.map((item) => item.src), []);
  const { loaded, ready } = usePreload(sources);

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

  const goTo = (id) => {
    const sheet = sheetRef.current;
    const target = sheet?.querySelector(`[data-section="${id}"]`);
    if (target) sheet.scrollTo({ top: target.offsetTop - 84, behavior: 'smooth' });
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="galeria-titulo">
      <div ref={sheetRef} className={styles.sheet} data-ready={ready}>
        <header className={styles.head}>
          <p id="galeria-titulo" className={styles.title}>
            <Mark /> / Todos os trabalhos <span>{portfolio.length}</span>
          </p>
          <nav className={styles.jump} aria-label="Seções">
            {sections.map((section) => (
              <button key={section.id} type="button" onClick={() => goTo(section.id)} disabled={!ready}>
                {section.title}
              </button>
            ))}
          </nav>
          <button ref={closeRef} type="button" className="btn btn--soft" onClick={onClose}>
            Fechar <span aria-hidden="true">✕</span>
          </button>
        </header>

        {!ready && (
          <div className={styles.loader} role="status" aria-live="polite">
            <svg className={styles.loaderArt} viewBox="0 0 130 96" aria-hidden="true" focusable="false">
              <g className={styles.wobble}>
                <BottleShape />
              </g>
              <path className={styles.pour} d="M81 51 C85 58 80 66 84 77" />
              <g transform="translate(84 50)">
                <path d={DROP} className={styles.drip} />
              </g>
              <g transform="translate(96 82) scale(0.5)">
                <g className={styles.pool} style={{ '--p': loaded / sources.length }}>
                  <Puddle />
                </g>
              </g>
            </svg>
            <p className={styles.loaderText}>Separando os trabalhos</p>
            <p className={styles.loaderCount}>
              {loaded} / {sources.length}
            </p>
            <span className={styles.loaderBar} aria-hidden="true">
              <i style={{ transform: `scaleX(${loaded / sources.length})` }} />
            </span>
          </div>
        )}

        <div className={styles.content} aria-hidden={!ready}>
          {sections.map((section, s) => (
            <section key={section.id} className={styles.section} data-section={section.id} style={{ '--s': s }}>
              <div className={styles.sectionHead}>
                <span className={styles.num}>{String(s + 1).padStart(2, '0')}</span>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
                <small>
                  {section.items.length} {section.items.length === 1 ? 'trabalho' : 'trabalhos'}
                </small>
              </div>

              <ul className={styles.grid}>
                {section.items.map((item, i) => (
                  <li key={item.src} style={{ '--i': i }}>
                    <button type="button" className={styles.card} onClick={() => onOpenPhoto(section.items, i)} tabIndex={ready ? undefined : -1}>
                      <span className={styles.media}>
                        <img src={item.src} alt={item.alt} width="464" height="464" />
                      </span>
                      <span className={styles.caption}>{item.alt}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

GalleryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpenPhoto: PropTypes.func.isRequired,
  blockEscape: PropTypes.bool,
};
