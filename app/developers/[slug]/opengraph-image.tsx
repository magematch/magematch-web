import { ImageResponse } from "next/og";
import { supabase } from "../../../lib/supabase";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;

  let name = "Magento Developer";
  let title = "Adobe Commerce Specialist";
  let headline = "Verified Magento expert on MageMatch";

  try {
    const { data } = await supabase
      .from("developers")
      .select("name, title, headline")
      .eq("slug", slug)
      .eq("active", true)
      .single();

    if (data) {
      name = data.name ?? name;
      title = data.title ?? title;
      headline = data.headline ?? headline;
    }
  } catch {
    // fall through to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #fff7ed 0%, #ffffff 55%, #fef3c7 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Badge */}
        <div style={{ display: "flex", marginBottom: "28px" }}>
          <div
            style={{
              background: "#f97316",
              color: "#fff",
              borderRadius: "999px",
              padding: "6px 18px",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            Verified Developer · MageMatch
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#18181b",
            lineHeight: 1.1,
            marginBottom: "14px",
          }}
        >
          {name}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#f97316",
            marginBottom: "16px",
          }}
        >
          {title}
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 22,
            color: "#52525b",
            maxWidth: "820px",
            lineHeight: 1.5,
            marginBottom: "44px",
          }}
        >
          {headline.length > 120 ? headline.slice(0, 120) + "…" : headline}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "#f97316",
              borderRadius: "8px",
            }}
          />
          <div style={{ fontSize: 18, fontWeight: 700, color: "#18181b" }}>
            magematch.com/developers
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
