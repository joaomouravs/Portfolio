import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProject,
  projectsWithPage,
} from "@/lib/projects";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";
import { ContactFooter } from "@/components/layout/ContactFooter";
import { imageSize } from "@/lib/image-size";
import { RefugioCase } from "@/components/case/RefugioCase";
import { ExternalIcon } from "@/components/ui/SocialIcons";

export function generateStaticParams() {
  return projectsWithPage.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projeto não encontrado" };

  return {
    title: `${project.title} — ${project.tagline.split(",")[0]}`,
    description: project.tagline,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} | João Vitor`,
      description: project.tagline,
      url: `/projetos/${project.slug}`,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | João Vitor`,
      description: project.tagline,
      images: [project.cover.src],
    },
  };
}

/**
 * Página interna de projeto — mesma estrutura das páginas originais:
 *
 *   hero de tela cheia em preto e branco (colore no hover)
 *   → fita laranja com a stack em marquee
 *   → título gigante + panorama geral + painel de metadados
 *   → timeline lateral fixa + guia de estilo + galeria com cortina
 *   → mais projetos
 *   → rodapé de contato
 *
 * As oito páginas antigas repetiam esse molde à mão, com um par CSS/JS
 * duplicado byte a byte para cada uma. Agora é um só componente alimentado
 * pelos dados do projeto.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const structuredData = (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema(project)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Projetos", path: "/#projetos" },
              { name: project.title, path: `/projetos/${project.slug}` },
            ])
          ),
        }}
      />
    </>
  );

  // O Refúgio tinha layout próprio no original e continua tendo.
  if (project.slug === "refugio") {
    return (
      <>
        {structuredData}
        <RefugioCase project={project} />
      </>
    );
  }

  const { previous, next } = getAdjacentProjects(project.slug);
  const stack = project.stack.flatMap((layer) => layer.items);

  // O hero da página é um arquivo próprio na maioria dos projetos; quando
  // não há, usa a mesma imagem do card.
  const hero = project.hero ?? project.cover;
  const marquee = `STACK: ${stack.join(", ").toUpperCase()} • ANO: ${project.year} • ROLE: ${project.role.toUpperCase()} • `;

  // Os três marcos da timeline lateral, ancorados nas seções reais da página.
  const steps = [
    { id: "step-1", label: "01. Conceito" },
    { id: "step-2", label: "02. Interfaces" },
    { id: "step-3", label: "03. Resultado" },
  ];

  return (
    <div className="project-page">
      {structuredData}

      {/* ============================ HERO ============================ */}
      <header
        className="project-hero-wrapper"
        style={{ position: "relative", zIndex: 2 }}
        id="conteudo"
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="project-hero-img"
        />
      </header>

      <div className="marquee-tape" style={{ position: "relative", zIndex: 2 }}>
        <div className="marquee-content">
          <span>{marquee}</span>
          <span>{marquee}</span>
          <span>{marquee}</span>
        </div>
      </div>

      {/* ========================= PANORAMA ========================= */}
      <section
        className="project-info-section"
        style={{ position: "relative", zIndex: 2, background: "#000" }}
      >
        <h1 className="project-main-title scramble">{project.title}</h1>
        <div className="project-overview-grid">
          <span className="section-tag">{"// "}Panorama geral</span>
          <div className="overview-text reveal-text">
            <p>
              {project.summary.split(" ").map((word, index) => (
                <span key={`${index}-${word}`}>{word} </span>
              ))}
            </p>

            <div className="project-meta-panel">
              <div className="meta-item">
                <span>Cliente</span>
                <p>{project.client}</p>
              </div>
              <div className="meta-item">
                <span>Papel</span>
                <p>{project.role}</p>
              </div>
              <div className="meta-item">
                <span>Ano</span>
                <p>{project.year}</p>
              </div>
              {project.links.live ? (
                <div className="meta-item">
                  <span>Live</span>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-target"
                  >
                    Ver ao vivo <ExternalIcon />
                  </a>
                </div>
              ) : (
                <div className="meta-item">
                  <span>Stack</span>
                  <p>{stack.slice(0, 3).join(" · ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CORPO + TIMELINE ===================== */}
      <section
        className="project-body-wrapper"
        style={{ position: "relative", zIndex: 2, background: "#000" }}
      >
        <div className="timeline-sidebar">
          <div className="timeline-line">
            <div className="timeline-progress" />
          </div>
          <ul className="timeline-steps">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`step${index === 0 ? " active" : ""}`}
                data-target={step.id}
              >
                {step.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="project-content-right">
          {/* ===== GUIA DE ESTILO ===== */}
          {(project.palette || project.typography) && (
            <div className="design-system-section" id="step-1">
              <span className="section-tag">{"// "}Sistema de design</span>
              <div className="ds-grid">
                {project.palette && (
                  <div className="ds-colors">
                    {project.palette.slice(0, 4).map((swatch) => (
                      <div
                        className="color-box"
                        key={swatch.token}
                        style={{
                          background: swatch.hex,
                          color: isLight(swatch.hex) ? "#000" : "#fff",
                        }}
                      >
                        <span className="scramble">{swatch.hex}</span>
                      </div>
                    ))}
                  </div>
                )}

                {project.typography && (
                  <div className="ds-typography">
                    <h1 className="font-primary">{project.typography.display}</h1>
                    <p className="font-secondary">
                      {project.typography.note ??
                        `${project.typography.body} for paragraphs.`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===== GALERIA =====
              O ritmo do original: uma tela em largura cheia, depois duas
              lado a lado, depois cheia de novo. Empilhar tudo em coluna
              única achataria a leitura da página. */}
          <div className="project-gallery-section" id="step-2">
            {chunkGallery(project.gallery).map((group, groupIndex) =>
              group.length === 1 ? (
                <GalleryShot
                  key={group[0]!.src}
                  shot={group[0]!}
                  eager={groupIndex === 0}
                />
              ) : (
                <div className="gallery-2-col" id="step-3" key={group[0]!.src}>
                  {group.map((shot) => (
                    <GalleryShot key={shot.src} shot={shot} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===================== MAIS PROJETOS ===================== */}
      <section
        className="more-projects-section"
        style={{
          position: "relative",
          zIndex: 2,
          background: "#000",
          paddingBottom: 200,
        }}
      >
        <span className="section-tag">{"// "}Mais Projetos</span>
        <div className="more-projects-grid">
          {[previous, next]
            .filter(
              (item, index, all) =>
                item && all.findIndex((other) => other?.slug === item.slug) === index
            )
            .map((item) =>
              item ? (
                <Link
                  href={`/projetos/${item.slug}`}
                  className="more-project-card click-target"
                  key={item.slug}
                >
                  <div className="more-project-img-wrapper">
                    <Image
                      src={item.cover.src}
                      alt={item.cover.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 1600px"
                    />
                  </div>
                  <div className="more-project-details">
                    <h3>{item.title}</h3>
                    <p>({item.year})</p>
                  </div>
                </Link>
              ) : null
            )}
        </div>
      </section>

      <ContactFooter variant="project" />
    </div>
  );
}

/** Uma tela da galeria, com a cortina de revelação e o tilt 3D. */
function GalleryShot({
  shot,
  eager = false,
}: {
  shot: { src: string; alt: string };
  eager?: boolean;
}) {
  return (
    <div
      className="gallery-item hover-target tilt-card clip-reveal"
      data-cursor-text="VIEW"
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        {...imageSize(shot.src)}
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, 1600px"
      />
    </div>
  );
}

/**
 * Agrupa as telas no ritmo do original: cheia, par, cheia, par…
 * A primeira e a terceira ocupam a largura toda; as do meio vão em duas
 * colunas.
 */
function chunkGallery<T>(shots: T[]): T[][] {
  const groups: T[][] = [];
  let index = 0;
  let full = true;

  while (index < shots.length) {
    if (full) {
      groups.push([shots[index]!]);
      index += 1;
    } else {
      const pair = shots.slice(index, index + 2);
      groups.push(pair);
      index += pair.length;
    }
    full = !full;
  }

  return groups;
}

/** Decide se o texto sobre a amostra deve ser preto, como fazia o markup
 *  escrito à mão de cada página (`style="color: #000"` nas cores claras). */
function isLight(hex: string): boolean {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}
