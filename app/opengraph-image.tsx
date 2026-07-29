import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/lib/data";

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
          background: "#fbf3e7",
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
            border: "3px solid #16130d",
            background: "#fffdf7",
            boxShadow: "14px 14px 0 #16130d",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img
              src={`data:image/png;base64,${avatar.toString("base64")}`}
              width={72}
              height={72}
              style={{ borderRadius: 999, border: "3px solid #16130d" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 24, color: "#16130d" }}>{profile.location}</div>
              <div style={{ fontSize: 24, color: "#837a6b" }}>Portfolio · 2026</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontFamily: "Bricolage",
                fontSize: 96,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#16130d",
              }}
            >
              {profile.name}
            </div>
            <div style={{ fontSize: 34, color: "#4b4437", maxWidth: 700 }}>
              I turn ambiguous problems into interfaces people actually use.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {["Product Design", "Design Systems", "UI/UX"].map((t, i) => (
              <div
                key={t}
                style={{
                  fontSize: 24,
                  padding: "10px 22px",
                  borderRadius: 999,
                  color: "#fffdf7",
                  background: ["#ff5a34", "#2f49ff", "#7b3fe4"][i],
                }}
              >
                {t}
              </div>
            ))}
            <div style={{ marginLeft: "auto", fontSize: 26, color: "#16130d" }}>
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
