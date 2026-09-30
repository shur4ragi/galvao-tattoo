import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

// Colunas brancas fixas nas laterais, com uma linha fina na borda do conteúdo, como a moldura
// do wireframe. A da esquerda enche conforme a página rola; a da direita aponta o caminho.
// Aparecem a partir do passo 2 do hero (classe frame-on no <html>).
export default function FrameRails() {
  const fillRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div className={`${styles.rail} ${styles.left}`}>
        <span className={styles.track}>
          <i ref={fillRef} />
        </span>
        <small>progresso</small>
      </div>
      <div className={`${styles.rail} ${styles.right}`}>
        <small>progresso</small>
        <span className={styles.arrow} />
      </div>
    </div>
  );
}
