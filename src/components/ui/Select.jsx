import { useEffect, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.css';

// Select com a lista estilizada (o <select> nativo não deixa estilizar as opções).
// Segue o padrão de combobox só de escolha: setas, Home/End, Enter/Espaço, Esc e busca pela letra.
export default function Select({ value, onChange, options, placeholder = 'Escolha', labelledBy }) {
  const id = useId();
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [up, setUp] = useState(false);

  // A primeira opção é "nenhuma", para poder voltar ao placeholder.
  const items = [{ value: '', label: placeholder }, ...options.map((o) => ({ value: o, label: o }))];
  const selected = Math.max(0, items.findIndex((item) => item.value === value));

  const show = (index = selected) => {
    // Abre para cima quando não cabe embaixo.
    const box = rootRef.current?.getBoundingClientRect();
    if (box) setUp(window.innerHeight - box.bottom < 300 && box.top > window.innerHeight - box.bottom);
    setActive(index);
    setOpen(true);
  };

  const choose = (index) => {
    onChange(items[index].value);
    setOpen(false);
  };

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Mantém a opção ativa visível na lista.
  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const onKeyDown = (e) => {
    const last = items.length - 1;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    if (e.key === 'ArrowDown') setActive((i) => Math.min(last, i + 1));
    else if (e.key === 'ArrowUp') setActive((i) => Math.max(0, i - 1));
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(last);
    else if (e.key === 'Enter' || e.key === ' ') choose(active);
    else if (e.key === 'Escape') {
      // Esc fecha só a lista, sem fechar modais em volta.
      e.stopPropagation();
      setOpen(false);
    } else if (e.key === 'Tab') {
      setOpen(false);
      return;
    } else if (e.key.length === 1) {
      const key = e.key.toLowerCase();
      const from = items.findIndex((item, i) => i > active && item.label.toLowerCase().startsWith(key));
      const index = from >= 0 ? from : items.findIndex((item) => item.label.toLowerCase().startsWith(key));
      if (index >= 0) setActive(index);
      return;
    } else return;
    e.preventDefault();
  };

  return (
    <div ref={rootRef} className={styles.root} data-open={open} data-up={up}>
      <button
        type="button"
        role="combobox"
        className={styles.trigger}
        data-empty={!value}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={labelledBy}
        aria-activedescendant={open && active >= 0 ? `${id}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
      >
        <span>{items[selected].label}</span>
        <svg className={styles.chevron} width="12" height="8" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      <ul ref={listRef} id={`${id}-list`} role="listbox" className={styles.list} aria-labelledby={labelledBy} tabIndex={-1}>
        {items.map((item, i) => (
          <li
            key={item.value || 'vazio'}
            id={`${id}-${i}`}
            role="option"
            aria-selected={i === selected}
            data-active={i === active}
            data-placeholder={i === 0}
            onPointerEnter={() => setActive(i)}
            onClick={() => choose(i)}
          >
            {item.label}
            <svg className={styles.check} width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
              <path d="M1 5l4 4 8-8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  labelledBy: PropTypes.string,
};
