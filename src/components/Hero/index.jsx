import { useEffect, useRef, useState } from 'react';
import { about, contact, messages, sequence, specialties } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import FeatureIcon from './FeatureIcon.jsx';
import styles from './styles.module.css';

// Tempo de cada passo depois que a abertura de carregamento termina.
const STEP2_AT = 1700;
const STEP3_AT = 3500;

// Hero automático em três passos, no formato do wireframe:
// 1. página em branco com aspas; 2. painel preto desce e a moldura lateral aparece;
// 3. apresentação do Yuri (foto, texto e números) — é o "Sobre" do site.
// Rolar antes do fim pula direto para o passo 3.
export default function Hero() {
  const ref = useRef(null);
  const [step, setStep] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 3 : 1,
  );

  // Linha do tempo: começa quando a cortina da abertura sobe (ou já, se não houve abertura).
  useEffect(() => {
    if (step === 3) return undefined;
    const timers = [];
    const skip = () => setStep(3);
    const start = () => {
      timers.push(setTimeout(() => setStep(2), STEP2_AT));
      timers.push(setTimeout(() => setStep(3), STEP3_AT));
      // Só depois da abertura: rolar ou teclar pula direto para a apresentação.
      window.addEventListener('wheel', skip, { passive: true, once: true });
      window.addEventListener('touchmove', skip, { passive: true, once: true });
      window.addEventListener('keydown', skip, { once: true });
    };

    if (document.documentElement.classList.contains('intro-running')) {
      window.addEventListener('galvao:intro-done', start, { once: true });
    } else {
      start();
    }

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('galvao:intro-done', start);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('keydown', skip);
    };
    // A linha do tempo roda uma vez; o passo 3 encerra tudo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step === 3]);

  // Moldura lateral a partir do passo 2; cabeçalho escondido enquanto o hero ocupa a tela.
  useEffect(() => {
    const root = document.documentElement;
    if (step >= 2) root.classList.add('frame-on');

    const onScroll = () => {
      const bottom = ref.current?.getBoundingClientRect().bottom ?? 0;
      root.classList.toggle('seq-active', bottom > window.innerHeight * 0.45);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [step]);

  useEffect(() => () => document.documentElement.classList.remove('seq-active'), []);

  return (
    <section id="topo" ref={ref} className={styles.hero} data-step={step} aria-label="Sobre o Yuri Galvão">
      {/* Painel preto: desce no passo 2 e vira a apresentação no passo 3 */}
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
        <a className={styles.pill} href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
          Orçamento
        </a>
      </div>

      {/* Passo 3: o Sobre, com as aspas nos cantos */}
      <div className={styles.body}>
        <span className={styles.cornerOpen} aria-hidden="true">“</span>
        <div className={styles.about}>
          <figure className={styles.photo}>
            <div className={styles.frame}>
              <img src={about.photo} alt="Yuri Galvão tatuando no studio" width="464" height="464" />
              <InkSkeleton variant="machine" label="Preparando a máquina" />
            </div>
            <figcaption>
              <span>Studio privado</span>
              <span>Centro · Taubaté</span>
            </figcaption>
          </figure>

          <div className={styles.copy}>
            <p className={`sign ${styles.sign}`} aria-hidden="true">Yuri Galvão</p>
            {about.paragraphs.map((text) => (
              <p key={text} className={styles.text}>{text}</p>
            ))}

            <dl className={styles.facts}>
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="condensed">{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>

            <ul className={styles.skills} aria-label="Especialidades">
              {specialties.map((item) => (
                <li key={item.title}>
                  <FeatureIcon name={item.icon} />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className={styles.cornerClose} aria-hidden="true">”</span>
      </div>

      {/* Passos 1 e 2, por cima da primeira tela */}
      <div className={styles.stage} aria-hidden="true">
        <span className={`${styles.quote} ${styles.open}`}>“</span>
        <span className={`${styles.quote} ${styles.close}`}>”</span>
        <p className={styles.step1}>
          {sequence.step1[0]}
          <br />
          {sequence.step1[1]}
        </p>
        <p className={styles.step2}>{sequence.step2}</p>
        <p className={styles.hint}>
          {sequence.hint}
          <span>↓</span>
        </p>
      </div>
    </section>
  );
}
