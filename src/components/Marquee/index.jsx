import Mark from '../ui/Mark.jsx';
import styles from './styles.module.css';

const WORDS = ['Fine Line', 'Black & Grey', 'Lettering', 'Floral', 'Realismo', 'Cobertura de cicatriz', 'Homenagens'];

// Faixa preta que corre logo depois da primeira tela.
export default function Marquee() {
  const row = (hidden) => (
    <div className={styles.row} aria-hidden={hidden || undefined}>
      {WORDS.map((word) => (
        <span key={word}>
          {word}
          <Mark />
        </span>
      ))}
    </div>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
