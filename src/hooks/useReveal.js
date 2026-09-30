import { useEffect } from 'react';

// Observa todo [data-reveal] da página (inclusive os que entram depois, como ao trocar o filtro
// do portfólio) e marca .is-in na primeira vez que aparece na tela.
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const watch = (root) => {
      root.querySelectorAll?.('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    };
    watch(document);

    const mo = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        if (node.matches('[data-reveal]:not(.is-in)')) io.observe(node);
        watch(node);
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
