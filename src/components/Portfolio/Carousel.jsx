import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import styles from './Carousel.module.css';

const SPEED = 38; // px por segundo
const MAX_TILT = 36; // graus nas pontas

// Carrossel em parede côncava: a faixa corre sozinha e cada foto gira conforme a distância do
// centro, como se estivesse numa curva virada para quem olha. Pausa no hover, aceita arrastar.
export default function Carousel({ items, onOpen }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const state = useRef({ offset: 0, paused: false, drag: null, moved: false });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const s = state.current;
    let raf = 0;
    let last = performance.now();

    const frame = (now) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const half = track.scrollWidth / 2;
      if (!s.paused && !s.drag && !reduced) s.offset -= SPEED * dt;
      // Volta ao começo sem salto: a lista está duplicada.
      if (half > 0) {
        if (s.offset <= -half) s.offset += half;
        if (s.offset > 0) s.offset -= half;
      }
      track.style.transform = `translate3d(${s.offset}px, 0, 0)`;

      const vw = viewport.clientWidth;
      for (const el of track.children) {
        const center = el.offsetLeft + s.offset + el.offsetWidth / 2;
        const d = Math.max(-1.3, Math.min(1.3, (center - vw / 2) / (vw / 2)));
        const abs = Math.abs(d);
        el.style.transform = `rotateY(${-d * MAX_TILT}deg) scale(${1 + abs * 0.14})`;
        el.style.filter = `brightness(${1 - Math.min(abs, 1) * 0.55})`;
        el.style.zIndex = String(100 - Math.round(abs * 50));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e) => {
    state.current.drag = { x: e.clientX, offset: state.current.offset };
    state.current.moved = false;
  };
  const onPointerMove = (e) => {
    const { drag } = state.current;
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 5) state.current.moved = true;
    state.current.offset = drag.offset + dx;
  };
  const endDrag = () => {
    state.current.drag = null;
  };

  const loop = [...items, ...items];

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      onMouseEnter={() => { state.current.paused = true; }}
      onMouseLeave={() => { state.current.paused = false; endDrag(); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div ref={trackRef} className={styles.track}>
        {loop.map((item, i) => {
          const index = i % items.length;
          const copy = i >= items.length;
          return (
            <button
              key={`${item.src}-${i}`}
              type="button"
              className={styles.item}
              tabIndex={copy ? -1 : undefined}
              aria-hidden={copy || undefined}
              aria-label={`Ampliar: ${item.alt}`}
              onClick={() => { if (!state.current.moved) onOpen(index); }}
            >
              <img src={item.src} alt="" draggable="false" width="464" height="464" loading={i < 6 ? undefined : 'lazy'} />
              <InkSkeleton />
            </button>
          );
        })}
      </div>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string })).isRequired,
  onOpen: PropTypes.func.isRequired,
};
