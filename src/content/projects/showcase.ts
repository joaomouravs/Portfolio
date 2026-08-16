import type { Project } from "@/types/project";

/**
 * Os três projetos majoritariamente visuais.
 *
 * Todos tinham página própria no original (`aura.html`, `etoile.html`,
 * `solen.html`), com o mesmo molde das demais: capa, fita de stack, panorama,
 * guia de estilo e quatro telas. Continuam com página aqui — a única
 * diferença é que agora são gerados pelo mesmo componente.
 *
 * TODO João: confirmar os anos.
 */

export const auraArchitecture: Project = {
  slug: "aura-architecture",
  title: "Aura Architecture",
  tagline:
    "Identidade visual e plataforma digital para um escritório de arquitetura minimalista focado em luz natural e formas orgânicas.",
  summary:
    "Identidade visual e plataforma digital para um escritório de arquitetura minimalista. O site precisava se comportar como os projetos que apresenta: espaço generoso, poucos elementos e a luz fazendo o trabalho pesado.",
  tier: "reduced",
  disciplines: ["frontend", "design"],
  year: 2025,
  role: "Identidade visual & Front-end",
  client: "Aura Architecture",
  cover: {
    src: "/img/aurat-capa.avif",
    alt: "Página inicial do escritório Aura Architecture com fotografia de interior iluminado",
  },
  hero: {
    src: "/img/aurart-capa.avif",
    alt: "Capa do case Aura Architecture com fotografia de fachada",
  },
  preloaderColor: "#D5C099",
  preloaderTextColor: "#16150F",
  stack: [
    { layer: "Front-end", items: ["HTML", "CSS", "JavaScript", "GSAP"] },
    { layer: "Design", items: ["Figma", "Identidade visual", "UI Design"] },
  ],
  links: {},
  result: [
    "Identidade visual e presença digital alinhadas à linguagem do escritório.",
    "Layout editorial que dá à fotografia dos projetos o primeiro plano.",
  ],
  palette: [
    { token: "ink", hex: "#0a0a0d", use: "Fundo e texto de alto contraste" },
    { token: "gold", hex: "#d4af37", use: "Acento e detalhes" },
    { token: "bone", hex: "#f4f4f4", use: "Fundo claro e superfícies" },
  ],
  typography: {
    display: "font-playfair",
    body: "Serifa de display",
    note: "Títulos gigantes, citações do manifesto, números enormes no “Film Roll” e títulos principais.",
  },
  gallery: [
    {
      src: "/img/aurart-1.avif",
      alt: "Projeto arquitetônico apresentado em grade editorial de fotografias",
      index: "01",
      title: "Projetos",
    },
    {
      src: "/img/aurart-2.avif",
      alt: "Seção sobre o escritório com texto em coluna estreita",
      index: "02",
      title: "Escritório",
    },
    {
      src: "/img/aurart-3.avif",
      alt: "Detalhe de interior com luz natural entrando pela fachada",
      index: "03",
      title: "Detalhe",
    },
    {
      src: "/img/aurart-4.avif",
      alt: "Seção de contato do escritório em versão responsiva",
      index: "04",
      title: "Contato",
    },
  ],
};

