// Pede a tela de carregamento (ExternalLoader) para abrir um destino fora do site, quando não há
// um <a> clicado — por exemplo, o formulário de contato que monta a mensagem do WhatsApp.
export function openWithLoader(href) {
  window.dispatchEvent(new CustomEvent('galvao:external', { detail: { href } }));
}
