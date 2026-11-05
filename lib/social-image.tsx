/* eslint-disable @next/next/no-img-element -- ImageResponse renders embedded image data through plain img elements. */
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export async function createSocialImage(
  tagline = "Custom software & AI for growing businesses",
) {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "app/assets/fonts/CormorantGaramond-Regular.ttf")),
    readFile(join(process.cwd(), "public/logo.png")),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          background: "#f8f5ef",
          color: "#222222",
          fontFamily: "Cormorant Garamond",
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt="Castlestone Technology logo"
          width={152}
          height={152}
          style={{ borderRadius: 76, objectFit: "cover", marginBottom: 28 }}
        />
        <div style={{ display: "flex", fontSize: 80, lineHeight: 1.1 }}>
          Castlestone Technology
        </div>
        <div
          style={{
            display: "flex",
            width: 560,
            height: 2,
            marginTop: 30,
            marginBottom: 24,
            background: "#c8a97e",
          }}
        />
        <div style={{ display: "flex", fontSize: 34, color: "#555555" }}>
          {tagline}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Cormorant Garamond", data: font, weight: 400, style: "normal" }],
    },
  )
}
