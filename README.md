# Yuri Galvão Tattoo — landing page

Página única para o estúdio do Yuri Galvão (Fine Line e Black & Grey, Taubaté-SP). Objetivo: levar a visita até o pedido de orçamento no WhatsApp.

React 19 + Vite, CSS Modules, sem roteador. Visual em preto e branco, sutil: base branca, texto quase preto, seções escuras alternadas e botões leves. O rosa (`#ee70f8`) aparece só na faixa de mentorias. A tipografia é Archivo comprimida para cartazes e expandida para títulos, com assinatura manuscrita (Mrs Saint Delafield).

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
- **Skeletons**: `src/components/ui/InkSkeleton.jsx`, com pote de tinta derramando (fotos) ou maquininha pingando (foto do Yuri e mapa). Para ver sem rede lenta, abra a página com `?skeleton` no fim do endereço.
- **Saída para WhatsApp e Google Maps**: `src/components/ExternalLoader` intercepta qualquer link desses destinos e mostra uma tela de carregamento por 1,6 s: a maquininha escrevendo num balão, ou a gota virando o pino do mapa. Dá para cancelar. Se o navegador bloquear a nova aba, o link abre na mesma. Para abrir um destino por código, use `openWithLoader(href)` de `src/utils/outbound.js`.
- **Contato**: formulário com nome, WhatsApp, local do corpo, tamanho e ideia, que monta a mensagem e abre o WhatsApp. As opções ficam em `contactForm`, em `site.js`. A prévia do mapa e o "Ver localização" abrem `src/components/LocationModal`, com rota, Google Maps e copiar endereço.
- **Ilustrações**: `src/components/ui/TattooArt.jsx`, em SVG próprio com traço preto e fundo branco.

## Seções

Abertura de carregamento (preto e branco) → **hero automático** em 3 passos, que começa quando a cortina sobe (rolar ou teclar pula direto para o fim): aspas e "Sua história ainda guardada", depois o painel preto descendo com a moldura lateral, e por fim **a apresentação do Yuri, que faz o papel do Sobre** (foto, texto, números e especialidades) → faixa preta → 01 Portfólio em carrossel curvo, com "Ver todos os trabalhos" abrindo um modal com filtros e skeletons → citação → 02 Histórias → 03 Como funciona → Mentorias (rosa) → 04 Dúvidas → 05 Contato (formulário, prévia do mapa e modal de localização) e rodapé.

**Moldura**: colunas brancas fixas nas laterais (`src/components/FrameRails`, largura em `--frame`), com linha fina na borda do conteúdo. A barra da esquerda mostra o progresso de rolagem da página. Ela aparece a partir do passo 2 do hero.

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
