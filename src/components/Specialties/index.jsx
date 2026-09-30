import { specialties } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import styles from './styles.module.css';

export default function Specialties() {
  return (
    <section id="especialidades" className={styles.section}>
      <div className="container">
        <SectionHead
          index="01"
          label="Especialidades"
          title="Traço fino,"
          script="sombra no tempo certo."
          aside="Quatro linguagens, uma assinatura. Cada projeto nasce de uma conversa e é desenhado do zero."
        />

        <ol className={styles.list}>
          {specialties.map((item, i) => (
            <li key={item.title} className={styles.item} data-reveal style={{ '--delay': `${i * 0.06}s` }}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.copy}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <div className={styles.thumbs}>
                {item.images.map((src, j) => (
                  <img key={src} src={src} alt="" loading="lazy" width="464" height="464" style={{ '--j': j }} />
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
