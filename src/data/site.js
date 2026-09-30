// Todo o conteúdo da página fica aqui: textos, fotos, links e contatos.
// Fotos em public/images. As atuais são recortes das miniaturas do Instagram (~230px):
// trocar pelas originais em alta mantendo o mesmo nome de arquivo.

const img = (name) => `/images/${name}.jpg`;

export const contact = {
  whatsapp: '5512996746924',
  whatsappLabel: '+55 12 99674-6924',
  instagram: 'https://www.instagram.com/galvaotattoo_/',
  instagramHandle: '@galvaotattoo_',
  // Link da página no Facebook ("Yuri Galvão Tattoo"): pedir ao Yuri. Vazio = não aparece.
  facebook: '',
  address: 'Rua Duque de Caxias, 112 — Centro',
  city: 'Taubaté — SP, 12020-050',
  mapQuery: 'Rua Duque de Caxias, 112, Centro, Taubaté - SP, 12020-050',
  hours: 'Atendimento com hora marcada',
};

export const messages = {
  budget: 'Oi Yuri! Vim pelo site e quero fazer uma tatuagem. Minha ideia é…',
  mentoring: 'Oi Yuri! Vim pelo site e quero saber mais sobre a mentoria para tatuadores.',
};

export const nav = [
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export const announcement = 'Agenda aberta · orçamento pelo WhatsApp';

export const hero = {
  meta: ['Fine Line', 'Black & Grey', 'Taubaté — SP'],
  titleTop: 'Sua história',
  titleMid: 'já vale.',
  signature: 'só falta ser contada',
  subtitle: 'Tatuagens Fine Line e Black & Grey em Taubaté, criadas exclusivamente pra você.',
  // Fotos que passam sozinhas no quadro do hero.
  slides: [
    { src: img('yuri-trabalhando'), label: 'Yuri no studio' },
    { src: img('lettering-laura'), label: 'Lettering · Laura' },
    { src: img('realismo-retrato'), label: 'Black & Grey · Retrato' },
    { src: img('fineline-serpente-floral'), label: 'Fine Line · Serpente' },
    { src: img('fenix-cobertura-cicatriz'), label: 'Cobertura · Fênix' },
  ],
};

// Herói verde: manifesto em texto largo, partes em negrito marcadas com *asteriscos*.
export const manifesto = {
  label: 'Manifesto',
  text: '*Yuri Galvão* tatua em Taubaté com *traço fino* e *preto e cinza*, e cria cada arte do zero para quem vai usar.',
  sub: 'Nomes, datas, flores, retratos e cicatrizes que viram desenho.',
  images: [img('black-grey-rosas'), img('fineline-costas-lettering'), img('black-grey-leao-floral')],
};

// Herói "cartaz": textos de homenagens já tatuadas. Usar só com autorização dos clientes.
export const names = [
  ['Laura'],
  ['Matheus Henrique'],
  ['Ísis', '06.12.2017'],
  ['Ti amo', '555'],
];

export const specialties = [
  {
    title: 'Fine Line & Lettering',
    text: 'Traço fino, nomes, datas e frases escritos com a delicadeza que a homenagem pede.',
    images: [img('lettering-laura'), img('lettering-homenagem-matheus')],
  },
  {
    title: 'Black & Grey · Realismo',
    text: 'Retratos e cenas em preto e cinza, com sombra construída camada por camada.',
    images: [img('realismo-retrato'), img('black-grey-religioso')],
  },
  {
    title: 'Floral',
    text: 'Rosas, ramos e flores que acompanham o desenho do corpo.',
    images: [img('black-grey-rosas'), img('fineline-floral-555')],
  },
  {
    title: 'Cobertura de cicatriz',
    text: 'A marca continua fazendo parte da história. Só ganha um novo desenho por cima.',
    images: [img('fenix-cobertura-cicatriz'), img('lettering-cobertura-cicatriz')],
  },
];

export const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'fineline', label: 'Fine Line' },
  { id: 'blackgrey', label: 'Black & Grey' },
  { id: 'lettering', label: 'Lettering' },
  { id: 'cover', label: 'Coberturas' },
];

