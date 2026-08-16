import { FullCaseSchema, type Discipline, type Project } from "@/types/project";
import { refugio } from "@/content/projects/refugio";
import { turingbox } from "@/content/projects/turingbox";
import { pataFeliz } from "@/content/projects/pata-feliz";
import { auraFinance } from "@/content/projects/aura-finance";
import { drikoQuirino } from "@/content/projects/driko-quirino";
import {
  auraArchitecture,
  etoileAcademy,
  solen,
} from "@/content/projects/showcase";

/**
 * Ordem de exibição — a mesma do deck original.
 *
 * O TuringBox abre a pilha porque é ele que recebe o tratamento de
 * `spotlight-card` (efeito lanterna e cor de fundo dinâmica); os demais usam
 * `tilt-card`. Trocar a ordem trocaria também qual card ganha qual efeito.
 */
const source: Project[] = [
  turingbox,
  refugio,
  pataFeliz,
  auraFinance,
  drikoQuirino,
  auraArchitecture,
  etoileAcademy,
  solen,
];

/**
 * Valida no carregamento do módulo. Como tudo aqui é resolvido em build,
 * um projeto malformado quebra o build — nunca chega ao ar como página com
 * campo faltando.
 */
export const projects: Project[] = source.map((project) => {
  const parsed = FullCaseSchema.safeParse(project);

  if (!parsed.success) {
    throw new Error(
      `Projeto "${project.slug}" inválido:\n` +
        parsed.error.issues
          .map((issue) => `  · ${issue.path.join(".")}: ${issue.message}`)
          .join("\n")
    );
  }

  return parsed.data;
});

/** Projetos com página própria. Vitrines só aparecem no índice. */
export const projectsWithPage = projects.filter(
  (project) => project.tier !== "showcase"
);

export const featuredProjects = projects.filter(
  (project) => project.tier === "case"
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Navegação circular entre cases — mantém a sessão viva no fim da página. */
export function getAdjacentProjects(slug: string) {
  const list = projectsWithPage;
  const index = list.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  };
}

/** Todas as tecnologias citadas, sem repetição, para alimentar os filtros. */
export function getAllTechnologies(): string[] {
  const set = new Set<string>();
  for (const project of projects) {
    for (const layer of project.stack) {
      for (const item of layer.items) set.add(item);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function filterProjects(options: {
  discipline?: Discipline | "all";
  technology?: string | "all";
}): Project[] {
  const { discipline = "all", technology = "all" } = options;

  return projects.filter((project) => {
    const matchesDiscipline =
      discipline === "all" || project.disciplines.includes(discipline);

    const matchesTechnology =
      technology === "all" ||
      project.stack.some((layer) => layer.items.includes(technology));

    return matchesDiscipline && matchesTechnology;
  });
}
