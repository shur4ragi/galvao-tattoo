import { contact, nav } from '../../data/site.js';
import Mark from '../ui/Mark.jsx';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.cols}>
          <div>
            <h3><Mark /> / Seções</h3>
            <ul>
              {nav.map((item) => (
                <li key={item.href}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3><Mark /> / Redes</h3>
            <ul>
              <li><a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              {contact.facebook && (
                <li><a href={contact.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              )}
            </ul>
          </div>
          <p className={styles.place}>
            Galvão Tattoo
            <br />
            Taubaté — SP
          </p>
        </div>

        <p className={`condensed ${styles.word}`} aria-hidden="true">Galvão</p>

        <div className={styles.row}>
          <span>© {new Date().getFullYear()} Yuri Galvão Tattoo</span>
          <span>Fine Line · Black & Grey</span>
          <a href="#topo">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}
