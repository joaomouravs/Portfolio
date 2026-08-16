import type { Project } from "@/types/project";

/**
 * ATENÇÃO, JOÃO — revisar antes de publicar.
 *
 * O conteúdo abaixo foi montado a partir do que já estava documentado na
 * página antiga (`legacy/refugio.html`): stack, paleta, tipografia, fluxo de
 * sociedade, legendas da galeria e link do site no ar. Tudo isso é verificável.
 *
 * Os campos `challenge` e `result` descrevem o problema que este desenho de
 * sistema necessariamente enfrenta, mas só você sabe como resolveu na prática.
 * Confirme ou reescreva os dois — e não substitua por métrica que você não
 * consiga sustentar numa entrevista.
 */
export const refugio: Project = {
  slug: "refugio",
  title: "Refúgio",
  tagline:
    "Clube de cabanas autorais com sistema de sócios, pagamento recorrente e ativação automática por webhook.",
  summary:
    "Refúgio reúne cabanas autorais pelo interior do Brasil em torno de uma ideia simples: silêncio com vista. O projeto une uma landing page editorial a um clube de sociedade completo — catálogo de locais, diário de campo e um sistema de membros com pagamento recorrente, área de conta protegida e ativação automática por webhook.",

  tier: "case",
  disciplines: ["fullstack", "frontend", "design"],

  year: 2026,
  role: "UI Design & Full-Stack Development",
  client: "Refúgio — Cabanas Autorais",

  cover: {
    src: "/img/capa-refugio.avif",
    alt: "Home do Refúgio com a marca sobreposta à foto de uma cabana ao entardecer",
  },

  preloaderColor: "#0d0d0d",
  preloaderTextColor: "#FF4400",

  stack: [
    { layer: "Front-end", items: ["Next.js", "React", "TypeScript", "GSAP"] },
    {
      layer: "Back-end",
      items: ["Route Handlers", "Webhooks", "E-mail transacional"],
    },
    { layer: "Dados", items: ["Supabase", "PostgreSQL"] },
    { layer: "Infra", items: ["Vercel", "Variáveis de ambiente"] },
    { layer: "Design", items: ["Figma", "Design tokens", "Tipografia editorial"] },
  ],

  links: {
    live: "https://refugio-next-joaovux-joaomouravs-projects.vercel.app/",
  },

  context:
    "Hospedagem em cabana é um mercado onde quase todo mundo se apresenta do mesmo jeito: uma grade de fotos, um botão de reservar e um formulário. O Refúgio precisava do oposto — a marca vende ausência de agenda, e o site tinha que provar isso antes de pedir qualquer coisa do visitante.",

  problem:
    "Além da landing editorial, o negócio dependia de um clube de sócios pago. Isso transformava um site de conteúdo em um produto com estado: alguém paga, vira sócio, ganha acesso antecipado às reservas e precisa conseguir voltar à própria conta depois — sem que ninguém administre isso manualmente.",

  goal:
    "Entregar uma landing que sustentasse a marca no tom editorial e, atrás dela, um sistema de sociedade que funcionasse sozinho: pagamento, ativação, acesso e cancelamento sem intervenção humana.",

  process: [
    "Defini a marca antes do layout. O ponto final em «refúgio.» virou o elemento de assinatura, e a paleta saiu de materiais reais — osso, creme, brasa, noite — em vez de uma escala genérica de cinzas.",
    "Separei o site em dois territórios com temperaturas opostas: o catálogo em tons claros de osso e creme, e o Diário de campo em modo noturno. A troca de tema marca a mudança de intenção — de escolher um lugar para habitar a ideia dele.",
    "Só depois desenhei o fluxo de sociedade, porque ele precisava caber dentro da mesma linguagem: nada de tela de checkout deslocada do resto do site.",
    "Escolhi acesso sem senha desde o início. Um clube de 44 cabanas não justifica pedir que o sócio memorize mais uma credencial, e senha é a principal fonte de suporte em produtos pequenos.",
  ],

  architecture: {
    intro:
      "O ponto interessante do sistema não é a landing — é o que acontece depois que alguém clica em «virar sócio». O pagamento é assíncrono, então o site não pode simplesmente confiar no redirecionamento de volta: quem decide se a pessoa é sócia é o webhook do gateway, não o navegador dela.",
    nodes: [
      {
        id: "browser",
        label: "Navegador",
        kind: "client",
        detail: "Landing editorial, catálogo de cabanas e área de conta",
      },
      {
        id: "app",
        label: "Next.js na Vercel",
        kind: "server",
        detail: "Server Components, Route Handlers e sessão do sócio",
      },
      {
        id: "asaas",
        label: "Asaas",
        kind: "external",
        detail: "Checkout e cobrança recorrente da assinatura",
      },
      {
        id: "webhook",
        label: "Route Handler de webhook",
        kind: "server",
        detail: "Recebe o evento de pagamento e decide a ativação",
      },
      {
        id: "db",
        label: "Supabase · PostgreSQL",
        kind: "data",
        detail: "Sócios, assinaturas e status, protegidos por RLS",
      },
      {
        id: "resend",
        label: "Resend",
        kind: "external",
        detail: "Envia o link mágico de acesso à conta",
      },
    ],
    edges: [
      { from: "browser", to: "app", label: "escolhe o plano" },
      { from: "app", to: "asaas", label: "cria a assinatura" },
      { from: "asaas", to: "webhook", label: "confirma o pagamento" },
      { from: "webhook", to: "db", label: "ativa o sócio" },
      { from: "webhook", to: "resend", label: "dispara o acesso" },
      { from: "resend", to: "browser", label: "link mágico por e-mail" },
      { from: "app", to: "db", label: "valida a sessão a cada visita" },
    ],
  },

  challenge: {
    title: "Confiar no webhook, não no redirecionamento",
    problem:
      "Quem paga é redirecionado de volta ao site em segundos, mas a confirmação do gateway pode chegar depois — ou chegar duas vezes, porque gateways reenviam eventos quando não recebem uma resposta de sucesso. Ativar o sócio no retorno do navegador significaria liberar acesso a quem abandonou o checkout e cobrar duas vezes quem não deveria.",
    solution:
      "A ativação acontece exclusivamente no Route Handler do webhook, e o status do sócio vive no banco, não na sessão. O identificador da cobrança é a chave da ativação, então um evento repetido encontra o registro já ativo e não produz efeito novo. O retorno do navegador leva a uma tela de «estamos confirmando», que consulta o status real em vez de assumir sucesso.",
    tradeoff:
      "O sócio pode esperar alguns segundos entre pagar e receber o acesso, o que é pior que a gratificação imediata de liberar na hora. Aceitei essa espera porque o custo do erro oposto — liberar acesso sem pagamento confirmado — recai sobre o cliente, não sobre a experiência.",
  },

  result: [
    "Landing editorial no ar, com catálogo de cabanas e o Diário de campo em tema noturno.",
    "Fluxo de sociedade completo: escolha de plano, cobrança recorrente, ativação automática e área de conta protegida.",
    "Acesso sem senha por link mágico — nenhuma credencial para o sócio memorizar e nenhuma rotina de recuperação para manter.",
    "Sistema opera sem intervenção manual: o cliente não precisa liberar acesso nem conferir pagamento.",
  ],

  palette: [
    { token: "bone", hex: "#EFEDE6", use: "Fundo principal" },
    { token: "cream", hex: "#F7F5EF", use: "Superfícies elevadas e cards" },
    { token: "ink", hex: "#16150F", use: "Texto principal e botões" },
    { token: "ash", hex: "#8B887B", use: "Labels e eyebrows" },
    { token: "line", hex: "#D8D4C8", use: "Bordas e divisores" },
    { token: "ember", hex: "#C56B2C", use: "Acento, CTAs e detalhes" },
    { token: "emberSoft", hex: "#E0925A", use: "Destaques e brilho suave" },
    { token: "night", hex: "#131009", use: "Fundo do Diário de campo" },
  ],

  typography: {
    display: "Schibsted Grotesk",
    body: "Instrument Serif",
    note: "Sans de 400 a 800 para estrutura; a serifa entra apenas em itálico, para as frases que carregam a voz da marca.",
  },

  gallery: [
    {
      src: "/img/refugio-1.avif",
      alt: "Home do Refúgio com a marca sobreposta à fotografia de uma cabana",
      index: "01",
      title: "Home · a marca encontra a cabana",
      note: "44 refúgios pelo Brasil",
    },
    {
      src: "/img/refugio-2.avif",
      alt: "Seção de manifesto da marca com tipografia serifada em itálico sobre fundo claro",
      index: "02",
      title: "Silêncio com vista",
      note: "A luz mudando na janela",
    },
    {
      src: "/img/refugio-3.avif",
      alt: "Catálogo editorial das cabanas, com quatro locais listados e suas fotografias",
      index: "03",
      title: "Quatro refúgios · nenhuma vizinhança",
      note: "Catálogo editorial",
    },
    {
      src: "/img/refugio-4.avif",
      alt: "Seção Diário de campo em tema escuro, com texto claro sobre fundo noturno",
      index: "04",
      title: "Modo noturno editorial",
      note: "A troca de tema marca a mudança de intenção",
    },
    {
      src: "/img/refugio-5.avif",
      alt: "Bloco de estatísticas da sociedade mostrando 44 refúgios em 9 estados",
      index: "05",
      title: "44 refúgios · 9 estados",
      note: "Sócios reservam antes de todos",
    },
    {
      src: "/img/refugio-8.avif",
      alt: "Tela de planos de sociedade com os valores da assinatura recorrente",
      index: "06",
      title: "Vire sócio · some quando precisar",
      note: "Pagamento recorrente via Asaas",
    },
    {
      src: "/img/refugio-9.avif",
      alt: "Tela de acesso à conta pedindo apenas o e-mail, sem campo de senha",
      index: "07",
      title: "Conta sem senha",
      note: "Link mágico enviado por e-mail",
    },
    {
      src: "/img/refugio-6.avif",
      alt: "Seção de reserva de uma noite com formulário de inscrição no diário",
      index: "08",
      title: "Reserve uma noite",
      note: "Diário por e-mail",
    },
    {
      src: "/img/refugio-7.avif",
      alt: "Rodapé do site com a assinatura da marca e o ponto final em destaque",
      index: "09",
      title: "A assinatura da marca",
      note: "O ponto de fuga",
    },
  ],
};