// tall: ocupa duas linhas da grade. Categorias de cobertura: confirmar com o Yuri.
export const portfolio = [
  { src: img('realismo-retrato'), alt: 'Retrato realista feminino no antebraço', tags: ['blackgrey'], tall: true },
  { src: img('lettering-laura'), alt: 'Lettering "Laura" na mão', tags: ['lettering', 'fineline'] },
  { src: img('fenix-cobertura-cicatriz'), alt: 'Fênix com sol e lua sobre cicatriz', tags: ['cover', 'blackgrey'] },
  { src: img('fineline-serpente-floral'), alt: 'Serpente com flores na perna', tags: ['fineline', 'blackgrey'], tall: true },
  { src: img('black-grey-rosas'), alt: 'Rosas em preto e cinza', tags: ['blackgrey'] },
  { src: img('fineline-costas-lettering'), alt: 'Frase na coluna com lírio em traço fino', tags: ['fineline', 'lettering'] },
  { src: img('lettering-cobertura-cicatriz'), alt: 'Lettering cursivo sobre cicatriz', tags: ['lettering', 'cover'] },
  { src: img('black-grey-leao-floral'), alt: 'Leão com flores no braço', tags: ['blackgrey'] },
  { src: img('fineline-andorinha'), alt: 'Andorinha em traço fino no antebraço', tags: ['fineline'] },
  { src: img('lettering-homenagem-matheus'), alt: 'Nome "Matheus Henrique" com coração no antebraço', tags: ['lettering', 'fineline'] },
  { src: img('black-grey-religioso'), alt: 'Cena religiosa em black & grey no braço', tags: ['blackgrey'] },
  { src: img('fineline-floral-555'), alt: 'Ramo floral com o número 555', tags: ['fineline'] },
  { src: img('lettering-ti-amo'), alt: '"Ti amo" manuscrito no pulso', tags: ['lettering', 'fineline'] },
  { src: img('lettering-data'), alt: 'Data 06.12.2017 no antebraço', tags: ['lettering', 'fineline'] },
];

// Usar só com autorização dos clientes. Textos provisórios: confirmar a história real com o Yuri.
export const stories = [
  {
    name: 'Laura',
    src: img('lettering-laura'),
    text: 'Um nome escrito à mão, no lugar do corpo que ela vê o dia inteiro.',
  },
  {
    name: 'Matheus Henrique',
    src: img('lettering-homenagem-matheus'),
    text: 'O nome do filho no antebraço, em traço fino e com um coração no fim da linha.',
  },
  {
    name: '06.12.2017',
    src: img('lettering-data'),
    text: 'Uma data que não precisava de explicação, só de um lugar pra ficar.',
  },
];

export const process = [
  { title: 'Você conta', text: 'Sua ideia e a história por trás dela, pelo WhatsApp.' },
  { title: 'Yuri cria', text: 'Uma arte exclusiva, desenhada só pra você.' },
  { title: 'A sessão', text: 'No studio privado, com tempo e atenção só pra você.' },
  { title: 'Depois', text: 'Acompanhamento da cicatrização até a tatuagem ficar pronta.' },
];

export const about = {
  photo: img('yuri-trabalhando'),
  detail: img('bastidor-realismo-retrato'),
  paragraphs: [
    'Yuri Galvão tatua em Taubaté com foco em Fine Line e Black & Grey: lettering, floral, realismo em preto e cinza e coberturas de cicatriz.',
    'Cada projeto começa numa conversa. Boa parte do que ele faz são homenagens, como o nome de um filho, de uma mãe ou uma data, e por isso toda arte é criada do zero pra quem vai usar.',
  ],
  facts: [
    { value: 'ValeFest', label: 'Tattoo — participação' },
    { value: '2,7 mil', label: 'pessoas acompanham no Instagram' },
    { value: '1:1', label: 'studio privado, uma pessoa por vez' },
  ],
};

// Frases do destaque FEEDBACKS do Instagram, com autorização. Vazio = seção não aparece.
export const testimonials = [];

export const mentoring = {
  title: 'Mentorias para tatuadores',
  text: 'Pra quem está começando e quer evoluir no traço fino e no preto e cinza: acompanhamento direto com o Yuri, da máquina à conversa com o cliente.',
  cta: 'Quero saber da mentoria',
};

// Respostas de preço mínimo, idade e sinal: confirmar com o Yuri.
export const faq = [
  {
    q: 'Quanto custa uma tatuagem?',
    a: 'Cada arte é exclusiva, então o orçamento é feito por projeto: depende do tamanho, do local do corpo e do nível de detalhe. Mande sua ideia no WhatsApp com uma referência e o local que você pensou.',
  },
  {
    q: 'Dói?',
    a: 'Um pouco, e varia de pessoa pra pessoa e de região pra região. Traço fino costuma ser bem tranquilo. O ritmo da sessão respeita você, com pausas quando precisar.',
  },
  {
    q: 'Como cuidar depois?',
    a: 'Você sai do studio com as orientações por escrito: higiene, pomada, sol e piscina. O Yuri acompanha a cicatrização e tira dúvidas pelo WhatsApp.',
  },
  {
    q: 'Tem idade mínima?',
    a: 'O atendimento é para maiores de 18 anos. Em caso de dúvida, fale com o Yuri antes de marcar.',
  },
  {
    q: 'Como reservo uma data?',
    a: 'Depois de aprovar a arte, a data é reservada com um sinal, abatido do valor final da tatuagem.',
  },
];
