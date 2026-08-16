import { site } from "@/content/site";

/**
 * Rodapé de contato — idêntico ao original: e-mail em laranja que copia ao
 * clicar, hora local de Rio de Janeiro e o botão redondo de voltar ao topo.
 *
 * A cópia do e-mail e o relógio são tratados por SiteEffects, então este
 * componente permanece um Server Component. O `<a>` continua sendo um mailto
 * de verdade: se a área de transferência não estiver disponível, o clique
 * abre o cliente de e-mail em vez de não fazer nada.
 */
export function ContactFooter({ variant }: { variant?: "project" }) {
  const isProject = variant === "project";

  return (
    <footer
      className={`contact-section${isProject ? " project-footer" : ""}`}
      id="contato"
      style={
        isProject
          ? {
              background:
                "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.5) 30%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 2,
            }
          : undefined
      }
    >
      <div className="contact-minimal-email" style={{ pointerEvents: "auto" }}>
        <strong>E-mail:</strong>{" "}
        <a
          href={`mailto:${site.email}`}
          className="hover-target scramble copy-email click-target"
        >
          {site.email}
        </a>

        <div className="local-time-wrapper">
          Local time: {site.location} •{" "}
          {/* SiteEffects escreve a hora aqui assim que monta, então o
              conteúdo do servidor e o do cliente divergem de propósito. */}
          <span id="local-time" suppressHydrationWarning>
            --:--
          </span>
        </div>
      </div>

      <button
        type="button"
        className="back-to-top hover-target magnetic click-target"
        title="Voltar ao Topo"
        style={{ pointerEvents: "auto" }}
      >
        <span className="sr-only">Voltar ao topo</span>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
    </footer>
  );
}
