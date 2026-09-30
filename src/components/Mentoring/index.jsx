import { contact, mentoring, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { ArrowIcon } from '../ui/icons.jsx';
import styles from './styles.module.css';

export default function Mentoring() {
  return (
    <section id="mentorias" className={styles.section}>
      <div className="container">
        <div className={styles.box} data-reveal>
          <span className={styles.kicker}>Para tatuadores</span>
          <div className={styles.body}>
            <h2>{mentoring.title}</h2>
            <p>{mentoring.text}</p>
          </div>
          <a className="btn btn--ghost" href={whatsappUrl(contact.whatsapp, messages.mentoring)} target="_blank" rel="noopener noreferrer">
            {mentoring.cta}
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
