import { z } from "zod";

/**
 * Contrato de um projeto.
 *
 * O schema é validado em tempo de build: se um case esquecer a stack, o
 * papel ou o alt de uma imagem, o build falha em vez de publicar uma página
 * com buraco. Era exatamente o tipo de inconsistência que existia entre as
 * oito páginas de projeto escritas à mão.
 */

/** Quanto de profundidade o projeto merece. Nem todo projeto vira case. */
export const TierSchema = z.enum([
  "case", // os 9 blocos completos, incluindo arquitetura
  "reduced", // contexto, UI, resultado
  "showcase", // apenas card no índice
]);

export const DisciplineSchema = z.enum(["fullstack", "frontend", "design"]);

export const DISCIPLINE_LABEL: Record<
  z.infer<typeof DisciplineSchema>,
  string
> = {
  fullstack: "Full Stack",
  frontend: "Front-end",
  design: "UI / Design",
};

const ImageSchema = z.object({
  src: z.string().min(1),
  /** Descreve o que a tela mostra. "Mockup 1" não é alt text. */
  alt: z.string().min(12, "alt text precisa descrever o que a imagem mostra"),
  index: z.string().optional(),
  title: z.string().optional(),
  note: z.string().optional(),
});

const StackLayerSchema = z.object({
  layer: z.enum(["Front-end", "Back-end", "Dados", "Infra", "Design"]),
  items: z.array(z.string()).min(1),
});

const SwatchSchema = z.object({
  token: z.string(),
  hex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  use: z.string(),
});

/** Um nó do diagrama de arquitetura. */
const ArchNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  kind: z.enum(["client", "server", "data", "external"]),
  detail: z.string(),
});

const ArchEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string(),
});

export const ProjectSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "slug deve ser kebab-case, sem acentos"),
  title: z.string().min(1),
  /** Uma frase de posicionamento. Aparece no hero e nas meta tags. */
  tagline: z.string().min(20).max(180),
  summary: z.string().min(40),

  tier: TierSchema,
  disciplines: z.array(DisciplineSchema).min(1),

  year: z.number().int().min(2020).max(2030),
  role: z.string().min(1),
  client: z.string().min(1),

  /** Imagem do card no deck da home. */
  cover: ImageSchema,

  /**
   * Imagem de topo da página do projeto. No original era um arquivo
   * diferente do card em quase todos os casos — `turingbox-thumb` no deck e
   * `turingbox-capa` no hero, por exemplo. Quando ausente, cai no cover.
   */
  hero: ImageSchema.optional(),

  stack: z.array(StackLayerSchema).min(1),

  /**
   * Cor da cortina de abertura desta página. Cada projeto tinha a sua no
   * original — vermelho no TuringBox, verde-escuro no Aura Finance, areia no
   * Étoile — e é um detalhe de identidade que se perde se ficar fixo.
   */
  preloaderColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  preloaderTextColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),

  links: z
    .object({
      live: z.string().url().optional(),
      github: z.string().url().optional(),
    })
    .default({}),

  /* ---- Blocos de case. Obrigatórios apenas para tier "case". ---- */
  context: z.string().optional(),
  problem: z.string().optional(),
  goal: z.string().optional(),
  process: z.array(z.string()).optional(),
  architecture: z
    .object({
      intro: z.string(),
      nodes: z.array(ArchNodeSchema).min(2),
      edges: z.array(ArchEdgeSchema).min(1),
    })
    .optional(),
  challenge: z
    .object({
      title: z.string(),
      problem: z.string(),
      solution: z.string(),
      tradeoff: z.string(),
    })
    .optional(),
  result: z.array(z.string()).optional(),

  palette: z.array(SwatchSchema).optional(),
  typography: z
    .object({
      display: z.string(),
      body: z.string(),
      note: z.string().optional(),
    })
    .optional(),

  gallery: z.array(ImageSchema).default([]),

  /** Prova social exibida dentro do próprio case, no ponto de decisão. */
  testimonialId: z.string().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Discipline = z.infer<typeof DisciplineSchema>;
export type ArchNode = z.infer<typeof ArchNodeSchema>;
export type ArchEdge = z.infer<typeof ArchEdgeSchema>;

/**
 * Um projeto marcado como "case" precisa entregar o que promete. Sem esta
 * checagem, `tier: "case"` viraria só um rótulo.
 */
export const FullCaseSchema = ProjectSchema.refine(
  (project) =>
    project.tier !== "case" ||
    Boolean(
      project.context &&
        project.problem &&
        project.goal &&
        project.architecture &&
        project.challenge &&
        project.result?.length
    ),
  {
    message:
      "tier 'case' exige context, problem, goal, architecture, challenge e result",
  }
);
