import { Fragment } from 'react';
import { contact, messages, names } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import Mark from '../ui/Mark.jsx';
import PixelEdge from '../ui/PixelEdge.jsx';
import styles from './styles.module.css';

const W = 1600;
const H = 900;
const INNER = { x: 520, y: 250, w: 560, h: 400 };
const RINGS = 12;
const RAYS = 14;

// Túnel em perspectiva: retângulos que se afastam em direção ao centro e raios ligando as bordas.
const TUNNEL = (() => {
  const lerp = (a, b, t) => a + (b - a) * t;
  const rings = [];
  for (let i = 0; i <= RINGS; i += 1) {
    const t = (i / RINGS) ** 1.8;
    rings.push({
      x: lerp(0, INNER.x, t),
      y: lerp(0, INNER.y, t),
      w: lerp(W, INNER.w, t),
      h: lerp(H, INNER.h, t),
    });
  }
  const rays = [];
  for (let i = 0; i <= RAYS; i += 1) {
    const t = i / RAYS;
    // Raios de cima/baixo e das laterais.
    rays.push([lerp(0, W, t), 0, lerp(INNER.x, INNER.x + INNER.w, t), INNER.y]);
    rays.push([lerp(0, W, t), H, lerp(INNER.x, INNER.x + INNER.w, t), INNER.y + INNER.h]);
    rays.push([0, lerp(0, H, t), INNER.x, lerp(INNER.y, INNER.y + INNER.h, t)]);
    rays.push([W, lerp(0, H, t), INNER.x + INNER.w, lerp(INNER.y, INNER.y + INNER.h, t)]);
  }
  return { rings, rays };
})();

export default function NamesPoster() {
  return (
    <section className={styles.section} aria-labelledby="cartaz-titulo">
      <svg className={styles.tunnel} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {TUNNEL.rings.map((r) => (
          <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={r.h} />
        ))}
        {TUNNEL.rays.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </svg>

      <div className={styles.poster}>
        <p id="cartaz-titulo" className={styles.kicker} data-reveal>
          <Mark /> Nomes que já ganharam traço
        </p>
        <ol className={styles.lines}>
          {names.map((row, i) => (
            <li key={row.join()} className="condensed" data-reveal style={{ '--delay': `${0.05 + i * 0.07}s`, '--i': i }}>
              {row.map((name, j) => (
                <Fragment key={name}>
                  {j > 0 && <Mark className={styles.sep} />}
                  <span>{name}</span>
                </Fragment>
              ))}
            </li>
          ))}
        </ol>
        <a
          className={`condensed ${styles.yours}`}
          href={whatsappUrl(contact.whatsapp, messages.budget)}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          style={{ '--delay': '0.4s' }}
        >
          + a sua história
        </a>
      </div>

      <div className={styles.edge}>
        <PixelEdge color="var(--paper)" />
      </div>
    </section>
  );
}
