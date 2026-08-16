import type { Project } from "@/types/project";

/** TODO João: confirmar o ano e, se houve back-end, promover para tier "case". */
export const pataFeliz: Project = {
  slug: "pata-feliz",
  title: "Pata Feliz",
  tagline:
    "Plataforma de petshop com agendamento de serviços e acompanhamento de bem-estar animal.",
  summary:
    "Uma plataforma acolhedora para petshops, centrada em agendamento de serviços, controle de bem-estar animal e facilidade para os tutores. O desafio de interface era equilibrar afeto e operação: a mesma tela precisa acalmar um tutor e organizar a agenda de quem atende.",

  tier: "reduced",
  disciplines: ["frontend", "design"],

  year: 2025,
  role: "UI Design & Front-end",
  client: "Pata Feliz",

  cover: {
    src: "/img/patafeliz-capa.avif",
    alt: "Tela inicial da plataforma Pata Feliz com agendamento de serviços para pets",
  },

  preloaderColor: "#2563EB",

  stack: [
    { layer: "Front-end", items: ["HTML", "CSS", "JavaScript"] },
    { layer: "Design", items: ["Figma", "UI Design", "Responsive Design"] },
  ],

  links: {},

  result: [
    "Fluxo de agendamento reduzido ao essencial para o tutor.",
    "Interface que separa o que o tutor vê do que a operação do petshop precisa controlar.",
  ],

  palette: [
    { token: "primary", hex: "#2563EB", use: "Ações principais" },
    { token: "accent", hex: "#FACC15", use: "Destaques e chamadas" },
    { token: "surface", hex: "#F8FAFC", use: "Fundo das áreas de conteúdo" },
    { token: "ink", hex: "#0F172A", use: "Texto e alto contraste" },
  ],

  typography: {
    display: "Poppins",
    body: "Poppins",
    note: "Poppins Regular for paragraphs. Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz",
  },

  gallery: [
    {
      src: "/img/patafeliz_1.avif",
      alt: "Página inicial do Pata Feliz apresentando os serviços do petshop",
      index: "01",
      title: "Home",
    },
    {
      src: "/img/patafeliz-2.avif",
      alt: "Tela de agendamento de banho e tosa com seleção de data e horário",
      index: "02",
      title: "Agendamento",
    },
    // A ordem do original é 1, 2, 4, 3 — a tela de contato vem antes da
    // ficha do animal.
    {
      src: "/img/patafeliz-4.avif",
      alt: "Seção de contato e localização do petshop em versão responsiva",
      index: "03",
      title: "Contato",
    },
    {
      src: "/img/patafeliz-3.avif",
      alt: "Ficha do animal com histórico de serviços e informações de bem-estar",
      index: "04",
      title: "Ficha do animal",
    },
  ],
};
