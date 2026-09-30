import { contact, messages, process } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import SectionHead from '../ui/SectionHead.jsx';
import { WhatsAppIcon } from '../ui/icons.jsx';
import styles from './styles.module.css';

// Herói azul: os quatro passos, com números grandes em limão.
export default function Process() {
  return (
    <section id="processo" className={styles.section}>
      <div className="container">
        <SectionHead
          index="04"
          label="Como funciona"
          title={<>Da ideia <b>à pele,</b> em quatro passos.</>}
          aside="Sem arte pronta de catálogo: cada desenho é feito depois da conversa."
        />

        <ol className={styles.steps}>
          {process.map((step, i) => (
            <li key={step.title} data-reveal style={{ '--delay': `${i * 0.08}s` }}>
              <span className={`condensed ${styles.num}`}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.cta} data-reveal>
          <p className="wide">
            O primeiro passo <b>é seu.</b>
          </p>
          <a className="btn btn--lime" href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Conte sua história
          </a>
        </div>
      </div>
    </section>
  );
}
