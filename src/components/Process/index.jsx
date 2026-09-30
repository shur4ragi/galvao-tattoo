import { contact, messages, process } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import SectionHead from '../ui/SectionHead.jsx';
import { WhatsAppIcon } from '../ui/icons.jsx';
import styles from './styles.module.css';

// Passo a passo em fundo preto: números vazados sobre uma linha que se completa ao aparecer,
// como a barra de progresso da primeira tela.
export default function Process() {
  return (
    <section id="processo" className={styles.section}>
      <div className="container">
        <SectionHead
          index="03"
          label="Como funciona"
          title={<>Da ideia <b>à pele,</b> em quatro passos.</>}
          aside="Sem arte pronta de catálogo: cada desenho é feito depois da conversa."
        />

        <ol className={styles.steps} data-reveal>
          {process.map((step, i) => (
            <li key={step.title} style={{ '--i': i }}>
              <span className={styles.dot} aria-hidden="true" />
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
          <a className="btn btn--light" href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Conte sua história
          </a>
        </div>
      </div>
    </section>
  );
}
