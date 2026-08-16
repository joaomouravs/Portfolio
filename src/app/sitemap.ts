import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projectsWithPage } from "@/lib/projects";

/**
 * O site tem a mesma estrutura de rotas do original: uma home e uma página
 * por projeto. As seções institucionais continuam sendo âncoras dentro da
 * home, e por isso não entram aqui como URLs próprias.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectsWithPage.map((project) => ({
      url: `${site.url}/projetos/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: project.tier === "case" ? 0.9 : 0.6,
    })),
  ];
}
