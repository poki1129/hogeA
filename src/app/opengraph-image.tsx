import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ORIGINAL CHARACTER ARCHIVE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "100px",
          background:
            "radial-gradient(120% 120% at 80% 0%, #1a1a1a 0%, #0a0a0a 55%, #050505 100%)",
          color: "#ffffff",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "22px",
            letterSpacing: "10px",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div style={{ width: "56px", height: "1px", background: "rgba(255,255,255,0.45)" }} />
          ORIGINAL CHARACTER
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "34px",
            fontSize: "108px",
            lineHeight: 1.05,
            letterSpacing: "6px",
            color: "rgba(255,255,255,0.96)",
          }}
        >
          <div style={{ display: "flex" }}>CHARACTER</div>
          <div style={{ display: "flex" }}>ARCHIVE</div>
        </div>

        <div
          style={{
            marginTop: "40px",
            fontSize: "24px",
            letterSpacing: "6px",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          A QUIET ARCHIVE OF ORIGINAL CHARACTERS
        </div>
      </div>
    ),
    size,
  );
}
