import { site, socials } from "@/content/site";
import type { Project } from "@/types/project";

/**
 * JSON-LD.
 *
 * O objetivo é que um mecanismo de busca entenda que a entidade "João Vitor"
 * é um Full Stack Developer com trabalhos publicados — e não precise inferir
 * isso do texto da página.
 */

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressCountry: "BR",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "UI Design",
      "UX Design",
      "Design Systems",
    ],
    sameAs: socials.map((social) => social.href),
  };
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.summary,
    url: `${site.url}/projetos/${project.slug}`,
    dateCreated: String(project.year),
    creator: { "@type": "Person", name: site.name, url: site.url },
    about: project.stack.flatMap((layer) => layer.items),
    image: `${site.url}${project.cover.src}`,
  };
}

export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
