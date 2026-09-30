import { contact, messages } from '../../data/site.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../ui/icons.jsx';
import styles from './styles.module.css';

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;

  return (
    <section id="contato" className={styles.section}>
      <div className="container">
        <p className={styles.label} data-reveal>
          <span>07</span>
          <i aria-hidden="true" />
          Contato
        </p>
        <h2 className={styles.title} data-reveal>
          Conte sua
          <span className="script"> história.</span>
        </h2>
        <a
          className={`btn ${styles.cta}`}
          href={whatsappUrl(contact.whatsapp, messages.budget)}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          <WhatsAppIcon />
          Pedir orçamento no WhatsApp
        </a>

        <div className={styles.grid}>
          <div className={styles.info} data-reveal>
            <div>
              <h3>Studio</h3>
              <p>
                {contact.address}
                <br />
                {contact.city}
              </p>
              <a className={styles.link} href={mapLink} target="_blank" rel="noopener noreferrer">Abrir no Maps</a>
            </div>
            <div>
              <h3>WhatsApp</h3>
              <p>
                <a href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">{contact.whatsappLabel}</a>
                <br />
                {contact.hours}
              </p>
            </div>
            <div>
              <h3>Redes</h3>
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
          </div>

          <div className={styles.map} data-reveal>
            <iframe
              title="Mapa: Rua Duque de Caxias, 112, Centro, Taubaté"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
