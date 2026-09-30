import { useEffect, useState } from 'react';
import { contact, hero, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { ArrowIcon, WhatsAppIcon } from '../ui/icons.jsx';
import Mark from '../ui/Mark.jsx';
import styles from './styles.module.css';

const SLIDE_MS = 3800;

// Quadro de fotos que troca sozinho, com barra de progresso e botão de pausa.
function Slideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const total = hero.slides.length;

  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % total), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused, total]);

  return (
    <figure className={styles.slideshow} aria-roledescription="carrossel" aria-label="Trabalhos do Yuri">
      <div className={styles.slides}>
        {hero.slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.label}
            width="464"
            height="464"
            className={i === index ? styles.current : ''}
            aria-hidden={i !== index}
            loading={i === 0 ? undefined : 'lazy'}
          />
        ))}
        <span className={styles.sticker}>
          <Mark /> Arte exclusiva
        </span>
      </div>

      <figcaption className={styles.controls}>
        <span className={styles.counter}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className={styles.caption}>{hero.slides[index].label}</span>
        <button
          type="button"
          className={styles.pause}
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Continuar fotos' : 'Pausar fotos'}
        >
          {paused ? '▶' : 'II'}
        </button>
        <span className={styles.progress} aria-hidden="true">
          {hero.slides.map((slide, i) => (
            <i
              key={slide.src}
              className={i < index ? styles.done : i === index ? (paused ? styles.done : styles.running) : ''}
              style={{ '--ms': `${SLIDE_MS}ms` }}
            />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section id="topo" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <ul className={styles.meta}>
          {hero.meta.map((item, i) => (
            <li key={item} data-reveal style={{ '--delay': `${i * 0.05}s` }}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {item}
            </li>
          ))}
        </ul>

        <div className={styles.copy}>
          <h1 className={`condensed ${styles.title}`}>
            <span className={styles.lineWrap}><span style={{ '--d': '0.05s' }}>{hero.titleTop}</span></span>
            <span className={styles.lineWrap}>
              <span style={{ '--d': '0.15s' }}>
                <mark>{hero.titleMid}</mark>
              </span>
            </span>
          </h1>
          <p className={`sign ${styles.signature}`} aria-hidden="true">{hero.signature}</p>

          <div className={styles.bottom}>
            <p className={styles.subtitle} data-reveal style={{ '--delay': '0.2s' }}>{hero.subtitle}</p>
            <div className={styles.actions} data-reveal style={{ '--delay': '0.28s' }}>
              <a className="btn" href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Pedir orçamento
              </a>
              <a className="btn btn--outline" href="#portfolio">
                Ver portfólio
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.aside} data-reveal style={{ '--delay': '0.2s' }}>
          <Slideshow />
        </div>
      </div>
    </section>
  );
}
