import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instrument_Serif, Schibsted_Grotesk } from "next/font/google";
import type { Project } from "@/types/project";
import { ContactFooter } from "@/components/layout/ContactFooter";
import { imageSize } from "@/lib/image-size";
import { ExternalIcon } from "@/components/ui/SocialIcons";
import "./refugio.css";

/**
 * O Refúgio era a única página de projeto com layout próprio no original
 * (`legacy/refugio.css`, 15 KB e 28 classes exclusivas). Este componente
 * reproduz esse tratamento editorial: hero com coordenadas e pôster da marca,
 * paleta em swatches com token/hex/uso, specimens tipográficos com escala de
 * pesos, galeria com legendas numeradas, divisor do Diário e CTA de
 * fechamento.
 *
 * As fontes da marca são importadas aqui, e não no layout raiz, para que o
 * download só aconteça em quem abre este case.
 */

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-schibsted",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const steps = [
  { id: "step-1", label: "01. Conceito" },
  { id: "step-2", label: "02. Experiência" },
  { id: "step-3", label: "03. Sociedade" },
];

export function RefugioCase({ project }: { project: Project }) {
  const live = project.links.live;

  return (
    <div
      className={`project-page refugio-page ${schibsted.variable} ${instrumentSerif.variable}`}
    >
      {/* ============================ HERO ============================ */}
      <header
        className="project-hero-wrapper"
        style={{ position: "relative", zIndex: 2 }}
        id="conteudo"
      >
        <div className="refugio-hero">
          <div className="refugio-hero-top">
            <span className="rh-eyebrow">{"// "}Cabanas Autorais — Brasil</span>
            <span className="rh-coord">23°04′S / 46°07′O</span>
          </div>

          <div className="refugio-hero-center">
            <div
              className="refugio-hero-poster hover-target tilt-card"
              data-cursor-text="REFÚGIO"
            >
              <Image
                src="/img/perfil-refugio.avif"
                alt="Pôster da marca Refúgio sobre a fotografia de uma cabana"
                width={760}
                height={1160}
                priority
                sizes="(max-width: 768px) 72vw, 380px"
              />
            </div>
          </div>

          <div className="refugio-hero-bottom">
            <div className="rh-bottom-left">
              <p className="rh-tagline">
                Não é mais um quarto de hotel.{" "}
                <span className="font-serif italic">É silêncio com vista</span> —
                um lugar onde a única agenda do dia é a luz mudando na janela.
              </p>
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-live hover-target click-target"
                >
                  Ver site ao vivo <ExternalIcon />
                </a>
              )}
            </div>
            <span className="rh-scroll">
              Role para o case
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>
      </header>

      <div className="marquee-tape" style={{ position: "relative", zIndex: 2 }}>
        <div className="marquee-content">
          {Array.from({ length: 3 }, (_, index) => (
            <span key={index}>
              {`STACK: NEXT.JS, SUPABASE, ASAAS, RESEND, GSAP • ANO: ${project.year} • ROLE: ${project.role.toUpperCase()} • `}
            </span>
          ))}
        </div>
      </div>

      {/* ========================= PANORAMA ========================= */}
      <section
        className="project-info-section"
        style={{ position: "relative", zIndex: 2, background: "#000" }}
      >
        <h1 className="project-main-title scramble">
          Refúgio<span className="dot">.</span>
        </h1>
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
              <div className="meta-item">
                <span>Stack</span>
                <p>Next.js · Supabase · Asaas</p>
              </div>
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
          <div className="design-system-section" id="step-1">
            <span className="section-tag">{"// "}Guia de Estilo</span>
            <div className="ds-grid">
              <div className="refugio-palette">
                {project.palette?.map((swatch) => (
                  <div className="swatch hover-target" key={swatch.token}>
                    <div
                      className="swatch-chip"
                      style={{ background: swatch.hex }}
                    />
                    <div className="swatch-meta">
                      <span className="tok">{swatch.token}</span>
                      <span className="hex">{swatch.hex}</span>
                      <span className="use">{swatch.use}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="refugio-type">
                <div className="type-block">
                  <span className="type-label">Sans · principal</span>
                  <div className="type-sans-display">
                    Schibsted <span className="type-sans-name">Grotesk</span>
                  </div>
                  <div className="type-weights">
                    <span className="w400">Regular</span>
                    <span className="w500">Medium</span>
                    <span className="w600">SemiBold</span>
                    <span className="w700">Bold</span>
                    <span className="w800">ExtraBold</span>
                  </div>
                </div>

                <div className="type-block">
                  <span className="type-label">Serif · ênfase</span>
                  <div className="type-serif-display">
                    Instrument Serif, em itálico
                  </div>
                  <p className="type-serif-examples">
                    A serifa entra só onde a marca precisa falar:{" "}
                    <em>silêncio com vista</em>, <em>a luz na janela</em>,{" "}
                    <em>some quando precisar</em>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== GALERIA ===== */}
          <div className="project-gallery-section">
            {project.gallery.map((shot, index) => (
              <Fragment key={shot.src}>
                {/* O divisor do Diário separa o catálogo claro do modo
                    noturno, como no original. */}
                {index === 3 && (
                  <div className="diario-divider clip-reveal">
                    <span className="lbl">{"// "}Diário de campo</span>
                    O que acontece quando o dia inteiro cabe{" "}
                    <em>numa janela</em>.
                  </div>
                )}

                <div
                  className="gallery-block clip-reveal"
                  id={
                    index === 0
                      ? "step-2"
                      : index === project.gallery.length - 3
                        ? "step-3"
                        : undefined
                  }
                >
                  <div className="shot-caption">
                    <span className="sc-index">
                      {shot.index} — {shot.title}
                    </span>
                    <span className="sc-note">{shot.note}</span>
                  </div>
                  <div className="shot hover-target" data-cursor-text="VIEW">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      {...imageSize(shot.src)}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, 1400px"
                    />
                  </div>
                </div>
              </Fragment>
            ))}

            {/* ===== CTA DE FECHAMENTO ===== */}
            {live && (
              <div className="refugio-cta clip-reveal">
                <span className="rcta-eyebrow">{"// "}Ao vivo</span>
                <h2 className="rcta-title">
                  Veja o Refúgio em funcionamento.
                </h2>
                <p className="rcta-sub">
                  Navegue pela landing editorial, o catálogo de cabanas e o
                  fluxo de sociedade — tudo no ar.
                </p>
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-live hover-target click-target"
                >
                  Abrir site ao vivo <ExternalIcon />
                </a>
              </div>
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
          <Link href="/projetos/solen" className="more-project-card click-target">
            <div className="more-project-img-wrapper">
              <Image
                src="/img/solen-capa.avif"
                alt="Abertura do Solen com tipografia em escala monumental"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1600px"
              />
            </div>
            <div className="more-project-details">
              <h3>Solen — Creative Mode</h3>
              <p>(2025)</p>
            </div>
          </Link>

          <Link
            href="/projetos/driko-quirino"
            className="more-project-card click-target"
          >
            <div className="more-project-img-wrapper">
              <Image
                src="/img/driko-thumb.avif"
                alt="Página inicial da marca Driko Quirino"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1600px"
              />
            </div>
            <div className="more-project-details">
              <h3>Driko Quirino</h3>
              <p>(2025)</p>
            </div>
          </Link>
        </div>
      </section>

      <ContactFooter variant="project" />
    </div>
  );
}
