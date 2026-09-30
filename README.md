# Yuri Galvão Tattoo — landing page

Página única para o estúdio do Yuri Galvão (Fine Line e Black & Grey, Taubaté-SP). Objetivo: levar a visita até o pedido de orçamento no WhatsApp.

React 19 + Vite, CSS Modules, sem roteador. Estética inspirada em dg-cinema.com: fundo escuro com granulação de película, títulos condensados em caixa alta, seções numeradas, contagem "3 · · 2 · · 1" na abertura e fotos em tira de filme.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
npm run lint
```

## Onde mexer

- **Todo o conteúdo** (textos, fotos, contatos, FAQ, histórias, depoimentos) está em `src/data/site.js`.
- **Fotos** ficam em `public/images/`. Para trocar pela versão em alta, salve com o mesmo nome de arquivo.
- **Depoimentos**: a lista começa vazia e a seção fica escondida até receber itens `{ quote, name }`.
- **Facebook**: aparece no contato quando `contact.facebook` tiver o link.

## Seções

Abertura → Hero → faixa de especialidades → 01 Especialidades → 02 Portfólio (filtros e foto em tela cheia) → 03 Histórias → 04 Como funciona → 05 Sobre → Depoimentos → Mentorias → 06 Dúvidas → 07 Contato com mapa → rodapé. O botão de WhatsApp flutua depois do hero.

## Pendências com o Yuri

- [ ] Fotos originais em alta. As atuais são recortes das miniaturas do Instagram (~230px), por isso a foto ampliada tem tamanho máximo.
- [ ] Autorização dos clientes e história real de cada caso em "Histórias" (Laura, Matheus Henrique, 06.12.2017). Os textos atuais são provisórios.
- [ ] Depoimentos do destaque FEEDBACKS, com autorização.
- [ ] Confirmar quais peças são coberturas de cicatriz (hoje: fênix e lettering cursivo).
- [ ] Preço mínimo, horários, idade mínima e regra do sinal (as respostas do FAQ são genéricas).
- [ ] Confirmar se a Rua Duque de Caxias, 112 é o studio privado citado nas legendas.
- [ ] Logo (se tiver), foto de perfil em alta e link da página no Facebook.
- [ ] Texto real da trajetória para "Sobre" (ValeFest Tattoo, mentorias).
