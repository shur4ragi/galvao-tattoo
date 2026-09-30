import { contact, hero, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { ArrowIcon, WhatsAppIcon } from '../ui/icons.jsx';
import styles from './styles.module.css';

export default function Hero() {
  return (
    <section id="topo" className={styles.hero}>
      <div className="container">
        <div className={styles.meta} data-reveal>
          <span>{hero.eyebrow}</span>
          <i aria-hidden="true" />
          <span>Taubaté — SP</span>
        </div>

        <div className={styles.head}>
          <figure className={styles.portrait} data-reveal style={{ '--delay': '0.25s' }}>
            <img src={hero.portrait} alt="Yuri Galvão tatuando no studio" width="464" height="464" fetchpriority="high" />
            <figcaption>
              <span>Yuri Galvão</span>
              <span>No studio</span>
            </figcaption>
          </figure>

          <h1 className={styles.title}>
            <span className={styles.lineWrap}><span style={{ '--d': '0.05s' }}>{hero.titleTop}</span></span>
            <span className={styles.lineWrap}><span style={{ '--d': '0.15s' }}>{hero.titleMid}</span></span>
            <span className={`${styles.lineWrap} ${styles.scriptLine}`}>
              <span className="script" style={{ '--d': '0.3s' }}>{hero.titleScript}</span>
            </span>
          </h1>
        </div>

        <div className={styles.row}>
          <p className={styles.subtitle} data-reveal style={{ '--delay': '0.2s' }}>{hero.subtitle}</p>
          <div className={styles.actions} data-reveal style={{ '--delay': '0.3s' }}>
            <a className="btn" href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Pedir orçamento no WhatsApp
            </a>
            <a className="btn btn--ghost" href="#portfolio">
              Ver portfólio
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.strip} data-reveal style={{ '--delay': '0.35s' }}>
        <div className={styles.frames}>
          {hero.frames.map((frame, i) => (
            <figure key={frame.src} className={styles.frame}>
              <img src={frame.src} alt={frame.alt} width="464" height="464" loading={i > 2 ? 'lazy' : undefined} />
              <figcaption>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span>GALVÃO · {String(i + 1).padStart(2, '0')}A</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
