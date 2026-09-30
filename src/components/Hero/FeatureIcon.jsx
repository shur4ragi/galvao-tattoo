import PropTypes from 'prop-types';

const base = {
  viewBox: '0 0 32 32',
  width: 30,
  height: 30,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

// Ícones de linha das especialidades.
const ICONS = {
  // Agulha riscando uma linha fina
  needle: (
    <>
      <path d="M21 4 L28 11 L14 25 L7 18 Z" />
      <path d="M7 18 L4 28 L14 25" />
      <path d="M4 28 C10 26 16 29 26 27" />
    </>
  ),
  // Meio preto, meio cinza
  shade: (
    <>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 5 A11 11 0 0 0 16 27 Z" fill="currentColor" />
      <path d="M19 9 H24 M19 13 H26 M19 17 H26 M19 21 H24" strokeWidth="1.1" />
    </>
  ),
  // Flor de cinco pétalas
  flower: (
    <>
      <circle cx="16" cy="13" r="3" />
      <path d="M16 10 C13 4 19 4 16 10 M19 12 C24 8 26 14 19 14 M18 16 C22 21 16 22 16 16 M14 16 C10 21 6 16 13 14 M13 12 C8 8 12 4 16 10" />
      <path d="M16 16 V29 M16 24 C12 22 10 23 9 25 M16 21 C20 19 22 20 23 22" />
    </>
  ),
  // Cicatriz costurada virando traço
  cover: (
    <>
      <path d="M4 20 C10 12 20 24 28 12" />
      <path d="M9 13 L11 19 M14 15 L15 21 M19 15 L18 21 M23 13 L22 19" strokeWidth="1.2" />
      <path d="M22 5 L27 3 L25 8" />
    </>
  ),
};

export default function FeatureIcon({ name }) {
  return <svg {...base}>{ICONS[name]}</svg>;
}

FeatureIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
};
