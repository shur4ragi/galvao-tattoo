import styles from './styles.module.css';

const WORDS = ['Fine Line', 'Black & Grey', 'Lettering', 'Floral', 'Realismo', 'Cobertura de cicatriz', 'Homenagens'];

export default function Marquee() {
  const row = (hidden) => (
    <div className={styles.row} aria-hidden={hidden || undefined}>
      {WORDS.map((word) => (
        <span key={word}>
          {word}
          <i aria-hidden="true">✦</i>
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
