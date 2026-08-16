import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Imagem de compartilhamento da home.
 *
 * A versão anterior não tinha nenhuma tag Open Graph nas nove páginas, então
 * o link compartilhado no LinkedIn ou no WhatsApp aparecia como um card vazio
 * — o pior lugar possível para um portfólio perder a primeira impressão.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.14em",
            color: "#FF4400",
            textTransform: "uppercase",
          }}
        >
          {site.name} — Full Stack &amp; UI/UX
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}
        >
          Desenho a interface e construo o sistema por trás dela.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #333333",
            paddingTop: "28px",
            fontSize: 22,
            color: "#B4B4B4",
          }}
        >
          <span>Next.js · TypeScript · Node · Supabase</span>
          <span style={{ color: "#8A8A8A" }}>{site.location}</span>
        </div>
      </div>
    ),
    size
  );
}
