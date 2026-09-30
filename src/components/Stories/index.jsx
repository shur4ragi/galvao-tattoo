import { stories } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import styles from './styles.module.css';

export default function Stories() {
  if (!stories.length) return null;

  return (
    <section id="historias" className={styles.section}>
      <div className="container">
        <SectionHead
          index="02"
          label="Histórias"
          title={<>Produzindo <b>com propósito.</b></>}
          aside="Nomes, datas e homenagens. Cada peça começou com alguém contando por que ela importava."
        />

        <div className={styles.grid}>
          {stories.map((story, i) => (
            <article key={story.name} className={styles.card} data-reveal style={{ '--delay': `${i * 0.08}s` }}>
              <div className={styles.media}>
                <img className="bw" src={story.src} alt={`Tatuagem: ${story.name}`} loading="lazy" width="464" height="464" />
                <InkSkeleton />
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="sign">{story.name}</h3>
              <p>{story.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
