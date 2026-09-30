import { manifesto } from '../../data/site.js';
import Mark from '../ui/Mark.jsx';
import PixelEdge from '../ui/PixelEdge.jsx';
import { rich } from '../ui/rich.jsx';
import styles from './styles.module.css';

// Herói verde: manifesto em texto largo e uma faixa de fotos de ponta a ponta.
export default function Manifesto() {
  return (
    <section className={styles.section} aria-label={manifesto.label}>
      <PixelEdge color="var(--lime)" />
      <div className={styles.band}>
        <div className="container">
          <p className={styles.kicker} data-reveal>
            <Mark /> {manifesto.label}
          </p>
          <p className={`wide ${styles.text}`} data-reveal style={{ '--delay': '0.08s' }}>
            {rich(manifesto.text)}
          </p>
          <p className={`condensed ${styles.sub}`} data-reveal style={{ '--delay': '0.16s' }}>
            {manifesto.sub}
          </p>
        </div>
      </div>
      <div className={styles.photos}>
        {manifesto.images.map((src, i) => (
          <div key={src} className={styles.photo} data-reveal style={{ '--delay': `${i * 0.08}s` }}>
            <img className="bw" src={src} alt="" loading="lazy" width="464" height="464" />
          </div>
        ))}
      </div>
      <div className={styles.pattern} aria-hidden="true" />
    </section>
  );
}
