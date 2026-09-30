import { useState } from 'react';
import { contact, contactForm, messages } from '../../data/site.js';
import { openWithLoader } from '../../utils/outbound.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import { ArrowIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from '../ui/icons.jsx';
import InkSkeleton from '../ui/InkSkeleton.jsx';
import Mark from '../ui/Mark.jsx';
import PixelEdge from '../ui/PixelEdge.jsx';
import Select from '../ui/Select.jsx';
import LocationModal from '../LocationModal/index.jsx';
import styles from './styles.module.css';

const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;

// (12) 99674-6924 enquanto digita.
function maskPhone(value) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function buildMessage({ name, phone, body, size, idea }) {
  return [
    `Oi Yuri! Vim pelo site e quero fazer uma tatuagem.`,
    `Nome: ${name}`,
    phone && `WhatsApp: ${phone}`,
    body && `Local do corpo: ${body}`,
    size && `Tamanho: ${size}`,
    `Ideia: ${idea}`,
  ].filter(Boolean).join('\n');
}

const EMPTY = { name: '', phone: '', body: '', size: '', idea: '' };

// Contato em uma tela: dados do studio com prévia do mapa (abre o modal de localização) e
// formulário que monta a mensagem e abre o WhatsApp pela tela de carregamento.
export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [mapOpen, setMapOpen] = useState(false);

  const set = (field) => (e) => {
    const value = field === 'phone' ? maskPhone(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Conte como podemos te chamar.';
    if (form.idea.trim().length < 8) next.idea = 'Escreva um pouco da sua ideia.';
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`contato-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    openWithLoader(whatsappUrl(contact.whatsapp, buildMessage({ ...form, name: form.name.trim(), idea: form.idea.trim() })));
  };

  return (
    <section id="contato" className={styles.section}>
      <div className={styles.edge}>
        <PixelEdge color="var(--ink)" />
      </div>
      <div className={styles.band}>
        <div className="container">
          <p className={styles.kicker} data-reveal>
            <Mark /> / Contato <span>05</span>
          </p>

          <div className={styles.grid}>
            <div className={styles.side}>
              <h2 className={styles.title} data-reveal>
                Conte sua história<span className="sign"> aqui</span>
              </h2>
              <p className={styles.lead} data-reveal>
                Mande a ideia, uma referência e o local do corpo. O Yuri responde com a proposta de arte e o orçamento.
              </p>

              <dl className={styles.info} data-reveal>
                <div>
                  <dt>Studio</dt>
                  <dd>
                    {contact.address}, {contact.city}
                    <button type="button" className={styles.inline} onClick={() => setMapOpen(true)}>
                      Ver localização <ArrowIcon />
                    </button>
                  </dd>
                </div>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a href={whatsappUrl(contact.whatsapp, messages.budget)} target="_blank" rel="noopener noreferrer">
                      {contact.whatsappLabel}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Redes</dt>
                  <dd className={styles.social}>
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                      <InstagramIcon /> {contact.instagramHandle}
                    </a>
                    {contact.facebook && (
                      <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
                        <FacebookIcon /> Yuri Galvão Tattoo
                      </a>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Horário</dt>
                  <dd>{contact.hours}</dd>
                </div>
              </dl>

              {/* Prévia do mapa: abre o modal de localização */}
              <button type="button" className={styles.mapCard} onClick={() => setMapOpen(true)} aria-label="Abrir mapa com a localização do studio" data-reveal>
                <iframe title="Prévia do mapa" src={MAP_EMBED} loading="lazy" tabIndex={-1} aria-hidden="true" />
                <InkSkeleton variant="machine" label="Carregando mapa" />
                <span className={styles.mapLabel}>
                  Ver localização <ArrowIcon />
                </span>
              </button>
            </div>

            <form className={styles.form} onSubmit={submit} noValidate data-reveal style={{ '--delay': '0.1s' }}>
              <p className={styles.formTitle}>Pedir orçamento</p>

              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Nome *</span>
                  <input
                    id="contato-name"
                    value={form.name}
                    onChange={set('name')}
                    autoComplete="name"
                    placeholder="Como te chamamos"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'erro-name' : undefined}
                  />
                  {errors.name && <em id="erro-name">{errors.name}</em>}
                </label>
                <label className={styles.field}>
                  <span>WhatsApp</span>
                  <input
                    value={form.phone}
                    onChange={set('phone')}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(12) 99999-9999"
                  />
                </label>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <span id="contato-body-label">Local do corpo</span>
                  <Select
                    value={form.body}
                    onChange={(value) => setForm((f) => ({ ...f, body: value }))}
                    options={contactForm.bodyParts}
                    labelledBy="contato-body-label"
                  />
                </div>
                <div className={styles.field}>
                  <span id="contato-size-label">Tamanho</span>
                  <Select
                    value={form.size}
                    onChange={(value) => setForm((f) => ({ ...f, size: value }))}
                    options={contactForm.sizes}
                    labelledBy="contato-size-label"
                  />
                </div>
              </div>

              <label className={styles.field}>
                <span>Sua ideia *</span>
                <textarea
                  id="contato-idea"
                  value={form.idea}
                  onChange={set('idea')}
                  rows={4}
                  placeholder="O que você quer tatuar e a história por trás."
                  aria-invalid={Boolean(errors.idea)}
                  aria-describedby={errors.idea ? 'erro-idea' : undefined}
                />
                {errors.idea && <em id="erro-idea">{errors.idea}</em>}
              </label>

              <button type="submit" className="btn btn--light">
                <WhatsAppIcon />
                Enviar pelo WhatsApp
              </button>
              <p className={styles.hint}>A mensagem abre pronta no WhatsApp. Referências em imagem você manda por lá.</p>
            </form>
          </div>
        </div>
      </div>

      {mapOpen && <LocationModal onClose={() => setMapOpen(false)} />}
    </section>
  );
}
