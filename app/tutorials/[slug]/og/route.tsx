import { ImageResponse } from "next/og";
import { getTutorial, getTutorialSlugs } from "@/lib/tutorials";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return getTutorialSlugs().map((slug) => ({ slug }));
}

export function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const tutorial = getTutorial(params.slug);
  const title = tutorial?.title ?? siteConfig.name;
  const category = tutorial?.category ?? "LangGraph";
  const difficulty = tutorial?.difficulty ?? "";
  const duration = tutorial?.duration ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #060910 0%, #0b1120 55%, #052e26 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg,#34d39e,#059669)",
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: "#e5e7eb", fontWeight: 700 }}>
            LangGraph <span style={{ color: "#34d39e", marginLeft: 8 }}>Academy</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#34d39e", fontWeight: 600 }}>
            {category}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 60,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24 }}>
          {difficulty ? (
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid rgba(52,211,158,0.4)",
                background: "rgba(16,185,129,0.12)",
                color: "#6ee7bd",
              }}
            >
              {difficulty}
            </div>
          ) : null}
          {duration ? (
            <div style={{ display: "flex", color: "#94a3b8" }}>{duration} read</div>
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
