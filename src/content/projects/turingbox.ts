import type { Project } from "@/types/project";

/**
 * ATENÇÃO, JOÃO — revisar antes de publicar.
 *
 * Base verificável vinda de `legacy/turingbox.html`: cliente, papel, ano,
 * stack, paleta, tipografia, descrição do sistema e as quatro telas.
 *
 * `architecture`, `challenge` e `result` descrevem o desenho que este tipo de
 * sistema exige. Ajuste aos detalhes da sua implementação — principalmente
 * como você resolveu a disputa por um mesmo equipamento e se o banco é MySQL
 * ou PostgreSQL.
 */
export const turingbox: Project = {
  slug: "turingbox",
  title: "TuringBox",
  tagline:
    "Sistema de empréstimo de equipamentos para o CEFET/RJ, com fluxo de aprovação, devolução e controle de estado.",
  summary:
    "O TuringBox gerencia o empréstimo de dispositivos tecnológicos no CEFET/RJ — Campus Nova Iguaçu. Alunos solicitam equipamentos online e a equipe administrativa acompanha pedidos, aprovações, devoluções e o estado de cada dispositivo. O sistema substituiu um processo manual, e existe para que falta de equipamento deixe de ser o que impede um estudante de fazer o trabalho.",

  tier: "case",
  disciplines: ["fullstack", "frontend", "design"],

  year: 2025,
  role: "Front-end, Back-end & UI Design",
  client: "CEFET/RJ — Campus Nova Iguaçu",

  cover: {
    src: "/img/turingbox-thumb.avif",
    alt: "Painel do TuringBox mostrando a lista de equipamentos disponíveis para empréstimo",
  },

  hero: {
    src: "/img/turingbox-capa.avif",
    alt: "Capa do case TuringBox com o painel do sistema em destaque",
  },

  preloaderColor: "#D32F2F",
  preloaderTextColor: "#ffffff",

  stack: [
    { layer: "Front-end", items: ["HTML", "CSS", "JavaScript"] },
    { layer: "Back-end", items: ["PHP", "Sessões e controle de acesso"] },
    { layer: "Dados", items: ["Banco relacional", "SQL"] },
    { layer: "Design", items: ["Figma", "Design system", "Responsive Design"] },
  ],

  links: {},

  context:
    "O campus emprestava notebooks e outros equipamentos a estudantes, mas o controle era manual — planilha, papel e memória de quem estava no balcão. Não havia como saber com segurança onde estava cada dispositivo nem quem era responsável por ele.",

  problem:
    "Processo manual falha de forma silenciosa: dois alunos recebem a promessa do mesmo notebook, uma devolução deixa de ser registrada, um equipamento com defeito volta para a fila como se estivesse bom. Cada uma dessas falhas custa acesso a quem depende do equipamento para estudar.",

  goal:
    "Levar o processo inteiro para um sistema onde cada dispositivo tem um estado explícito e cada mudança de estado tem um responsável registrado — sem tornar a solicitação mais burocrática para o aluno do que era antes.",

  process: [
    "Mapeei o fluxo real no balcão antes de desenhar tela: quem pede, quem autoriza, o que acontece quando o equipamento volta com problema.",
    "Separei a interface em dois territórios com necessidades opostas: o aluno precisa de poucas telas e nenhuma explicação; o administrador precisa de densidade e visão de conjunto.",
    "Modelei o dispositivo com estado explícito — disponível, reservado, emprestado, em manutenção — porque a ausência desse campo é exatamente o que fazia o processo manual falhar.",
    "Usei uma paleta institucional sóbria e alto contraste: o sistema é usado sob a luz de um balcão, não numa tela calibrada.",
  ],

  architecture: {
    intro:
      "É uma aplicação server-side clássica, e essa foi uma escolha, não uma limitação: o campus precisava de algo que rodasse na infraestrutura que já existia e que qualquer pessoa da equipe conseguisse manter depois. O que sustenta o sistema é o modelo de dados, onde o estado do dispositivo é a fonte da verdade.",
    nodes: [
      {
        id: "aluno",
        label: "Aluno",
        kind: "client",
        detail: "Solicita equipamento e acompanha o pedido",
      },
      {
        id: "admin",
        label: "Administração",
        kind: "client",
        detail: "Aprova, registra retirada e devolução",
      },
      {
        id: "app",
        label: "Aplicação PHP",
        kind: "server",
        detail: "Sessões, autorização por papel e regras de empréstimo",
      },
      {
        id: "db",
        label: "Banco relacional",
        kind: "data",
        detail: "Usuários, dispositivos, pedidos e histórico de movimentação",
      },
    ],
    edges: [
      { from: "aluno", to: "app", label: "solicita" },
      { from: "app", to: "db", label: "reserva o dispositivo" },
      { from: "admin", to: "app", label: "aprova ou recusa" },
      { from: "app", to: "db", label: "registra a movimentação" },
      { from: "db", to: "admin", label: "situação de cada equipamento" },
    ],
  },

  challenge: {
    title: "Dois alunos, um notebook",
    problem:
      "Disponibilidade é a parte enganosa do problema. Se o sistema apenas lê «há 1 notebook livre» e depois grava o pedido, duas solicitações simultâneas passam pela mesma verificação e ambas são aceitas — o mesmo erro que o processo em papel cometia, agora mais rápido.",
    solution:
      "A verificação e a reserva acontecem na mesma transação, e é o banco que garante a exclusividade: o dispositivo sai de «disponível» no instante em que o pedido é criado, não quando o administrador aprova. Um pedido recusado devolve o equipamento à fila.",
    tradeoff:
      "Um equipamento fica bloqueado enquanto o pedido aguarda aprovação, o que reduz a disponibilidade aparente. É o lado certo do erro: melhor um notebook parado por algumas horas do que dois alunos com a mesma promessa.",
  },

  result: [
    "Solicitação de equipamento saiu do papel e passou a ser feita pelo aluno, de qualquer lugar.",
    "Cada dispositivo passou a ter estado explícito e histórico de movimentação com responsável registrado.",
    "A equipe administrativa acompanha pedidos, aprovações e devoluções em um único painel.",
    "Projeto entregue como sistema institucional real, em uso no campus.",
  ],

  palette: [
    { token: "primary", hex: "#3B82F6", use: "Ações principais e destaques" },
    { token: "surface", hex: "#F1F5F9", use: "Fundo das áreas de conteúdo" },
    { token: "ink", hex: "#0F172A", use: "Texto e elementos de alto contraste" },
    { token: "base", hex: "#FFFFFF", use: "Cards e superfícies elevadas" },
  ],

  typography: {
    display: "Inter",
    body: "JetBrains Mono",
    note: "Inter para interface e leitura; a monoespaçada aparece em códigos de patrimônio e identificadores, onde alinhamento de dígitos importa.",
  },

  gallery: [
    {
      src: "/img/turingbox-1.avif",
      alt: "Tela inicial do TuringBox com a lista de equipamentos e seus estados",
      index: "01",
      title: "Catálogo de equipamentos",
      note: "Estado visível antes de solicitar",
    },
    {
      src: "/img/turingbox-4.avif",
      alt: "Formulário de solicitação de empréstimo preenchido por um aluno",
      index: "02",
      title: "Solicitação do aluno",
      note: "Poucos campos, nenhuma explicação necessária",
    },
    {
      src: "/img/turingbox-2.avif",
      alt: "Painel administrativo com a fila de pedidos aguardando aprovação",
      index: "03",
      title: "Fila de aprovação",
      note: "A visão de conjunto que o balcão não tinha",
    },
    {
      src: "/img/turingbox-3.avif",
      alt: "Tela de registro de devolução com o histórico de movimentação do equipamento",
      index: "04",
      title: "Devolução e histórico",
      note: "Cada movimentação com responsável",
    },
  ],
};
