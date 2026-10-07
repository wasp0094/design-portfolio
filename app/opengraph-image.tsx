import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (p: string) => readFile(join(process.cwd(), p));

export default async function Image() {
  const [display, body, avatar] = await Promise.all([
    asset("assets/bricolage-800.ttf"),
    asset("assets/archivo-500.ttf"),
    asset("public/aditi-avatar.png"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 56,
          background: "#f8f4ee",
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            borderRadius: 40,
            border: "3px solid #1e1d1a",
            background: "#ffffff",
            boxShadow: "14px 14px 0 #1e1d1a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={`data:image/png;base64,${avatar.toString("base64")}`}
              width={72}
              height={72}
              style={{ borderRadius: 999, border: "3px solid #1e1d1a" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 24, color: "#1e1d1a" }}>{profile.location}</div>
              <div style={{ fontSize: 24, color: "#6f6b63" }}>Portfolio · 2026</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontFamily: "Bricolage",
                fontSize: 96,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#1e1d1a",
              }}
            >
              {profile.name}
            </div>
            <div style={{ fontSize: 34, color: "#55524b", maxWidth: 700 }}>
              I research, design and build digital products.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {["Product Design", "Design Engineering", "Brand"].map((t, i) => (
              <div
                key={t}
                style={{
                  fontSize: 24,
                  padding: "10px 22px",
                  borderRadius: 999,
                  color: "#1e1d1a",
                  border: "3px solid #1e1d1a",
                  background: ["#f6cf57", "#b9a5f5", "#f3b0da"][i],
                }}
              >
                {t}
              </div>
            ))}
            <div style={{ marginLeft: "auto", fontSize: 26, color: "#1e1d1a" }}>
              designwithaditi.in
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Archivo", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
