import { useEffect, useRef, useState } from 'react';
import { lockScroll } from '../../utils/scrollLock.js';
import { DROP, MachineShape, Puddle } from '../ui/TattooArt.jsx';
import styles from './styles.module.css';

// Tempo mínimo na tela (para a animação ter começo, meio e fim) e máximo (rede lenta não prende a visita).
const MIN_MS = 1800;
const MAX_MS = 6000;
const FINISH_MS = 450;
const FLOOD_MS = 750;
const LEAVE_MS = 850;

// Ponta da agulha e centro da poça no desenho (viewBox 0 0 300 340).
const TIP = { x: 37, y: 184 };
const PUDDLE = { x: 72, y: 300 };

function shouldSkip() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Abertura de carregamento: a máquina vibra, a tinta pinga da agulha e a poça cresce com o
// progresso real (página e fontes). No 100% a poça inunda a tela e a cortina sobe.
export default function Intro() {
  const [visible, setVisible] = useState(() => !shouldSkip());
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('load');
  const [origin, setOrigin] = useState({ x: '50%', y: '60%' });
  const stageRef = useRef(null);

  // Carregamento: a barra corre até 88% sozinha e só fecha quando a página e as fontes chegaram.
  useEffect(() => {
    if (!visible) return undefined;
    const release = lockScroll();
    const root = document.documentElement;
    root.classList.add('intro-running');

    let pageReady = document.readyState === 'complete';
    let fontsReady = !document.fonts;
    const onLoad = () => { pageReady = true; };
    window.addEventListener('load', onLoad);
    document.fonts?.ready.then(() => { fontsReady = true; });

    // Progresso pelo tempo (não por quadro), para correr igual em aparelho lento ou rápido.
    const start = performance.now();
    let value = 0;
    let readyAt = 0;
    let readyFrom = 0;
    let raf = 0;
    const tick = (now) => {
      const elapsed = now - start;
      if (!readyAt && ((pageReady && fontsReady && elapsed > MIN_MS) || elapsed > MAX_MS)) {
        readyAt = now;
        readyFrom = value;
        // A tinta nasce do centro da poça. A origem é definida antes da inundação começar,
        // senão o círculo desliza do ponto padrão até a poça.
        const box = stageRef.current?.getBoundingClientRect();
        if (box) {
          setOrigin({
            x: `${box.left + (PUDDLE.x / 300) * box.width}px`,
            y: `${box.top + (PUDDLE.y / 340) * box.height}px`,
          });
        }
      }
      value = readyAt
        ? readyFrom + (100 - readyFrom) * Math.min(1, (now - readyAt) / FINISH_MS)
        : 88 * (1 - Math.exp(-elapsed / 900));
      setProgress(Math.round(value));
      if (value < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setPhase('flood');
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      root.classList.remove('intro-running');
      release();
    };
  }, [visible]);

  // Inundação → cortina sobe → some. O hero começa a entrar junto com a cortina; a rolagem volta quando ela sai.
  useEffect(() => {
    if (phase === 'flood') {
      const id = setTimeout(() => {
        document.documentElement.classList.remove('intro-running');
        setPhase('leave');
      }, FLOOD_MS);
      return () => clearTimeout(id);
    }
    if (phase === 'leave') {
      const id = setTimeout(() => setVisible(false), LEAVE_MS);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [phase]);

  if (!visible) return null;

  const pct = String(progress).padStart(2, '0');

  return (
    <div
      className={`${styles.intro} ${phase !== 'load' ? styles.flooding : ''} ${phase === 'leave' ? styles.leave : ''}`}
      role="progressbar"
      aria-label="Carregando o site"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div className={styles.top}>
        <span className={styles.brand}>
          Galvão<span className="sign">tattoo</span>
        </span>
        <span>Taubaté — SP</span>
      </div>

      <svg ref={stageRef} className={styles.stage} viewBox="0 0 300 340" aria-hidden="true" focusable="false">
        <g className={styles.machine} transform="translate(60 0) rotate(40 60 110)">
          <g className={styles.buzz}>
            <MachineShape />
          </g>
        </g>

        <g transform={`translate(${TIP.x} ${TIP.y})`}>
          {[0, 1, 2].map((i) => (
            <path key={i} d={DROP} className={styles.drop} style={{ '--i': i }} />
          ))}
        </g>

        <g transform={`translate(${PUDDLE.x} ${PUDDLE.y})`}>
          <g className={styles.puddle} style={{ '--p': progress / 100 }}>
            <Puddle />
          </g>
          <ellipse className={styles.ripple} cx={-35} cy={-2} rx={10} ry={3} />
        </g>
      </svg>

      <div className={styles.bottom}>
        <div className={styles.labels}>
          <span>Preparando a tinta</span>
          <span className={styles.pct}>{pct}%</span>
        </div>
        <div className={styles.bar}>
          <i style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>

      <div className={styles.flood} style={{ '--x': origin.x, '--y': origin.y }} aria-hidden="true" />
    </div>
  );
}
