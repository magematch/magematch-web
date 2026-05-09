import { ImageResponse } from "next/og";
import { supabase } from "../../../lib/supabase";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;

  let title = "MageMatch Blog";
  let excerpt = "Magento & Adobe Commerce guides";

  try {
    const { data } = await supabase
      .from("posts")
      .select("title, description, excerpt")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (data) {
      const raw = data as { title?: string; description?: string; excerpt?: string };
      title = raw.title ?? title;
      excerpt = raw.description ?? raw.excerpt ?? excerpt;
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
        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
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
            MageMatch Blog
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 42 : 52,
            fontWeight: 800,
            color: "#18181b",
            lineHeight: 1.15,
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        <div
          style={{
            fontSize: 22,
            color: "#52525b",
            maxWidth: "820px",
            lineHeight: 1.5,
            marginBottom: "40px",
          }}
        >
          {excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt}
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "#f97316",
              borderRadius: "8px",
            }}
          />
          <div style={{ fontSize: 18, fontWeight: 700, color: "#18181b" }}>
            magematch.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
