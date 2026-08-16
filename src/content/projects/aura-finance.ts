import type { Project } from "@/types/project";

/** TODO João: confirmar o ano e se existiu camada de dados real. */
export const auraFinance: Project = {
  slug: "aura-finance",
  title: "Aura Finance",
  tagline:
    "Interface de gestão de ativos e investimentos, desenhada para tornar densidade de dados legível.",
  summary:
    "Plataforma financeira voltada à gestão de ativos e investimentos. O problema central é de design de informação: produtos financeiros carregam muito número por tela, e a tentação é reduzir a densidade até a interface deixar de ser útil. A solução foi hierarquia — o resumo antes do detalhe, e o detalhe sempre a um gesto de distância.",

  tier: "reduced",
  disciplines: ["frontend", "design"],

  year: 2025,
  role: "UI/UX Design & Front-end",
  client: "Aura Finance",

  cover: {
    src: "/img/aura-thumb.avif",
    alt: "Painel da Aura Finance com o resumo da carteira e a evolução dos ativos",
  },

  hero: {
    src: "/img/aura-capa.avif",
    alt: "Capa do case Aura Finance com o painel de investimentos",
  },

  preloaderColor: "#16342C",

  stack: [
    { layer: "Front-end", items: ["HTML", "CSS", "JavaScript"] },
    {
      layer: "Design",
      items: ["Figma", "Design de informação", "Design system"],
    },
  ],

  links: {},

  result: [
    "Painel que apresenta o resumo da carteira antes de qualquer detalhamento.",
    "Sistema de tipografia com dígitos tabulares, para que colunas de valores alinhem.",
  ],

  palette: [
    { token: "primary", hex: "#38B28B", use: "Ações e indicadores positivos" },
    { token: "deep", hex: "#207659", use: "Estados de destaque e hover" },
    { token: "ink", hex: "#1A2433", use: "Texto e fundo dos painéis" },
    { token: "surface", hex: "#F8F9FA", use: "Fundo das áreas de conteúdo" },
  ],

  typography: {
    display: "Outfit",
    body: "Outfit",
    note: "Outfit Regular for paragraphs. Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz",
  },

  // As sete telas do original, na mesma ordem.
  gallery: [
    {
      src: "/img/aura-1.avif",
      alt: "Painel principal da Aura Finance com saldo consolidado e gráfico de evolução",
      index: "01",
      title: "Visão da carteira",
    },
    {
      src: "/img/aura-2.avif",
      alt: "Listagem de ativos com variação percentual e alocação por categoria",
      index: "02",
      title: "Ativos",
    },
    {
      src: "/img/aura-3.avif",
      alt: "Distribuição da carteira por categoria de investimento",
      index: "03",
      title: "Alocação",
    },
    {
      src: "/img/aura-4.avif",
      alt: "Tela de detalhe de um investimento com histórico de rendimento",
      index: "04",
      title: "Detalhe do investimento",
    },
    {
      src: "/img/aura-5.avif",
      alt: "Versão mobile do painel financeiro com navegação simplificada",
      index: "05",
      title: "Mobile",
    },
    {
      src: "/img/aura-6.avif",
      alt: "Tela de movimentações com histórico de aportes e resgates",
      index: "06",
      title: "Movimentações",
    },
    {
      src: "/img/aura-7.avif",
      alt: "Componentes da interface financeira reunidos em uma folha de estilo",
      index: "07",
      title: "Componentes",
    },
  ],
};
