/**
 * Conteúdo institucional do site.
 *
 * ⚠ CAMPOS QUE PRECISAM DE VOCÊ, JOÃO — procure por TODO neste arquivo.
 * Três deles bloqueiam funcionalidades que hoje estão com valor de exemplo:
 * a URL do GitHub, o número de WhatsApp e o PDF do currículo.
 */

export const site = {
  name: "João Vitor",
  role: "Full Stack Developer & UI/UX Designer",
  email: "joaoviux@gmail.com",
  location: "Rio de Janeiro, BR",
  timezone: "America/Sao_Paulo",

  // TODO João: trocar pelo domínio final antes do deploy de produção.
  // Serve de base para canonical, sitemap e Open Graph.
  url: "https://joaovitor.dev",

  /** Aparece no hero. Remova quando não estiver aceitando projetos. */
  availability: "Disponível para novos projetos",

  description:
    "Desenvolvedor Full Stack e UI/UX Designer. Desenho a interface e construo o sistema por trás dela — Next.js, TypeScript, Node e Supabase, do Figma ao deploy.",
} as const;

export const socials = [
  {
    label: "GitHub",
    // TODO João: URL real do seu perfil. É o link mais importante da lista
    // para um posicionamento Full Stack, e o site anterior não tinha nenhum.
    href: "https://github.com/joaovux",
    primary: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jo%C3%A3o-vitor-aa9a6724b/",
    primary: true,
  },
  { label: "Behance", href: "https://www.behance.net/joovmourad", primary: false },
  { label: "Instagram", href: "https://www.instagram.com/joaovux", primary: false },
  { label: "X", href: "https://x.com/joaovux", primary: false },
] as const;

/** TODO João: número real, com DDI e DDD, só dígitos. */
export const whatsapp = {
  number: "5521999999999",
  message:
    "Olá, João! Vi seu portfólio e queria conversar sobre um projeto.",
};

/** TODO João: exportar o CV e salvar em public/joao-vitor-cv.pdf. */
export const resumeUrl = "/joao-vitor-cv.pdf";

/* ============================================================
   Serviços
   ============================================================ */

export const services = [
  {
    id: "produto-completo",
    title: "Produto digital completo",
    promise: "Da ideia ao ar, com uma pessoa só responsável.",
    description:
      "Quando o projeto precisa existir inteiro — e não sobrar nas costas de ninguém a tradução entre quem desenhou e quem construiu.",
    items: [
      "Discovery e definição de escopo",
      "UX e arquitetura de informação",
      "UI e design system",
      "Front-end em React e Next.js",
      "Back-end, banco de dados e integrações",
      "Deploy, ambientes e monitoramento",
    ],
  },
  {
    id: "interface",
    title: "Interface e design system",
    promise: "Interface pronta para produção, não só bonita no Figma.",
    description:
      "Desenho sabendo o que custa construir. O protótipo que entrego é o que dá para implementar — com tokens, estados e comportamento responsivo já resolvidos.",
    items: [
      "UI/UX Design",
      "Wireframes e protótipos navegáveis",
      "Design tokens e biblioteca de componentes",
      "Implementação em React e Tailwind",
      "Responsividade real por breakpoint",
      "Acessibilidade seguindo WCAG",
    ],
  },
  {
    id: "backend",
    title: "Back-end, integrações e infraestrutura",
    promise: "A camada que faz o produto funcionar de verdade.",
    description:
      "Autenticação, pagamento, e-mail, webhook, banco. É onde um site vira produto — e onde a maior parte dos projetos trava.",
    items: [
      "APIs e lógica server-side",
      "Modelagem em PostgreSQL e Supabase",
      "Autenticação e controle de sessão",
      "Pagamentos e processamento de webhooks",
      "E-mail transacional",
      "Deploy contínuo, ambientes e CI/CD",
    ],
  },
] as const;

/* ============================================================
   Stack por camada
   ============================================================ */

