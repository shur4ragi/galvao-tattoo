import { useEffect, useRef } from 'react';
import { contact, messages, sequence, specialties } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import FeatureIcon from './FeatureIcon.jsx';
import styles from './styles.module.css';

const clamp = (v) => Math.min(1, Math.max(0, v));

// Primeira tela animada pela rolagem, em três passos:
// 1. papel em branco com aspas e "role para começar";
// 2. um painel preto desce, a moldura fecha nas laterais e as barras de progresso aparecem;
// 3. boas-vindas no bloco preto e as especialidades embaixo.
// A seção é alta e o conteúdo fica preso na tela; --a e --b guardam o avanço dos passos 2 e 3.
export default function ScrollIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      section.style.setProperty('--a', '1');
      section.style.setProperty('--b', '1');
      section.dataset.static = 'true';
      section.dataset.step = '3';
      return undefined;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const p = clamp(-rect.top / distance);
      section.style.setProperty('--p', p.toFixed(4));
      const a = clamp((p - 0.06) / 0.34);
      const b = clamp((p - 0.46) / 0.32);
      section.style.setProperty('--a', a.toFixed(4));
      section.style.setProperty('--b', b.toFixed(4));
      // Passo atual: libera o clique só no que está visível.
      section.dataset.step = b > 0.5 ? '3' : a > 0.3 ? '2' : '1';
      // O cabeçalho do site fica escondido enquanto a sequência ocupa a tela.
      root.classList.toggle('seq-active', rect.bottom > window.innerHeight + 2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.classList.remove('seq-active');
    };
  }, []);

  return (
    <section id="topo" ref={sectionRef} className={styles.section} aria-label="Boas-vindas">
      <div className={styles.sticky}>
        <div className={styles.card}>
          {/* Painel preto que desce do topo */}
          <div className={styles.panel}>
            <div className={styles.welcome}>
              <p className={styles.eyebrow}>{sequence.eyebrow}</p>
              <h1 className={styles.title}>
                {sequence.title[0]}
                <br />
                {sequence.title[1]}
              </h1>
              <p className={styles.subtitle}>{sequence.subtitle}</p>
            </div>
            <a
              className={styles.pill}
              href={whatsappUrl(contact.whatsapp, messages.budget)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Orçamento
            </a>
          </div>

          {/* Passo 1: aspas e a frase guardada */}
          <span className={`${styles.quote} ${styles.open}`} aria-hidden="true">“</span>
          <span className={`${styles.quote} ${styles.close}`} aria-hidden="true">”</span>
          <p className={styles.step1}>
            {sequence.step1[0]}
            <br />
            {sequence.step1[1]}
          </p>

          {/* Passo 2: o início */}
          <p className={styles.step2} aria-hidden="true">{sequence.step2}</p>

          {/* Passo 3: especialidades */}
          <div className={styles.features}>
            <span className={styles.cornerOpen} aria-hidden="true">“</span>
            <ul>
              {specialties.map((item) => (
                <li key={item.title}>
                  <FeatureIcon name={item.icon} />
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <span className={styles.cornerClose} aria-hidden="true">”</span>
          </div>

          <a className={styles.hint} href="#portfolio">
            {sequence.hint}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Barras de progresso nas laterais (passo 2) */}
        <div className={`${styles.rail} ${styles.railLeft}`} aria-hidden="true">
          <span className={styles.track}>
            <i />
          </span>
          <small>progresso</small>
        </div>
        <div className={`${styles.rail} ${styles.railRight}`} aria-hidden="true">
          <small>progresso</small>
          <span className={styles.arrow} />
        </div>
      </div>
    </section>
  );
}
