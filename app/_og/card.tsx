import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const dsCardSize = { width: 1200, height: 630 };
export const dsCardContentType = "image/png";

let fontCache: Buffer | null = null;
async function antonFont(): Promise<Buffer> {
  if (!fontCache) {
    fontCache = await readFile(join(process.cwd(), "app/_og/Anton-Regular.ttf"));
  }
  return fontCache;
}

export async function dsCard({
  num,
  technique,
  title,
  kicker = "Het playbook",
}: {
  num?: string;
  technique?: string;
  title: string;
  kicker?: string;
}) {
  const data = await antonFont();

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0c",
          fontFamily: "Anton",
          overflow: "hidden",
        }}
      >
        {/* gouden accentbalk links */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            width: 12,
            height: 630,
            backgroundColor: "#e6b13e",
          }}
        />
        {/* groot, subtiel nummer op de achtergrond */}
        {num ? (
          <div
            style={{
              position: "absolute",
              top: -40,
              right: 30,
              display: "flex",
              fontSize: 380,
              color: "#15151a",
              lineHeight: 1,
            }}
          >
            {num}
          </div>
        ) : null}

        {/* inhoud */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "70px 80px",
          }}
        >
          {/* wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              letterSpacing: 2,
              color: "#f1efe9",
              textTransform: "uppercase",
            }}
          >
            De Salesvloer
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 14,
                backgroundColor: "#e6b13e",
                marginLeft: 14,
              }}
            />
          </div>

          {/* titelblok */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 920,
            }}
          >
            {technique ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 30,
                  color: "#e6b13e",
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginBottom: 22,
                }}
              >
                {technique}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                fontSize: 92,
                color: "#f1efe9",
                lineHeight: 0.95,
                textTransform: "uppercase",
              }}
            >
              {title}
            </div>
          </div>

          {/* footer */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                width: 120,
                height: 5,
                backgroundColor: "#e6b13e",
                marginBottom: 18,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "#6d6b64",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              {kicker} — elke dag 1% scherper
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...dsCardSize,
      fonts: [{ name: "Anton", data, style: "normal", weight: 400 }],
    }
  );
}
