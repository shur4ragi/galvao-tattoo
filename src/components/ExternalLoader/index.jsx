import { useCallback, useEffect, useRef, useState } from 'react';
import { openExternal } from '../../utils/openExternal.js';
import { lockScroll } from '../../utils/scrollLock.js';
import { DROP, MachineShape } from '../ui/TattooArt.jsx';
import styles from './styles.module.css';

const WAIT_MS = 1600;

const KINDS = {
  whatsapp: { title: 'Abrindo o WhatsApp', text: 'Sua mensagem já vai pronta, é só enviar.' },
  maps: { title: 'Abrindo o Google Maps', text: 'Rua Duque de Caxias, 112 — Centro, Taubaté.' },
  instagram: { title: 'Abrindo o Instagram', text: 'O perfil do Yuri no @galvaotattoo_.' },
};

function kindOf(href = '') {
  if (href.includes('wa.me') || href.includes('api.whatsapp.com')) return 'whatsapp';
  if (href.includes('google.com/maps') || href.includes('maps.app.goo.gl')) return 'maps';
  if (href.includes('instagram.com') || href.includes('instagr.am')) return 'instagram';
  return null;
}

// Tela de carregamento antes de sair do site para o WhatsApp, o Instagram ou o Google Maps.
// Intercepta os cliques em qualquer link desses destinos na página, sem precisar mexer em cada
// botão. Ctrl/Cmd + clique continua abrindo direto em nova aba.
export default function ExternalLoader() {
  const [pending, setPending] = useState(null); // { href, kind }
  const timer = useRef(0);
  const cancelRef = useRef(null);

  const show = useCallback((href) => {
    const kind = kindOf(href);
    if (!kind) {
      openExternal(href);
      return;
    }
    setPending({ href, kind });
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href]');
      if (!link || !kindOf(link.href)) return;
      e.preventDefault();
      show(link.href);
    };
    const onRequest = (e) => show(e.detail.href);
    document.addEventListener('click', onClick);
    window.addEventListener('galvao:external', onRequest);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('galvao:external', onRequest);
    };
  }, [show]);

  useEffect(() => {
    if (!pending) return undefined;
    const release = lockScroll();
    cancelRef.current?.focus();
    timer.current = setTimeout(() => {
      openExternal(pending.href);
      setPending(null);
    }, WAIT_MS);
    const onKey = (e) => e.key === 'Escape' && setPending(null);
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener('keydown', onKey);
      release();
    };
  }, [pending]);

  if (!pending) return null;
  const copy = KINDS[pending.kind];

  return (
    <div className={styles.overlay} role="alertdialog" aria-modal="true" aria-labelledby="saida-titulo" aria-describedby="saida-texto">
      <div className={styles.card}>
        {pending.kind === 'whatsapp' && <WhatsAppArt />}
        {pending.kind === 'maps' && <MapsArt />}
        {pending.kind === 'instagram' && <InstagramArt />}
        <p id="saida-titulo" className={styles.title}>{copy.title}</p>
        <p id="saida-texto" className={styles.text}>{copy.text}</p>
        <span className={styles.bar} aria-hidden="true">
          <i style={{ animationDuration: `${WAIT_MS}ms` }} />
        </span>
        <button ref={cancelRef} type="button" className="btn btn--soft" onClick={() => setPending(null)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

// Balão de conversa sendo "tatuado": a máquina pinga tinta e o contorno do balão se desenha.
function WhatsAppArt() {
  return (
    <svg className={styles.art} viewBox="0 0 220 150" aria-hidden="true" focusable="false">
      <path
        className={styles.draw}
        d="M40 40 Q40 22 58 22 H150 Q168 22 168 40 V86 Q168 104 150 104 H86 L62 124 L66 104 H58 Q40 104 40 86 Z"
        pathLength="1"
      />
      <circle className={styles.dot} cx="80" cy="63" r="6" />
      <circle className={styles.dot} cx="104" cy="63" r="6" style={{ animationDelay: '0.15s' }} />
      <circle className={styles.dot} cx="128" cy="63" r="6" style={{ animationDelay: '0.3s' }} />
      <g transform="translate(172 -34) scale(0.42) rotate(40 60 110)">
        <g className={styles.buzz}>
          <MachineShape />
        </g>
      </g>
      <g transform="translate(163 45)">
        <path className={styles.drip} d={DROP} />
      </g>
    </svg>
  );
}

// Gota de tinta caindo e virando o pino do mapa, com a rota tracejada se desenhando embaixo.
function MapsArt() {
  return (
    <svg className={styles.art} viewBox="0 0 220 150" aria-hidden="true" focusable="false">
      <path className={styles.route} d="M20 128 C60 112 80 140 118 124 S178 112 204 126" pathLength="1" />
      <g transform="translate(110 0)">
        <path
          className={styles.draw}
          d="M0 112 C-6 98 -30 76 -30 52 A30 30 0 0 1 30 52 C30 76 6 98 0 112 Z"
          pathLength="1"
        />
        <circle className={styles.fill} cx="0" cy="52" r="11" />
      </g>
      <g transform="translate(110 -6)">
        <path className={styles.fall} d={DROP} />
      </g>
      <ellipse className={styles.ripple} cx="110" cy="124" rx="16" ry="4" />
    </svg>
  );
}

// Moldura do Instagram se desenhando, com a máquina pingando tinta no canto.
function InstagramArt() {
  return (
    <svg className={styles.art} viewBox="0 0 220 150" aria-hidden="true" focusable="false">
      <rect className={styles.draw} x="52" y="18" width="116" height="116" rx="32" pathLength="1" />
      <circle className={styles.draw} cx="110" cy="76" r="30" pathLength="1" style={{ animationDelay: '0.22s' }} />
      <circle className={styles.dot} cx="148" cy="42" r="5" />
      <g transform="translate(168 -32) scale(0.42) rotate(40 60 110)">
        <g className={styles.buzz}>
          <MachineShape />
        </g>
      </g>
      <g transform="translate(158 44)">
        <path className={styles.drip} d={DROP} />
      </g>
    </svg>
  );
}
