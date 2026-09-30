import { about } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import styles from './styles.module.css';

export default function About() {
  return (
    <section id="sobre" className={styles.section}>
      <div className="container">
        <SectionHead index="05" label="Sobre" title={<><b>Yuri Galvão,</b> tatuador em Taubaté.</>} />

        <div className={styles.layout}>
          <figure className={styles.photo} data-reveal>
            <img src={about.photo} alt="Yuri Galvão tatuando no studio" loading="lazy" width="464" height="464" />
            <figcaption>
              <span>Studio privado</span>
              <span>Centro · Taubaté</span>
            </figcaption>
          </figure>

          <div className={styles.copy}>
            <p className="sign" aria-hidden="true">Yuri Galvão</p>
            {about.paragraphs.map((text, i) => (
              <p key={text} className={styles.text} data-reveal style={{ '--delay': `${i * 0.08}s` }}>{text}</p>
            ))}

            <dl className={styles.facts}>
              {about.facts.map((fact, i) => (
                <div key={fact.label} data-reveal style={{ '--delay': `${0.1 + i * 0.08}s` }}>
                  <dt className="condensed">{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>

            <img className={`bw ${styles.detail}`} src={about.detail} alt="Retrato em black & grey sendo finalizado" loading="lazy" width="464" height="464" data-reveal />
          </div>
        </div>
      </div>
    </section>
  );
}
