import PropTypes from 'prop-types';
import Mark from './Mark.jsx';
import styles from './SectionHead.module.css';

// Cabeçalho das seções: "✦ / Portfólio ........ 02" sobre uma linha fina e o título largo abaixo.
// A cor vem do texto da seção, então funciona em fundo claro, escuro ou colorido.
export default function SectionHead({ index, label, title, aside }) {
  return (
    <header className={styles.head}>
      <div className={styles.bar} data-reveal>
        <Mark />
        <span>/ {label}</span>
        {index && <span className={styles.index}>{index}</span>}
      </div>
      <div className={styles.row}>
        <h2 className={`wide ${styles.title}`} data-reveal style={{ '--delay': '0.06s' }}>{title}</h2>
        {aside && (
          <p className={`small-caps ${styles.aside}`} data-reveal style={{ '--delay': '0.12s' }}>{aside}</p>
        )}
      </div>
    </header>
  );
}

SectionHead.propTypes = {
  index: PropTypes.string,
  label: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  aside: PropTypes.node,
};
