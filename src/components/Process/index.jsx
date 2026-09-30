import { contact, messages, process } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import SectionHead from '../ui/SectionHead.jsx';
import { WhatsAppIcon } from '../ui/icons.jsx';
import styles from './styles.module.css';

export default function Process() {
  return (
    <section id="processo" className={styles.section}>
      <div className="container">
        <SectionHead index="04" label="Como funciona" title="Da ideia" script="à pele, em quatro passos." />

        <ol className={styles.steps}>
          {process.map((step, i) => (
            <li key={step.title} data-reveal style={{ '--delay': `${i * 0.1}s` }}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.cta} data-reveal>
          <p>
            O primeiro passo é seu. <span className="script">Conte sua história.</span>
          </p>
          <a className="btn" href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Conte sua história
          </a>
        </div>
      </div>
    </section>
  );
}
