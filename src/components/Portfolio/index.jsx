import { useMemo, useState } from 'react';
import { filters, portfolio } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import Lightbox from './Lightbox.jsx';
import styles from './styles.module.css';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const items = useMemo(
    () => (filter === 'all' ? portfolio : portfolio.filter((item) => item.tags.includes(filter))),
    [filter],
  );

  const counts = useMemo(() => {
    const result = { all: portfolio.length };
    portfolio.forEach((item) => item.tags.forEach((tag) => { result[tag] = (result[tag] || 0) + 1; }));
    return result;
  }, []);

  return (
    <section id="portfolio" className={styles.section}>
      <div className="container">
        <SectionHead
          index="02"
          label="Portfólio"
          title={<><b>Trabalhos</b> recentes.</>}
          aside="Toque em uma foto para ver em tela cheia e em cor."
        />

        <div className={styles.filters} role="group" aria-label="Filtrar portfólio" data-reveal>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={filter === f.id ? styles.active : ''}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
              <sup>{counts[f.id] || 0}</sup>
            </button>
          ))}
        </div>

        <ul className={styles.grid} key={filter}>
          {items.map((item, i) => (
            <li key={item.src} className={item.tall ? styles.tall : ''} data-reveal style={{ '--delay': `${(i % 4) * 0.05}s` }}>
              <button type="button" className={styles.card} onClick={() => setOpenIndex(i)} aria-label={`Ampliar: ${item.alt}`}>
                <img className="bw" src={item.src} alt={item.alt} loading="lazy" width="464" height="464" />
                <InkSkeleton />
                <span className={styles.caption}>
                  <span>{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                  <span>{item.alt}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {openIndex !== null && (
        <Lightbox items={items} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}
