import { useEffect, useRef, useState } from 'react';
import { about, contact, messages, sequence, specialties } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import FeatureIcon from './FeatureIcon.jsx';
import styles from './styles.module.css';

// Linha do tempo única (ms depois que a cortina da abertura começa a subir). As etapas se
// sobrepõem nas animações de CSS; aqui só marcamos quando a moldura aparece e quando acabou.
const FRAME_AT = 500;
const DONE_AT = 2700;

// Hero automático, no formato do wireframe:
// 1. página em branco com aspas; 2. o painel preto desce direto, com o vídeo, e a moldura
// lateral aparece; 3. apresentação do Yuri (foto, texto e números) — é o "Sobre" do site.
// Tudo anima só transform, opacity e clip-path, sem refazer o layout a cada quadro.
// Rolar ou teclar antes do fim pula direto para o estado final.
export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [phase, setPhase] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'idle',
  );

  useEffect(() => {
    if (phase === 'done') return undefined;
    const timers = [];
    const root = document.documentElement;
    const finish = () => setPhase('done');
    const start = () => {
      setPhase('play');
      // O vídeo recomeça junto com a descida do painel, para abrir sempre na corrida.
      const video = videoRef.current;
      if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
      timers.push(setTimeout(() => root.classList.add('frame-on'), FRAME_AT));
      timers.push(setTimeout(finish, DONE_AT));
      // Só depois da abertura: rolar ou teclar pula direto para a apresentação.
      window.addEventListener('wheel', finish, { passive: true, once: true });
      window.addEventListener('touchmove', finish, { passive: true, once: true });
      window.addEventListener('keydown', finish, { once: true });
    };

    if (root.classList.contains('intro-running')) {
      window.addEventListener('galvao:intro-done', start, { once: true });
    } else {
      start();
    }

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('galvao:intro-done', start);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchmove', finish);
      window.removeEventListener('keydown', finish);
    };
    // A linha do tempo roda uma vez; o estado final encerra tudo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 'done']);

  // Moldura lateral no fim; cabeçalho escondido enquanto o hero ocupa a tela.
  useEffect(() => {
    const root = document.documentElement;
    if (phase === 'done') root.classList.add('frame-on');

    const onScroll = () => {
      const bottom = ref.current?.getBoundingClientRect().bottom ?? 0;
      root.classList.toggle('seq-active', bottom > window.innerHeight * 0.45);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [phase]);

  useEffect(() => () => document.documentElement.classList.remove('seq-active'), []);

  // O vídeo só roda com o hero na tela e sem preferência por movimento reduzido.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="topo" ref={ref} className={styles.hero} data-phase={phase} aria-label="Sobre o Yuri Galvão">
      {/* Painel preto: desce no passo 2 e vira a apresentação no passo 3 */}
      <div className={styles.panel}>
        <div className={styles.panelBg} aria-hidden="true">
          {/* Vídeo editado (corrida ao amanhecer + bastidores da Valefest) no canto direito,
              escurecendo em direção ao texto. Sem movimento reduzido, fica só a foto. */}
          <video
            ref={videoRef}
            className={styles.video}
            src="/images/galvao-hero.mp4"
            poster="/images/galvao-hero.jpg"
            muted
            loop
            playsInline
            preload="auto"
            data-ready={videoReady}
            onCanPlay={() => setVideoReady(true)}
          />
        </div>
        <div className={styles.welcome}>
          <p className={styles.eyebrow}>{sequence.eyebrow}</p>
          <h1 className={styles.title}>
            {sequence.title[0]}
            <br />
            {sequence.title[1]}
          </h1>
          <p className={styles.subtitle}>{sequence.subtitle}</p>
        </div>
        <a className={`drip ${styles.pill}`} href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
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

      {/* Passo 1, por cima da primeira tela */}
      <div className={styles.stage} aria-hidden="true">
        <span className={`${styles.quote} ${styles.open}`}>“</span>
        <span className={`${styles.quote} ${styles.close}`}>”</span>
        <p className={styles.step1}>
          {sequence.step1[0]}
          <br />
          {sequence.step1[1]}
        </p>
        <p className={styles.hint}>
          {sequence.hint}
          <span>↓</span>
        </p>
      </div>
    </section>
  );
}
