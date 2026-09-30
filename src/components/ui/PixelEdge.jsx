import PropTypes from 'prop-types';

const COLS = 64;
const ROWS = 10;

// Pseudoaleatório fixo: o desenho sai sempre igual, sem "pular" entre renderizações.
function noise(i) {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

// Colunas em forma de vale (altas nas bordas, baixas no centro) com pixels soltos no topo.
const RECTS = (() => {
  const rects = [];
  for (let c = 0; c < COLS; c += 1) {
    const edge = Math.abs(c - (COLS - 1) / 2) / ((COLS - 1) / 2);
    const height = Math.max(1, Math.round(1 + edge * edge * (ROWS - 2) + noise(c) * 2));
    for (let r = 0; r < Math.min(height, ROWS); r += 1) rects.push([c, ROWS - 1 - r]);
    // Pixel solto acima da coluna, como tinta respingada.
    if (noise(c + 99) > 0.55 && height + 1 < ROWS) rects.push([c, ROWS - 2 - height]);
  }
  return rects;
})();

// Transição em blocos de pixel entre uma seção e a próxima. `color` é a cor da seção de baixo.
export default function PixelEdge({ color, flip = false }) {
  return (
    <svg
      viewBox={`0 0 ${COLS} ${ROWS}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{
        display: 'block',
        width: '100%',
        height: 'clamp(56px, 9vw, 140px)',
        color,
        transform: flip ? 'scaleY(-1)' : undefined,
        shapeRendering: 'crispEdges',
      }}
    >
      {RECTS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill="currentColor" />
      ))}
    </svg>
  );
}

PixelEdge.propTypes = {
  color: PropTypes.string.isRequired,
  flip: PropTypes.bool,
};
