import { about } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import styles from './styles.module.css';

export default function About() {
  return (
    <section id="sobre" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.photos} data-reveal>
          <img className={styles.main} src={about.photo} alt="Yuri Galvão tatuando no studio" loading="lazy" width="464" height="464" />
          <img className={styles.detail} src={about.detail} alt="Retrato em black & grey sendo finalizado" loading="lazy" width="464" height="464" />
          <span className={styles.tag}>Studio privado · Taubaté</span>
        </div>

        <div>
          <SectionHead index="05" label="Sobre" title="Yuri" script="Galvão." />
          {about.paragraphs.map((text, i) => (
            <p key={text} className={styles.text} data-reveal style={{ '--delay': `${i * 0.08}s` }}>{text}</p>
          ))}

          <dl className={styles.facts}>
            {about.facts.map((fact, i) => (
              <div key={fact.label} data-reveal style={{ '--delay': `${0.1 + i * 0.08}s` }}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
