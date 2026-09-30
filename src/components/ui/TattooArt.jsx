// Ilustrações de estúdio em traço grosso (preto sobre branco), desenhadas em SVG para animar
// cada parte separada. A cor do traço vem de `color` (currentColor).

const line = { stroke: 'currentColor', strokeWidth: 3.5, strokeLinejoin: 'round', strokeLinecap: 'round' };
const paper = { ...line, fill: '#eef2f4' };
const ink = { fill: 'currentColor' };

const RIBS = [82, 96, 110, 124, 138];

// Máquina de bobina em pé (agulha para baixo, ponta em 40,216). Quem usa gira o grupo.
export function MachineShape(props) {
  return (
    <g {...props}>
      {/* Armadura, parafuso de contato e mola */}
      <path d="M58 16 V4 L86 1" {...line} fill="none" />
      <path d="M94 16 C101 8 99 1 92 -2" {...line} fill="none" />
      <circle cx="76" cy="6" r="5.5" {...paper} />
      <circle cx="76" cy="6" r="1.8" {...ink} />

      {/* Quadro */}
      <rect x="50" y="16" width="62" height="10" rx="2" {...paper} />
      <rect x="50" y="74" width="62" height="10" rx="2" {...paper} />
      <rect x="50" y="16" width="10" height="68" rx="2" {...paper} />

      {/* Bobinas com brilho */}
      <rect x="64" y="27" width="20" height="46" rx="7" {...paper} />
      <rect x="88" y="27" width="20" height="46" rx="7" {...paper} />
      <path d="M73 36 C80 40 80 60 73 66 H80 V36 Z" {...ink} />
      <path d="M97 36 C104 40 104 60 97 66 H104 V36 Z" {...ink} />

      {/* Parafuso da presilha */}
      <path d="M29 74 H17" {...line} />
      <circle cx="12" cy="74" r="7" {...paper} />
      <path d="M12 68.5 V79.5 M6.5 74 H17.5" {...line} strokeWidth="2" />

      {/* Colar */}
      <rect x="28" y="66" width="24" height="17" rx="3" {...paper} />
      <path d="M33 70 H47" {...line} strokeWidth="2" />

      {/* Grip em gomos */}
      {RIBS.map((y) => (
        <g key={y}>
          <rect x="24" y={y} width="32" height="15" rx="7.5" {...paper} />
          <rect x="44" y={y + 4} width="8" height="7" rx="3.5" {...ink} />
        </g>
      ))}

      {/* Bico e agulha */}
      <path d="M34 153 H46 V171 Q46 183 40 183 Q34 183 34 171 Z" {...paper} />
      <path d="M40 217 L37 183 H43 Z" {...ink} {...line} strokeWidth="1.5" />
    </g>
  );
}

// Pote de tinta deitado, com o gargalo à direita (abertura perto de 81,51 depois de girado).
export function BottleShape(props) {
  return (
    <g {...props}>
      <g transform="rotate(14 44 42)">
        <rect x="6" y="20" width="62" height="44" rx="9" {...paper} />
        <path d="M22 21 V63" {...line} strokeWidth="2" />
        {/* Hachura de gravura no lado claro */}
        <path d="M57 28 V56 M61.5 29 V55 M65 31 V53" {...line} strokeWidth="1.2" />
        <path d="M9 30 H19 M9 36 H19 M9 42 H19" {...line} strokeWidth="1.2" />
        <text
          x="40"
          y="49"
          textAnchor="middle"
          fill="currentColor"
          style={{ font: '800 17px var(--font)', fontStretch: '62%' }}
        >
          INK
        </text>
        <rect x="67" y="31" width="12" height="22" rx="2" {...paper} />
        <ellipse cx="82" cy="42" rx="5" ry="13" {...paper} />
        <ellipse cx="82.6" cy="42" rx="2.4" ry="8.6" {...ink} />
      </g>
    </g>
  );
}

// Gota em pé centrada em (0,0).
export const DROP = 'M0 -7 C3.4 -1.6 5.6 1.6 5.6 4.8 A5.6 5.6 0 0 1 -5.6 4.8 C-5.6 1.6 -3.4 -1.6 0 -7 Z';

// Poça de tinta centrada em (0,0), com respingos soltos.
export function Puddle(props) {
  return (
    <g {...props}>
      <path
        d="M-58 2 C-62 -8 -44 -12 -34 -8 C-28 -16 -12 -14 -6 -9 C2 -18 22 -16 26 -8 C38 -12 56 -8 58 0 C62 8 48 14 36 11 C28 18 10 18 2 12 C-8 18 -26 16 -32 10 C-44 14 -60 10 -58 2 Z"
        {...ink}
      />
      <circle cx="-70" cy="-3" r="3.2" {...ink} />
      <circle cx="68" cy="-7" r="2.6" {...ink} />
      <circle cx="73" cy="5" r="2" {...ink} />
      <circle cx="-66" cy="11" r="2.2" {...ink} />
      <circle cx="46" cy="18" r="1.8" {...ink} />
    </g>
  );
}
