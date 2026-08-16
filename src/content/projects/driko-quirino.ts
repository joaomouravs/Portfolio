import type { Project } from "@/types/project";

/** TODO João: confirmar o ano. */
export const drikoQuirino: Project = {
  slug: "driko-quirino",
  title: "Driko Quirino",
  tagline:
    "Identidade digital e plataforma de marca para um negócio que vende pela presença.",
  summary:
    "Plataforma digital construída para carregar a identidade visual e os serviços da marca. Quando o produto é a própria marca, o site não é catálogo — é a primeira impressão inteira, e cada decisão de tipografia e ritmo responde por parte da percepção de valor.",

  tier: "reduced",
  disciplines: ["frontend", "design"],

  year: 2025,
  role: "UI Design & Front-end",
  client: "Driko Quirino",

  cover: {
    src: "/img/driko-thumb.avif",
    alt: "Página inicial da marca Driko Quirino com tipografia de destaque sobre fotografia",
  },

  hero: {
    src: "/img/driko-capa.avif",
    alt: "Capa do case Driko Quirino com a identidade da marca",
  },

  preloaderColor: "#333333",

  stack: [
    { layer: "Front-end", items: ["HTML", "CSS", "JavaScript", "GSAP"] },
    { layer: "Design", items: ["Figma", "Identidade visual", "UI Design"] },
  ],

  links: {},

  result: [
    "Presença digital alinhada à identidade da marca, do tipo à fotografia.",
    "Estrutura de página que apresenta os serviços sem transformar a marca em catálogo.",
  ],

  testimonialId: "adriana",

  palette: [
    { token: "ink", hex: "#312C27", use: "Texto e fundos escuros" },
    { token: "bone", hex: "#F5F5F0", use: "Fundo principal" },
    { token: "nude", hex: "#E3CFC2", use: "Acento e superfícies quentes" },
  ],

  typography: {
    display: "Serifada",
    body: "Montserrat",
    note: "Montserrat for paragraphs. Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz",
  },

  gallery: [
    {
      src: "/img/driko-1.avif",
      alt: "Abertura do site com o nome da marca em tipografia de grande escala",
      index: "01",
      title: "Abertura",
    },
    {
      src: "/img/driko-2.avif",
      alt: "Seção de apresentação dos serviços oferecidos pela marca",
      index: "02",
      title: "Serviços",
    },
    {
      src: "/img/driko-3.avif",
      alt: "Galeria de trabalhos com fotografias em grade editorial",
      index: "03",
      title: "Trabalhos",
    },
    {
      src: "/img/driko-4.avif",
      alt: "Seção de contato com as redes sociais da marca",
      index: "04",
      title: "Contato",
    },
  ],
};
