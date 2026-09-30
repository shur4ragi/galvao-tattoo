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
  const bodyRef = useRef(null);

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

  // Cabeçalho compacto depois de rolar: recolhe título e frase, mantém atalhos e fechar.
  // O cabeçalho fica fora da área que rola, então recolher não desloca o conteúdo; e a folga
  // entre os limites (recolhe depois de 80px, volta abaixo de 8px) evita que ele fique piscando.
  const [compact, setCompact] = useState(false);
  const onBodyScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    setCompact((was) => (was ? top > 8 : top > 80));
  };

  const goTo = (id) => {
    const body = bodyRef.current;
    const target = body?.querySelector(`[data-section="${id}"]`);
    if (target) body.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="galeria-titulo"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.sheet} data-ready={ready}>
        <header className={styles.head} data-compact={compact}>
          <div className={styles.headTop}>
            <p className={styles.kicker}>
              <Mark /> / Portfólio
            </p>
            <button ref={closeRef} type="button" className={`btn btn--soft ${styles.closeBtn}`} onClick={onClose}>
              Fechar <span aria-hidden="true">✕</span>
            </button>
          </div>
          <div className={styles.intro}>
            <div>
              <h2 id="galeria-titulo" className={styles.title} aria-label="Todos os trabalhos">
                <span className={`wide ${styles.tWide}`} aria-hidden="true">Todos</span>{' '}
                <span className={`sign ${styles.tSign}`} aria-hidden="true">os</span>{' '}
                <span className={`condensed ${styles.tCond}`} aria-hidden="true">trabalhos</span>
              </h2>
              <p className={styles.lead}>
                {portfolio.length} tatuagens, separadas por estilo. Toque em uma foto para ampliar.
              </p>
            </div>
          </div>
          <nav className={styles.jump} aria-label="Seções">
            {sections.map((section) => (
              <button key={section.id} type="button" className="drip" onClick={() => goTo(section.id)} disabled={!ready}>
                {section.title}
              </button>
            ))}
          </nav>
        </header>

        <div ref={bodyRef} className={styles.body} onScroll={onBodyScroll}>
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

          {ready && (
            <div className={styles.content}>
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
                        <button type="button" className={styles.card} onClick={() => onOpenPhoto(section.items, i)}>
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
          )}
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
