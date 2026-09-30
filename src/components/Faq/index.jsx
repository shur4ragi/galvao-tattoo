import { faq } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import styles from './styles.module.css';

export default function Faq() {
  return (
    <section id="duvidas" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <SectionHead index="05" label="Dúvidas" title={<><b>Antes</b> de marcar.</>} />

        <div className={styles.list}>
          {faq.map((item, i) => (
            <details key={item.q} className={styles.item} data-reveal style={{ '--delay': `${i * 0.05}s` }}>
              <summary>
                <span>{item.q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
