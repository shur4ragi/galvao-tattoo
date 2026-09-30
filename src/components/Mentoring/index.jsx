import { useEffect, useRef, useState } from 'react';
import { contact, mentoring, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { ArrowIcon } from '../ui/icons.jsx';
import Mark from '../ui/Mark.jsx';
import styles from './styles.module.css';

const POUR_MS = 2600;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Copy({ inert = false }) {
  return (
    <div className={`container ${styles.layout}`}>
      <p className={styles.kicker}>
        <Mark /> / Para tatuadores
      </p>
      <h2 className={`condensed ${styles.title}`}>{mentoring.title}</h2>
      <div className={styles.side}>
        <p>{mentoring.text}</p>
        <a
          className="btn"
          href={whatsappUrl(contact.whatsapp, messages.mentoring)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={inert ? -1 : undefined}
        >
          {mentoring.cta}
          <ArrowIcon />
        </a>
      </div>
    </div>
  );
}

// Entrada da faixa: texto carvão no papel. Na primeira vez que o scroll chega, a tinta rosa
// escorre com o recorte dos botões e, na mesma borda, pinta as letras de gelo.
export default function Mentoring() {
  const ref = useRef(null);
  const [poured, setPoured] = useState(reducedMotion);
  const [done, setDone] = useState(reducedMotion);

  useEffect(() => {
    if (poured) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPoured(true);
        io.disconnect();
      },
      { threshold: 0, rootMargin: '0px 0px -32% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [poured]);

  useEffect(() => {
    if (!poured || done) return undefined;
    const timer = setTimeout(() => setDone(true), POUR_MS + 100);
    return () => clearTimeout(timer);
  }, [poured, done]);

  return (
    <section
      id="mentorias"
      ref={ref}
      className={`${styles.section} ${poured ? styles.poured : ''} ${done ? styles.done : ''}`}
    >
      <Copy />
      {!done && (
        <div className={styles.paint} aria-hidden="true">
          <div className={styles.paintFill}>
            <div className={styles.paintInner}>
              <Copy inert />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
