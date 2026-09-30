import { useEffect, useState } from 'react';
import { announcement, contact, messages, nav } from '../../data/site.js';
import { lockScroll } from '../../utils/scrollLock.js';
import { whatsappUrl } from '../../utils/whatsapp.js';
import Mark from '../ui/Mark.jsx';
import styles from './styles.module.css';

const clockFormat = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'America/Sao_Paulo',
});

function useClock() {
  const [now, setNow] = useState(() => clockFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(clockFormat.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const clock = useClock();
  const budgetHref = whatsappUrl(contact.whatsapp, messages.budget);

  useEffect(() => {
    if (!open) return undefined;
    const release = lockScroll();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 1020 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      release();
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <a className={styles.announce} href={budgetHref} target="_blank" rel="noopener noreferrer">
        <Mark />
        <span>{announcement}</span>
        <span aria-hidden="true">→</span>
      </a>

      <div className={styles.bar}>
        <a href="#topo" className={styles.logo} onClick={close}>
          Galvão<span className="sign">tattoo</span>
        </a>

        <nav className={styles.nav} aria-label="Seções">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className={styles.meta}>
          <span className={styles.clock}>
            Taubaté <b>{clock}</b>
          </span>
          <a className={`drip ${styles.cta}`} href={budgetHref} target="_blank" rel="noopener noreferrer">
            Orçamento
          </a>
          <button
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className={styles.drawer}>
          <nav aria-label="Seções">
            {nav.map((item, i) => (
              <a key={item.href} href={item.href} onClick={close} style={{ '--i': i }}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="btn" href={budgetHref} target="_blank" rel="noopener noreferrer" onClick={close}>
            Pedir orçamento no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
