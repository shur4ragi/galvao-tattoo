import { contact, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../ui/icons.jsx';
import Mark from '../ui/Mark.jsx';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import PixelEdge from '../ui/PixelEdge.jsx';
import styles from './styles.module.css';

// Herói final em limão: chamada gigante, dados do studio e mapa. O rodapé continua na mesma cor.
export default function Contact() {
  const budgetHref = whatsappUrl(contact.whatsapp, messages.budget);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;

  return (
    <section id="contato" className={styles.section}>
      <div className={styles.edge}>
        <PixelEdge color="var(--lime)" />
      </div>
      <div className={styles.band}>
        <div className="container">
          <p className={styles.kicker} data-reveal>
            <Mark /> / Contato <span>07</span>
          </p>

          <h2 className={`condensed ${styles.title}`} data-reveal>
            Conte sua
            <br />
            história<span className="sign">aqui</span>
          </h2>

          <div className={styles.row} data-reveal>
            <p className={styles.lead}>
              Mande a ideia, uma referência e o local do corpo. O Yuri responde com a proposta de arte e o orçamento.
            </p>
            <a className="btn" href={budgetHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              Pedir orçamento no WhatsApp
            </a>
          </div>

          <div className={styles.grid}>
            <div className={styles.col} data-reveal>
              <h3>/ Studio</h3>
              <p>
                {contact.address}
                <br />
                {contact.city}
              </p>
              <a className={styles.link} href={mapLink} target="_blank" rel="noopener noreferrer">Abrir no Maps →</a>
            </div>
            <div className={styles.col} data-reveal style={{ '--delay': '0.06s' }}>
              <h3>/ WhatsApp</h3>
              <p>
                <a href={budgetHref} target="_blank" rel="noopener noreferrer">{contact.whatsappLabel}</a>
                <br />
                {contact.hours}
              </p>
            </div>
            <div className={styles.col} data-reveal style={{ '--delay': '0.12s' }}>
              <h3>/ Redes</h3>
              <ul className={styles.social}>
                <li>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon /> {contact.instagramHandle}
                  </a>
                </li>
                {contact.facebook && (
                  <li>
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
                      <FacebookIcon /> Yuri Galvão Tattoo
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className={styles.map} data-reveal style={{ '--delay': '0.18s' }}>
              <iframe
                title="Mapa: Rua Duque de Caxias, 112, Centro, Taubaté"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <InkSkeleton variant="machine" label="Carregando mapa" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
