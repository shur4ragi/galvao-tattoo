import { Fragment } from 'react';

// "Texto com *negrito*" vira nós React com <b> nas partes marcadas.
export function rich(text) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*')
      ? <b key={i}>{part.slice(1, -1)}</b>
      : <Fragment key={i}>{part}</Fragment>,
  );
}
