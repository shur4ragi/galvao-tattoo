import PropTypes from 'prop-types';
import styles from './SectionHead.module.css';

// Cabeçalho numerado das seções: "03 — Portfólio" em cima, título grande embaixo.
export default function SectionHead({ index, label, title, script, aside }) {
  return (
    <header className={styles.head}>
      <p className={styles.label} data-reveal>
        <span>{index}</span>
        <i aria-hidden="true" />
        {label}
      </p>
      <div className={styles.row}>
        <h2 className={styles.title} data-reveal style={{ '--delay': '0.08s' }}>
          {title}
          {script && <span className="script"> {script}</span>}
        </h2>
        {aside && (
          <div className={styles.aside} data-reveal style={{ '--delay': '0.16s' }}>
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}

SectionHead.propTypes = {
  index: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  script: PropTypes.string,
  aside: PropTypes.node,
};
