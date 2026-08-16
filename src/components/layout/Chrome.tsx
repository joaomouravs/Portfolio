"use client";

import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { getProject } from "@/lib/projects";
import { SOUND_OFF_ICON } from "@/components/motion/SiteEffects";
import { PreloaderCounter } from "./PreloaderCounter";

/**
 * Todos os elementos fixos que a versão original repetia em cada arquivo
 * HTML: cortina de transição, barra de progresso, preloader, grão de filme,
 * cursor, botão de som, fundo e os dois tickers de vidro líquido.
 *
 * Aqui eles existem uma única vez, no layout — mas o resultado na tela é
 * exatamente o mesmo. O `#ticker-main` só aparece na home, como no original.
 */
export function Chrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProject = pathname.startsWith("/projetos/");

  // Cada página de projeto abre com a cortina na cor da própria identidade —
  // vermelho no TuringBox, verde-escuro no Aura Finance, areia no Étoile.
  const project = isProject
    ? getProject(pathname.replace("/projetos/", ""))
    : undefined;

  return (
    <>
      <div className="page-transition" />
      <div className="scroll-progress" />

      <div
        className={`preloader${isProject ? " project-preloader" : ""}`}
        style={
          project ? { backgroundColor: project.preloaderColor } : undefined
        }
      >
        <div
          className="preloader-counter"
          style={
            project?.preloaderTextColor
              ? { color: project.preloaderTextColor }
              : undefined
          }
        >
          <PreloaderCounter />
        </div>
      </div>

      <div className="film-grain" />
      <div className="custom-cursor" aria-hidden="true" />

      <button
        className="sound-toggle hover-target magnetic"
        aria-label="Ativar ou desativar som"
        aria-pressed="false"
        type="button"
        dangerouslySetInnerHTML={{ __html: SOUND_OFF_ICON }}
      />

      <div
        className="background-container"
        style={isHome ? undefined : { zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Fundo puramente decorativo: fica fora da árvore de acessibilidade
            e usa <img> direto porque é uma imagem fixa de tela cheia, já
            servida no tamanho e formato certos pelo script de otimização —
            passar pelo next/image aqui só somaria uma volta ao servidor. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/perfil.webp" alt="" className="background-image" />
        {isHome && <div className="dynamic-bg-layer" />}
        <div className="background-overlay" />
      </div>

      {isHome && (
        <GlassTicker id="ticker-main" text={`${site.name.toUpperCase()} `} repeat={3} />
      )}

      <GlassTicker
        id="ticker-contact"
        text="GET IN TOUCH - GET IN TOUCH "
        repeat={2}
        hidden
        overProject={!isHome}
      />
    </>
  );
}

/**
 * Ticker de vidro líquido: o texto funciona como máscara sobre a própria
 * fotografia de fundo, com um contorno branco por cima. É o elemento mais
 * característico do portfólio e foi reproduzido exatamente como estava.
 */
function GlassTicker({
  id,
  text,
  repeat,
  hidden = false,
  overProject = false,
}: {
  id: string;
  text: string;
  repeat: number;
  hidden?: boolean;
  overProject?: boolean;
}) {
  const maskId = `text-mask-${id}`;
  const content = Array.from({ length: repeat }, () => text).join(
    "   "
  );

  return (
    <div
      className="liquid-glass-ticker"
      id={id}
      aria-hidden="true"
      style={
        hidden
          ? {
              opacity: 0,
              ...(overProject ? { zIndex: 1, pointerEvents: "none" } : {}),
            }
          : undefined
      }
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id={maskId}>
            <text
              className="glass-text"
              x="100%"
              y="50%"
              dominantBaseline="central"
              fill="white"
            >
              {content}
            </text>
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          <image
            className="glass-bg-image"
            href="/img/perfil.webp"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
          <rect width="100%" height="100%" fill="rgba(255, 255, 255, 0.08)" />
        </g>
        <text
          className="glass-text"
          x="100%"
          y="50%"
          dominantBaseline="central"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        >
          {content}
        </text>
      </svg>
    </div>
  );
}
