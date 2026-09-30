import { contact } from '../../data/site.js';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.word} aria-hidden="true">Galvão</p>
        <div className={styles.row}>
          <span>© {new Date().getFullYear()} Yuri Galvão Tattoo</span>
          <span>Fine Line · Black & Grey · Taubaté — SP</span>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer">{contact.instagramHandle}</a>
          <a href="#topo">Voltar ao topo ↑</a>
        </div>
      </div>
    </footer>
  );
}
