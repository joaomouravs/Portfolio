"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[erro na página]", error);
  }, [error]);

  return (
    <div
      className="intro-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "transparent",
      }}
    >
      <div className="intro-container">
        <span className="section-tag">{"// "}Erro</span>
        <h2
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 30,
          }}
        >
          Alguma coisa quebrou aqui.
        </h2>
        <div className="intro-secondary">
          <p>
            Não foi você. Tente carregar de novo — se continuar, me avise em{" "}
            <a href={`mailto:${site.email}`} style={{ color: "#FF4400" }}>
              {site.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn-outline hover-target magnetic click-target"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}
