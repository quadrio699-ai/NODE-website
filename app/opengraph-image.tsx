import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NODE — Network of Digital Equity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0B1F3A 0%, #10192B 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "linear-gradient(135deg, #2F86D6, #1E5FA8)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 56, fontWeight: 700, color: "#ffffff" }}>
            NODE
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            fontWeight: 600,
            color: "#ffffff",
            maxWidth: 900,
            lineHeight: 1.25,
          }}
        >
          Learning shouldn&apos;t stop where the signal does.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 24,
            color: "#C9973E",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Network of Digital Equity
        </div>
      </div>
    ),
    { ...size }
  );
}
