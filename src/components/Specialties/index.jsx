import { specialties } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import styles from './styles.module.css';

export default function Specialties() {
  return (
    <section id="especialidades" className={styles.section}>
      <div className="container">
        <SectionHead
          index="01"
          label="Especialidades"
          title={<><b>Traço fino,</b> sombra no tempo certo.</>}
          aside="Quatro linguagens, uma assinatura. Cada projeto nasce de uma conversa e é desenhado do zero."
        />

        <ol className={styles.grid}>
          {specialties.map((item, i) => (
            <li key={item.title} className={styles.card} data-reveal style={{ '--delay': `${i * 0.07}s` }}>
              <div className={styles.media}>
                <img className="bw" src={item.images[0]} alt="" loading="lazy" width="464" height="464" />
                <img className={styles.alt} src={item.images[1]} alt="" loading="lazy" width="464" height="464" />
                <InkSkeleton />
              </div>
              <div className={styles.info}>
                <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="condensed">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
