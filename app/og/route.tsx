import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const size = { width: 1200, height: 630 };

export function GET() {
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
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg,#34d39e,#059669)",
            }}
          />
          <div style={{ display: "flex", fontSize: 30, color: "#e5e7eb", fontWeight: 700 }}>
            LangGraph{" "}
            <span style={{ color: "#34d39e", marginLeft: 10 }}>Academy</span>
          </div>
        </div>

        {/* title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Master LangGraph, one graph at a time.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#94a3b8",
              maxWidth: 880,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#6ee7bd",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(52,211,158,0.4)",
              background: "rgba(16,185,129,0.12)",
            }}
          >
            Free · Hands-on tutorials
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
