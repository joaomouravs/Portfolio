import { ImageResponse } from "next/og";
import { getProject, projectsWithPage } from "@/lib/projects";
import { DISCIPLINE_LABEL } from "@/types/project";
import { site } from "@/content/site";

export const alt = "Case de projeto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projectsWithPage.map((project) => ({ slug: project.slug }));
}

/** Card de compartilhamento por case, gerado em build. */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

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
            gap: "16px",
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#FF4400",
          }}
        >
          {(project?.disciplines ?? []).map((discipline) => (
            <span key={discipline}>{DISCIPLINE_LABEL[discipline]}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
            }}
          >
            {project?.title ?? "Projeto"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#B4B4B4",
              lineHeight: 1.35,
              maxWidth: "940px",
            }}
          >
            {project?.tagline ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #333333",
            paddingTop: "28px",
            fontSize: 20,
            color: "#8A8A8A",
          }}
        >
          <span>
            {project?.stack.flatMap((layer) => layer.items).slice(0, 4).join(" · ")}
          </span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    size
  );
}
