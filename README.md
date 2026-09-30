# Yuri Galvão Tattoo — landing page

Página única para o estúdio do Yuri Galvão (Fine Line e Black & Grey, Taubaté-SP). Objetivo: levar a visita até o pedido de orçamento no WhatsApp.

React 19 + Vite, CSS Modules, sem roteador. Visual inspirado em offlimits.com: base clara (#ececec), texto quase preto e heróis em cores fortes. A tipografia é Archivo comprimida para cartazes e expandida para declarações, com assinatura manuscrita em azul (Mrs Saint Delafield). Os detalhes de marca são o marcador ✦, rótulos "/ Seção", blocos de pixel nas transições e o túnel em perspectiva.

Paleta: limão `#b4f80f`, azul `#1f34fc`, rosa `#ee70f8`, tinta `#151515`, papel `#ececec`.

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
- **Abertura**: `src/components/Intro`. Máquina vibrando, gotas e poça que crescem com o carregamento real (página e fontes; mínimo 1,8 s, máximo 6 s). No 100% a tinta cobre a tela e a cortina sobe. Não aparece para quem prefere menos movimento.
- **Skeletons**: `src/components/ui/InkSkeleton.jsx`, com pote de tinta derramando (fotos) ou maquininha pingando (carrossel, foto do Yuri e mapa). Para ver sem rede lenta, abra a página com `?skeleton` no fim do endereço.
- **Ilustrações**: `src/components/ui/TattooArt.jsx`, em SVG próprio com traço preto e fundo branco.

## Seções

Abertura (contagem em limão) → faixa de aviso → **Herói 1** claro com carrossel → faixa limão → 01 Especialidades → **Herói 2** limão (manifesto) → 02 Portfólio → **Herói 3** preto com túnel (cartaz de nomes) → 03 Histórias → **Herói 4** azul (04 Como funciona) → 05 Sobre → Depoimentos → Mentorias (rosa) → 06 Dúvidas (preto) → **Herói 5** limão (07 Contato e rodapé). O botão de WhatsApp flutua depois do hero.

## Pendências com o Yuri

- [ ] Fotos originais em alta. As atuais são recortes das miniaturas do Instagram (~230px), por isso a foto ampliada tem tamanho máximo.
- [ ] Autorização dos clientes e história real de cada caso em "Histórias" (Laura, Matheus Henrique, 06.12.2017). Os textos atuais são provisórios.
- [ ] Autorização para os nomes do cartaz (`names` em `site.js`): Laura, Matheus Henrique, Ísis, 06.12.2017, Ti amo, 555.
- [ ] Depoimentos do destaque FEEDBACKS, com autorização.
- [ ] Confirmar quais peças são coberturas de cicatriz (hoje: fênix e lettering cursivo).
- [ ] Preço mínimo, horários, idade mínima e regra do sinal (as respostas do FAQ são genéricas).
- [ ] Confirmar se a Rua Duque de Caxias, 112 é o studio privado citado nas legendas.
- [ ] Logo (se tiver), foto de perfil em alta e link da página no Facebook.
- [ ] Texto real da trajetória para "Sobre" (ValeFest Tattoo, mentorias).
