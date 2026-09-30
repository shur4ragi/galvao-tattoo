import { stories } from '../../data/site.js';
import SectionHead from '../ui/SectionHead.jsx';
import styles from './styles.module.css';

export default function Stories() {
  if (!stories.length) return null;

  return (
    <section id="historias" className={styles.section}>
      <div className="container">
        <SectionHead
          index="03"
          label="Histórias"
          title="Produzindo"
          script="com propósito."
          aside="Nomes, datas e homenagens. Cada uma dessas peças começou com alguém contando por que ela importava."
        />

        <div className={styles.grid}>
          {stories.map((story, i) => (
            <article key={story.name} className={styles.card} data-reveal style={{ '--delay': `${i * 0.1}s` }}>
              <div className={styles.media}>
                <img src={story.src} alt={`Tatuagem: ${story.name}`} loading="lazy" width="464" height="464" />
              </div>
              <h3 className="script">{story.name}</h3>
              <p>{story.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
