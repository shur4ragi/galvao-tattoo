import { testimonials } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import styles from './styles.module.css';

// Aparece só quando houver depoimentos autorizados em data/site.js ({ quote, name }).
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section id="depoimentos" className={styles.section}>
      <div className="container">
        <SectionHead index="—" label="Depoimentos" title="Quem já" script="contou a sua." />
        <div className={styles.grid}>
          {testimonials.map((item, i) => (
            <figure key={item.name} className={styles.card} data-reveal style={{ '--delay': `${i * 0.08}s` }}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>{item.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
