import { quote } from '../../data/site.js';
import styles from './styles.module.css';

// Citação curta e discreta, com as mesmas aspas cinza da primeira tela.
export default function Quote() {
  return (
    <section className={styles.section} aria-label="Citação">
      <figure className={`container ${styles.figure}`} data-reveal>
        <span className={styles.mark} aria-hidden="true">“</span>
        <blockquote>{quote.text}</blockquote>
        <figcaption>— {quote.author}</figcaption>
      </figure>
    </section>
  );
}
