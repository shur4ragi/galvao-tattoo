import { useState } from 'react';
import { faq } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import styles from './styles.module.css';

// Acordeão: uma pergunta aberta por vez, abrindo e fechando com a altura animada.
export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section id="duvidas" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <SectionHead index="04" label="Dúvidas" title={<><b>Antes</b> de marcar.</>} />

        <div className={styles.list}>
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                // Estado em data-open: trocar className apagaria a classe is-in da entrada ao rolar.
                className={styles.item}
                data-open={isOpen}
                data-reveal
                style={{ '--delay': `${i * 0.05}s` }}
              >
                <h3 className={styles.heading}>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <i aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={styles.panel} inert={!isOpen}>
                  <div className={styles.inner}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
