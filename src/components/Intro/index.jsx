import { useEffect, useLayoutEffect, useState } from 'react';
import { lockScroll } from '../../utils/scrollLock.js';
import styles from './styles.module.css';

const SEEN_KEY = 'galvao:intro';
const STEPS = ['3', '2', '1'];

function shouldSkip() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

// Abertura de película: contagem 3 · · 2 · · 1, uma linha fina corre e a cortina sobe.
// Roda uma vez por sessão e não aparece para quem prefere menos movimento.
export default function Intro() {
  const [visible, setVisible] = useState(() => !shouldSkip());
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  // O título do hero espera a cortina subir antes de entrar.
  useLayoutEffect(() => {
    if (visible) document.documentElement.style.setProperty('--intro-delay', '1.4s');
  }, [visible]);

  useEffect(() => {
    if (!visible) return undefined;
    const release = lockScroll();
    const timers = [
      setTimeout(() => setStep(1), 420),
      setTimeout(() => setStep(2), 840),
      setTimeout(() => {
        setLeaving(true);
        release();
      }, 1350),
      setTimeout(() => {
        setVisible(false);
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch {
          // Sem armazenamento: a abertura volta a aparecer na próxima visita.
        }
      }, 2250),
    ];
    return () => {
      timers.forEach(clearTimeout);
      release();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`${styles.intro} ${leaving ? styles.leave : ''}`} aria-hidden="true">
      <div className={styles.count}>
        {STEPS.map((n, i) => (
          <span key={n} className={i <= step ? styles.on : ''}>
            {n}
            {i < STEPS.length - 1 && <em> · · </em>}
          </span>
        ))}
      </div>
      <div className={styles.line} />
      <p className={styles.name}>
        Yuri Galvão <span className="script">tattoo</span>
      </p>
    </div>
  );
}
