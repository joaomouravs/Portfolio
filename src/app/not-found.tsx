import Link from "next/link";

/**
 * 404 com a linguagem visual do site: fundo preto, título em Space Grotesk,
 * botão outline arredondado. O original não tinha página de erro alguma.
 */
export default function NotFound() {
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
        <span className="section-tag">{"// "}Erro 404</span>
        <h2
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            marginBottom: 30,
          }}
        >
          Esta página não existe.
        </h2>
        <div className="intro-secondary">
          <p>
            O endereço pode ter mudado. Os projetos estão todos na home.
          </p>
          <Link href="/" className="btn-outline hover-target magnetic click-target">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
