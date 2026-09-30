import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BottleShape, DROP, MachineShape, Puddle } from './TattooArt.jsx';
import styles from './InkSkeleton.module.css';

// Com ?skeleton na URL os skeletons ficam na tela, para ver o visual sem precisar de rede lenta.
const FORCED = new URLSearchParams(window.location.search).has('skeleton');

function isLoaded(media) {
  return media.tagName === 'IMG' && media.complete && media.naturalWidth > 0;
}

// Skeleton de carregamento com referência de estúdio. Fica por cima da primeira <img> ou <iframe>
// do mesmo container (que precisa de position: relative) e some quando ela termina de carregar.
// minMs mantém o skeleton um tempo mínimo na tela (ex.: ao abrir o modal do portfólio).
export default function InkSkeleton({ variant = 'bottle', label = 'Carregando tinta', minMs = 0 }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (FORCED) return undefined;
    const start = performance.now();
    let timer = 0;
    const done = () => {
      timer = setTimeout(() => setLoaded(true), Math.max(0, minMs - (performance.now() - start)));
    };
    const media = ref.current?.parentElement?.querySelector('img, iframe');
    if (!media || isLoaded(media)) {
      done();
      return () => clearTimeout(timer);
    }
    media.addEventListener('load', done);
    media.addEventListener('error', done);
    return () => {
      clearTimeout(timer);
      media.removeEventListener('load', done);
      media.removeEventListener('error', done);
    };
  }, [minMs]);

  return (
    <span ref={ref} className={`${styles.skeleton} ${loaded ? styles.done : ''}`} aria-hidden="true">
      {variant === 'machine' ? (
        <svg className={styles.art} viewBox="0 0 160 150" focusable="false">
          <g transform="translate(30 -10) scale(0.6) rotate(40 60 110)">
            <g className={styles.buzz}>
              <MachineShape />
            </g>
          </g>
          <g transform="translate(16 100)">
            <path d={DROP} className={styles.drip} />
          </g>
          <g transform="translate(46 138) scale(0.5)">
            <g className={styles.pool}>
              <Puddle />
            </g>
          </g>
        </svg>
      ) : (
        <svg className={styles.art} viewBox="0 0 130 96" focusable="false">
          <g className={styles.wobble}>
            <BottleShape />
          </g>
          {/* Fio de tinta escorrendo do gargalo */}
          <path className={styles.pour} d="M81 51 C85 58 80 66 84 77" />
          <g transform="translate(84 50)">
            <path d={DROP} className={styles.drip} />
          </g>
          <g transform="translate(96 82) scale(0.5)">
            <g className={styles.pool}>
              <Puddle />
            </g>
          </g>
        </svg>
      )}
      <span className={styles.label}>{label}</span>
    </span>
  );
}

InkSkeleton.propTypes = {
  variant: PropTypes.oneOf(['bottle', 'machine']),
  label: PropTypes.string,
  minMs: PropTypes.number,
};