export const stackLayers = [
  {
    layer: "Front-end",
    summary:
      "Interfaces em produção com App Router, Server e Client Components e animação orquestrada.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "HTML", "CSS", "JavaScript"],
    appliedIn: ["refugio"],
  },
  {
    layer: "Back-end",
    summary:
      "Lógica server-side, integração com gateway de pagamento, e-mail transacional e processamento de eventos assíncronos.",
    items: ["Node.js", "Route Handlers", "Server Actions", "Webhooks", "PHP"],
    appliedIn: ["refugio", "turingbox"],
  },
  {
    layer: "Dados",
    summary:
      "Modelagem relacional, políticas de acesso por linha e autenticação sem senha.",
    items: ["Supabase", "PostgreSQL", "SQL", "Row Level Security"],
    appliedIn: ["refugio", "turingbox"],
  },
  {
    layer: "Infra",
    summary:
      "Deploy contínuo, ambientes separados, segredos fora do repositório e preview por branch.",
    items: ["Git", "GitHub", "Vercel", "Variáveis de ambiente", "CI/CD"],
    appliedIn: ["refugio"],
  },
  {
    layer: "Design",
    summary: "Do wireframe ao token entregue em código.",
    items: [
      "Figma",
      "Design Systems",
      "Prototipação",
      "Responsive Design",
      "Illustrator",
      "Photoshop",
    ],
    appliedIn: ["refugio", "turingbox", "driko-quirino"],
  },
] as const;

/* ============================================================
   Prova social
   ============================================================ */

export type Testimonial = {
  id: string;
  quote: string;
  /** Resultado mensurável, quando existir. Destacado tipograficamente. */
  highlight?: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "anderson",
    quote:
      "Profissionalismo e agilidade na entrega. O novo site aumentou nossas conversões em mais de 50% logo no primeiro mês.",
    highlight: "+50% de conversão",
    name: "Anderson Ramos",
    role: "CEO, Sorriso do Gás",
    avatar: "/img/foto-anderson.avif",
  },
  {
    id: "adriana",
    quote:
      "Seu olhar apurado para detalhes e abordagem inovadora impressionaram nossa equipe, transformando desafios em soluções criativas que o destacam.",
    name: "Adriana Quirino",
    role: "Fundadora, Driko Quirino",
    avatar: "/img/foto-adriana.avif",
  },
  {
    id: "fernanda",
    quote:
      "Trabalhar com o João foi uma experiência incrível. A qualidade técnica e o design entregue superaram todas as nossas expectativas.",
    name: "Fernanda Cristina",
    role: "Fundadora, Nanda Designer",
    avatar: "/img/foto-fernanda.avif",
  },
];

export function getTestimonial(id: string) {
  return testimonials.find((testimonial) => testimonial.id === id);
}

/* ============================================================
   Trajetória
   ============================================================ */

/**
 * TODO João: esta timeline está montada a partir do que dá para inferir dos
 * projetos. Ajuste as datas e adicione formação, cursos e qualquer
 * experiência formal — é a primeira coisa que um recrutador procura, e a
 * versão anterior do portfólio não tinha nenhuma.
 */
export const timeline = [
  {
    period: "2026",
    title: "Refúgio — Clube de cabanas autorais",
    description:
      "Landing editorial e sistema de sócios em Next.js e Supabase, com pagamento recorrente, ativação por webhook e acesso sem senha.",
    kind: "Projeto",
  },
  {
    period: "2025",
    title: "TuringBox — CEFET/RJ, Campus Nova Iguaçu",
    description:
      "Sistema institucional de empréstimo de equipamentos, com fluxo de aprovação, devolução e controle de estado por dispositivo.",
    kind: "Projeto",
  },
  {
    period: "2025",
    title: "Projetos de marca e interface",
    description:
      "Driko Quirino, Pata Feliz, Aura Finance, Étoile Academy e Solen — identidade visual, UI e front-end.",
    kind: "Projetos",
  },
] as const;
