import { contact, mentoring, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { ArrowIcon } from '../ui/icons.jsx';
import Mark from '../ui/Mark.jsx';
import styles from './styles.module.css';

// Faixa rosa para tatuadores, separada do público principal.
export default function Mentoring() {
  return (
    <section id="mentorias" className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <p className={styles.kicker} data-reveal>
          <Mark /> / Para tatuadores
        </p>
        <h2 className={`condensed ${styles.title}`} data-reveal>{mentoring.title}</h2>
        <div className={styles.side} data-reveal style={{ '--delay': '0.1s' }}>
          <p>{mentoring.text}</p>
          <a className="btn" href={whatsappUrl(contact.whatsapp, messages.mentoring)} target="_blank" rel="noopener noreferrer">
            {mentoring.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
