import type { Project } from "@/types/project";

/**
 * Paleta e tipografia tiradas das pranchas do próprio projeto
 * (`cores-*-lume-restaurant.png` e `tipografia-lume-restaurant.png`).
 * O swatch “a brasa” está rotulado #2B2620 na prancha, mas a cor exibida é
 * #C4622D — o rótulo repete o tom de carvão por engano.
 *
 * TODO João: confirmar a stack e adicionar o link do site no ar.
 */
export const lume: Project = {
  slug: "lume",
  title: "LUME",
  tagline:
    "Site de restaurante de cozinha contemporânea brasileira conduzida pela brasa, com cardápio sazonal, menu degustação e reserva de mesa.",
  summary:
    "LUME é um restaurante de cozinha contemporânea brasileira conduzida pela brasa e pelas estações. O site precisava ter a temperatura da casa — pretos quentes como carvão, tons de linho cru e o dourado da chama — sem esquecer o que o cliente procura de verdade: o cardápio da estação, o menu degustação e uma reserva de mesa em poucos passos.",

  tier: "reduced",
  disciplines: ["frontend", "design"],

  year: 2026,
  role: "UI Design & Front-end",
  client: "LUME — Cozinha de Fogo",

  cover: {
    src: "/img/lume-restaurant-1.avif",
    alt: "Mockups mobile do site LUME com a home “A arte do fogo, à mesa” sobre fundo escuro",
  },

  hero: {
    src: "/img/lume-restaurant-capa.avif",
    alt: "Capa do case LUME com o logotipo dourado sobre fundo carvão",
  },

  preloaderColor: "#12100E",
  preloaderTextColor: "#CFAE7C",

  stack: [
    { layer: "Front-end", items: ["Next.js", "React", "TypeScript"] },
    { layer: "Design", items: ["Figma", "UI Design", "Responsive Design"] },
  ],

  links: {},

  result: [
    "Cardápio por estação com filtros de restrição alimentar e pratos de assinatura em destaque.",
    "Reserva de mesa em três escolhas — data, horário e pessoas — acessível de qualquer página.",
  ],

  palette: [
    { token: "carvão", hex: "#12100E", use: "Cor principal, fundos e texto de alto contraste" },
    { token: "linho", hex: "#F3EEE6", use: "Fundo principal das seções claras" },
    { token: "dourado", hex: "#CFAE7C", use: "Acento da marca, destaques e chamadas" },
    { token: "brasa", hex: "#C4622D", use: "Detalhes pontuais que remetem ao fogo" },
  ],

  typography: {
    display: "Cormorant",
    body: "Manrope",
    note: "Manrope for paragraphs. Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz",
  },

  gallery: [
    {
      src: "/img/lume-restaurant-1.avif",
      alt: "Mockups mobile da home do LUME e da seção Fogo & Alma com o botão fixo de reserva",
      index: "01",
      title: "Mobile",
    },
    {
      src: "/img/lume-restaurant-2.avif",
      alt: "Seções da home: manifesto da casa, chef, pratos de assinatura e mapa de produtores parceiros",
      index: "02",
      title: "Home",
    },
    {
      src: "/img/lume-restaurant-3.avif",
      alt: "Página de cardápio com hero fotográfico e a lista de entradas com preços e filtros",
      index: "03",
      title: "Cardápio",
    },
    {
      src: "/img/lume-restaurant-4.avif",
      alt: "Seções de pratos principais e sobremesas do cardápio com selos de assinatura",
      index: "04",
      title: "Principais e sobremesas",
    },
    {
      src: "/img/lume-restaurant-5.avif",
      alt: "Coquetelaria autoral e o Menu Fogo de degustação em sete tempos com harmonização",
      index: "05",
      title: "Drinks e degustação",
    },
    {
      src: "/img/lume-restaurant-6.avif",
      alt: "Seção de reservas com seleção de data, horário e pessoas sobre fotografia do salão",
      index: "06",
      title: "Reservas",
    },
    {
      src: "/img/lume-restaurant-7.avif",
      alt: "Rodapé com horários, contato e a marca LUME em contorno de grande escala",
      index: "07",
      title: "Rodapé",
    },
  ],
};