export const etoileAcademy: Project = {
  slug: "etoile-academy",
  title: "Étoile Academy",
  tagline:
    "Plataforma digital que redefine a presença online do ballet clássico através de uma experiência imersiva e luxuosa.",
  summary:
    "A Étoile Academy é uma plataforma digital desenvolvida para redefinir a presença online do ballet clássico através de uma experiência imersiva e luxuosa. A referência do setor é institucional e datada; a proposta foi tratar o site como palco — movimento contido, tipografia com postura e fotografia em primeiro plano.",
  tier: "reduced",
  disciplines: ["frontend", "design"],
  year: 2025,
  role: "UI Design & Front-end",
  client: "Étoile Academy",
  cover: {
    src: "/img/etoile-capa.avif",
    alt: "Abertura do site da Étoile Academy com fotografia de bailarina em movimento",
  },
  hero: {
    src: "/img/etoile.avif",
    alt: "Capa do case Étoile Academy com bailarina em pose",
  },
  preloaderColor: "#bdbbb6",
  preloaderTextColor: "#16150F",
  stack: [
    { layer: "Front-end", items: ["HTML", "CSS", "JavaScript", "GSAP"] },
    { layer: "Design", items: ["Figma", "UI Design", "Responsive Design"] },
  ],
  links: {},
  result: [
    "Presença online que foge do padrão institucional do setor.",
    "Experiência construída em torno da fotografia e do movimento.",
  ],
  palette: [
    { token: "ink", hex: "#000000", use: "Fundo e texto principal" },
    { token: "bone", hex: "#F5F5F7", use: "Fundo claro e superfícies" },
    { token: "ash", hex: "#A1A1A6", use: "Texto secundário e legendas" },
  ],
  typography: {
    display: "serifas elegantes",
    body: "Serifa de display",
    note: "Títulos gigantes, citações do manifesto, números enormes no “Film Roll” e títulos principais.",
  },
  gallery: [
    {
      src: "/img/etoile1.avif",
      alt: "Seção de apresentação da academia com fotografia em tom sépia",
      index: "01",
      title: "Apresentação",
    },
    {
      src: "/img/etoile2.avif",
      alt: "Listagem das turmas e níveis oferecidos pela academia",
      index: "02",
      title: "Turmas",
    },
    {
      src: "/img/etoile3.avif",
      alt: "Galeria de fotografias de apresentações da academia",
      index: "03",
      title: "Galeria",
    },
    {
      src: "/img/etoile4.avif",
      alt: "Seção de matrícula e contato em versão responsiva",
      index: "04",
      title: "Matrícula",
    },
  ],
};

export const solen: Project = {
  slug: "solen",
  title: "Solen — Creative Mode",
  tagline:
    "Laboratório criativo digital que une o brutalismo de luxo, a estética editorial e a alta tecnologia.",
  summary:
    "Solen — Creative Mode é um laboratório criativo digital que une o brutalismo de luxo, a estética editorial e a alta tecnologia. É o projeto onde a direção de arte anda mais solta — serve como demonstração de repertório visual, não como produto com requisitos de negócio.",
  tier: "reduced",
  disciplines: ["frontend", "design"],
  year: 2025,
  role: "Direção de arte & Front-end",
  client: "Projeto autoral",
  cover: {
    src: "/img/solen-capa.avif",
    alt: "Abertura do Solen com tipografia em escala monumental sobre fundo escuro",
  },
  hero: {
    src: "/img/solen.avif",
    alt: "Capa do case Solen com composição tipográfica",
  },
  preloaderColor: "#e5c575",
  preloaderTextColor: "#16150F",
  stack: [
    { layer: "Front-end", items: ["HTML", "CSS", "JavaScript", "GSAP"] },
    { layer: "Design", items: ["Figma", "Direção de arte", "UI Design"] },
  ],
  links: {},
  result: [
    "Peça autoral que reúne brutalismo de luxo e estética editorial.",
    "Espaço para experimentar composição tipográfica fora de um briefing.",
  ],
  palette: [
    { token: "ink", hex: "#000000", use: "Fundo e blocos brutalistas" },
    { token: "base", hex: "#FFFFFF", use: "Texto e superfícies de contraste" },
  ],
  typography: {
    display: "Cormorant Garamond",
    body: "Serifa de display",
    note: "Títulos gigantes, citações do manifesto, números enormes no “Film Roll” e títulos principais.",
  },
  gallery: [
    {
      src: "/img/solen1.avif",
      alt: "Composição tipográfica brutalista com blocos de texto sobrepostos",
      index: "01",
      title: "Composição",
    },
    {
      src: "/img/solen2.avif",
      alt: "Seção editorial com imagem em recorte e legenda lateral",
      index: "02",
      title: "Editorial",
    },
    {
      src: "/img/solen3.avif",
      alt: "Grade de projetos do laboratório criativo em alto contraste",
      index: "03",
      title: "Projetos",
    },
    {
      src: "/img/solen4.avif",
      alt: "Encerramento com assinatura da marca em escala monumental",
      index: "04",
      title: "Assinatura",
    },
  ],
};
