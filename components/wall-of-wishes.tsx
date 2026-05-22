"use client";

import { useEffect, useState } from "react";

type WishType = {
  Id: string;
  Name: string;
  Wish: string;
  Time: string;
  CardColor?: string;
  TextColor?: string;
};

// Hand-torn paper note silhouettes — viewBox "0 0 300 340"
const PAPER_NOTE_PATHS = [
  "M37 20 C82 18 129 24 166 19 C206 14 242 19 264 20 C269 58 261 96 266 137 C272 185 265 225 270 308 C222 312 178 305 136 310 C91 315 59 312 29 309 C24 253 31 207 26 159 C21 108 29 68 37 20 Z",
  "M31 28 C73 13 111 21 151 17 C193 13 229 23 267 20 C264 63 270 104 263 149 C256 195 267 238 262 315 C219 310 178 319 132 312 C90 306 54 314 28 309 C34 248 25 204 31 156 C38 101 25 64 31 28 Z",
  "M39 16 C82 20 116 13 161 19 C202 25 239 17 268 22 C265 68 262 105 267 151 C272 198 262 236 268 310 C228 314 184 309 139 315 C94 321 58 313 31 310 C28 262 34 218 29 165 C23 113 35 73 39 16 Z",
  "M34 24 C74 21 117 24 158 18 C200 13 234 22 264 20 C270 70 263 114 267 162 C272 213 265 256 263 311 C222 306 179 314 134 309 C90 304 59 313 31 307 C33 258 27 209 32 158 C37 105 26 65 34 24 Z",
];

const CARD_STYLES = [
  { colorHex: "#f3e3c5", heart: "text-[#d72422]", doodle: "heart" },
  { colorHex: "#d8c8e4", heart: "text-[#7552a3]", doodle: "sun" },
  { colorHex: "#f8f3e8", heart: "text-[#0d73a8]", doodle: "heart" },
  { colorHex: "#f4d55b", heart: "text-[#9a6a12]", doodle: "crown" },
  { colorHex: "#f5c6c6", heart: "text-[#c22d2d]", doodle: "smile" },
  { colorHex: "#c5e3f3", heart: "text-[#1d72b8]", doodle: "spark" },
  { colorHex: "#c5f3d8", heart: "text-[#1da05c]", doodle: "heart" },
];

function extractHex(colorClass: string): string | null {
  const match = colorClass.match(/#[0-9a-fA-F]{3,8}/);
  return match ? match[0] : null;
}

function getStringField(
  item: Record<string, unknown>,
  keys: string[],
  fallback: string
) {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string") return value;
    if (typeof value === "number") return String(value);
  }

  return fallback;
}


export function WallOfWishes({ limit, showWave = true }: Readonly<{ limit?: number; showWave?: boolean }> = {}) {
  const [wishes, setWishes] = useState<WishType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchWishes() {
    try {
      const res = await fetch("/api/greets", {
        method: "GET",
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const rawWishes = Array.isArray(data)
          ? data
          : data && Array.isArray(data.wishes)
          ? data.wishes
          : [];

        const normalized = rawWishes.map((item: Record<string, unknown>) => ({
          Id: getStringField(item, ["Id", "id", "ID"], String(Math.random())),
          Name: getStringField(item, ["Name", "name", "NAME"], "Anonymous"),
          Wish: getStringField(item, ["Wish", "wish", "WISH"], ""),
          Time: getStringField(item, ["Time", "time", "TIME"], new Date().toISOString()),
          CardColor: getStringField(item, ["cardColor", "cardcolor", "CARDCOLOR"], ""),
          TextColor: getStringField(item, ["textColor", "textcolor", "TEXTCOLOR"], ""),
        }));

        setWishes(normalized);
      } else {
        console.error("Failed to fetch wishes: server error status", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch wishes", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchWishes();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function formatDate(dateStr: string) {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) {
        return dateStr;
      }
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  }

  const sortedWishes = [...wishes].sort((a, b) => {
    const timeA = new Date(a.Time).getTime();
    const timeB = new Date(b.Time).getTime();
    return timeB - timeA;
  });

  const displayedWishes = limit ? sortedWishes.slice(0, limit) : sortedWishes;

  return (
    <section
      id="wishes"
      className={`relative isolate z-10 overflow-hidden bg-[oklch(24%_3%_88deg)] pb-16 text-white md:pb-20 ${showWave ? "pt-36 md:pt-48" : "pt-10 md:pt-14"}`}
      aria-labelledby="wall-title"
    >
      {showWave && (
        <svg
          className="pointer-events-none absolute inset-x-0 -top-px h-24 w-full text-[oklch(92%_7%_74deg)]"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0 0H1440V63C1365 35 1324 76 1247 83C1167 91 1135 45 1051 55C970 65 942 107 860 96C777 85 747 45 667 58C589 71 560 112 488 99C411 85 386 56 318 72C247 89 225 119 157 99C93 80 58 48 0 60Z"
          />
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden text-[#d08b19]"
        aria-hidden="true"
      >
        <span className="absolute left-[7%] top-[18%] rotate-[-18deg] text-5xl leading-none [font-family:var(--font-caveat),cursive]">
          ♡
        </span>
        <span className="absolute right-[10%] top-[22%] rotate-12 text-6xl leading-none [font-family:var(--font-caveat),cursive]">
          ☆
        </span>
        <span className="absolute right-[5%] bottom-[18%] rotate-[-14deg] text-6xl leading-none opacity-70 [font-family:var(--font-caveat),cursive]">
          ♡♡
        </span>
        <span className="absolute left-[1%] bottom-[24%] rotate-[-10deg] text-7xl leading-none opacity-60 [font-family:var(--font-caveat),cursive]">
          〰
        </span>

        <svg
          className="absolute right-[18%] top-[14%] h-16 w-16"
          viewBox="0 0 60 60"
        >
          <path
            d="M30 5v15M30 40v15M5 30h15M40 30h15"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </svg>

        <svg
          className="absolute right-[7%] top-[36%] h-20 w-24 opacity-45"
          viewBox="0 0 96 80"
        >
          {Array.from({ length: 18 }).map((_, index) => (
            <circle
              key={index}
              cx={10 + (index % 6) * 13}
              cy={14 + Math.floor(index / 6) * 14}
              r={index % 3 === 0 ? 1.9 : 1.25}
              fill="currentColor"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-9 flex flex-col items-center gap-5 text-center md:mb-12 md:flex-row md:justify-between md:text-left">
          <div className="mx-auto md:mx-0 md:flex-1" />
          <div className="text-center">
            <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-[#e3a83b]" />
            <h2
              id="wall-title"
              className="text-4xl font-black uppercase tracking-wide text-white [font-family:var(--font-caveat),cursive] sm:text-5xl"
            >
              Wall of Wishes
            </h2>
            <p className="mt-3 text-sm text-white/88 [font-family:var(--font-comic-neue),cursive] sm:text-base">
These are my people. My tiny internet scrapbook of love, blessings, chaos, emojis, <br/> and emotional essays written because I sneezed once.
              <span className="text-[#e3a83b]">♡</span>
            </p>
          </div>
          <div className="flex justify-center md:flex-1 md:justify-end">
            <a
              href="/send-wish"
              className="relative inline-flex h-16 items-center justify-center px-9 text-base font-black uppercase text-[#231b14] drop-shadow-[0_8px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 [font-family:var(--font-caveat),cursive]"
            >
              <svg className="absolute inset-0 -z-10 size-full text-[#e3a83b]" viewBox="0 0 210 82" preserveAspectRatio="none" aria-hidden="true">
                <path fill="currentColor" d="M13.4 54.8C4.8 40.5 8.4 19.1 26.4 11.3 43.8 3.8 69 7.5 88.1 5.4c28.2-3 48.7-6.7 70.7.9 15.9 5.5 22 17.5 24.5 28.1 14 2.2 19.4 13.2 12.5 24.1-8.3 13.2-30.2 13.6-47.8 12.7-25.1-1.3-44.1 3.8-69 5.1-27 1.4-51.1-.3-65.6-21.5Z" />
              </svg>
              <span className="relative z-10">Write a Wish ✍️</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 justify-center items-start w-full max-w-7xl mx-auto">

          {/* Wishes List */}
          {loading ? (
            Array.from({ length: limit ?? 3 }).map((_, idx) => (
              <div
                key={`loading-${idx}`}
                className="relative h-[340px] w-[300px] animate-pulse"
                style={{ filter: "drop-shadow(0px 12px 14px rgba(0,0,0,0.32))" }}
              >
                <svg viewBox="0 0 300 340" className="absolute inset-0 h-full w-full" overflow="visible" aria-hidden="true">
                  <path
                    d={PAPER_NOTE_PATHS[idx % PAPER_NOTE_PATHS.length]}
                    fill="rgba(255,255,255,0.18)"
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute inset-x-11 top-20 z-10 flex flex-col gap-3">
                  <div className="h-4 w-5/6 rounded bg-white/20" />
                  <div className="h-4 w-4/5 rounded bg-white/20" />
                  <div className="h-4 w-3/4 rounded bg-white/20" />
                  <div className="mt-auto h-4 w-1/2 rounded bg-white/15" />
                  <div className="h-3 w-1/3 rounded bg-white/10" />
                </div>
              </div>
            ))
          ) : (
            displayedWishes.map((wish, i) => {
              const style = CARD_STYLES[i % CARD_STYLES.length];
              const storedHex = wish.CardColor ? extractHex(wish.CardColor) : null;
              const colorHex = storedHex || style.colorHex;
              const textColor = wish.TextColor || "text-[#21170f]";
              const rotations = ["rotate-[-2deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[2deg]", "rotate-[-1.5deg]", "rotate-[1deg]"];
              const rotateClass = rotations[i % rotations.length];
              const shapePath = PAPER_NOTE_PATHS[i % PAPER_NOTE_PATHS.length];
              const clipId = `paper-clip-${i}`;
              const textureId = `paper-texture-${i}`;
              const tapeRotation = ["rotate-[-12deg]", "rotate-[9deg]", "rotate-[-4deg]", "rotate-[11deg]"][i % 4];
              const tapePosition = [
                "left-5 -top-2",
                "right-8 -top-3",
                "left-1/2 -translate-x-1/2 -top-3",
                "left-7 -top-2",
              ][i % 4];
              const hasGrid = i % 4 === 2;

              return (
                <article
                  key={wish.Id || `${wish.Name}-${i}`}
                  className={`relative h-[340px] w-[300px] ${rotateClass} [font-family:var(--font-caveat),cursive] transition-all duration-300 hover:rotate-0 hover:scale-[1.035]`}
                >
                  <span
                    className={`absolute z-20 h-10 w-24 rounded-[2px] border border-white/15 bg-[#d8bd7a]/65 shadow-[0_3px_5px_rgba(0,0,0,0.16)] ${tapePosition} ${tapeRotation}`}
                    style={{
                      background:
                        "repeating-linear-gradient(105deg, rgba(222,190,116,0.72) 0 10px, rgba(244,221,158,0.46) 10px 20px)",
                    }}
                  />

                  {i % 4 === 1 && (
                    <svg
                      className="absolute left-10 -top-1 z-30 h-16 w-12 rotate-[-9deg] text-[#5d4f87]"
                      viewBox="0 0 52 76"
                      aria-hidden="true"
                    >
                      <path
                        d="M31 7 C18 7 14 20 14 31 L14 55 C14 69 35 69 35 54 L35 21 C35 9 20 8 20 22 L20 52"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="5"
                      />
                    </svg>
                  )}

                  <svg
                    viewBox="0 0 300 340"
                    className="absolute inset-0 h-full w-full"
                    overflow="visible"
                    style={{
                      filter: "drop-shadow(0px 14px 16px rgba(0,0,0,0.32)) drop-shadow(0px 4px 4px rgba(0,0,0,0.18))",
                    }}
                    aria-hidden="true"
                  >
                    <defs>
                      <clipPath id={clipId}>
                        <path d={shapePath} />
                      </clipPath>
                      <pattern id={textureId} width="18" height="18" patternUnits="userSpaceOnUse">
                        <circle cx="3" cy="5" r="0.8" fill="rgba(35,27,20,0.07)" />
                        <circle cx="12" cy="8" r="0.6" fill="rgba(35,27,20,0.05)" />
                        <path d="M1 14 L8 12 M12 16 L17 13" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
                      </pattern>
                    </defs>
                    <path
                      d={shapePath}
                      fill={colorHex}
                      stroke="rgba(35,27,20,0.18)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d={shapePath} fill={`url(#${textureId})`} clipPath={`url(#${clipId})`} />

                    {hasGrid && (
                      <g clipPath={`url(#${clipId})`} opacity="0.16">
                        {Array.from({ length: 11 }).map((_, row) => (
                          <line key={`h-${row}`} x1="32" x2="268" y1={44 + row * 22} y2={44 + row * 22} stroke="#21170f" strokeWidth="1" />
                        ))}
                        {Array.from({ length: 9 }).map((_, col) => (
                          <line key={`v-${col}`} x1={52 + col * 24} x2={52 + col * 24} y1="30" y2="307" stroke="#21170f" strokeWidth="1" />
                        ))}
                      </g>
                    )}

                    {style.doodle === "heart" && (
                      <path d="M224 53 C229 43 244 46 241 61 C239 72 225 79 217 84 C211 77 199 67 201 57 C204 44 218 45 224 53 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    )}
                    {style.doodle === "sun" && (
                      <g transform="translate(226 116)" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4">
                        <circle cx="0" cy="0" r="12" fill="none" />
                        <path d="M0 -23 V-17 M0 17 V23 M-23 0 H-17 M17 0 H23 M-16 -16 L-12 -12 M16 16 L12 12 M16 -16 L12 -12 M-16 16 L-12 12" />
                      </g>
                    )}
                    {style.doodle === "crown" && (
                      <path d="M207 76 L216 52 L231 70 L247 50 L253 80 Z M210 89 H253" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.7" />
                    )}
                    {style.doodle === "smile" && (
                      <g transform="translate(226 96)" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5">
                        <circle cx="0" cy="0" r="15" fill="none" />
                        <path d="M-6 -3 H-5 M6 -3 H7 M-7 6 C-2 12 6 11 10 5" />
                      </g>
                    )}
                    {style.doodle === "spark" && (
                      <g transform="translate(224 62)" stroke="currentColor" strokeLinecap="round" strokeWidth="2.7">
                        <path d="M0 -18 V18 M-18 0 H18" />
                        <path d="M-12 -12 L12 12 M12 -12 L-12 12" opacity="0.5" />
                      </g>
                    )}

                    <g clipPath={`url(#${clipId})`} opacity="0.09">
                      {Array.from({ length: 46 }).map((_, dot) => (
                        <circle
                          key={dot}
                          cx={30 + ((dot * 37) % 238)}
                          cy={34 + ((dot * 53) % 274)}
                          r={dot % 5 === 0 ? 1.1 : 0.65}
                          fill="#21170f"
                        />
                      ))}
                    </g>
                  </svg>

                  {/* Content */}
                  <div
                    className={`absolute inset-x-12 top-[66px] z-10 flex h-[220px] flex-col justify-between overflow-hidden ${textColor}`}
                  >
                    <p
                      className="flex-1 break-words text-[21px] leading-[30px]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {wish.Wish}
                    </p>
                    <div className="flex flex-shrink-0 flex-col gap-0.5 text-[18px]">
                      <p className="font-bold">
                        – {wish.Name} <span className={style.heart}>♥</span>
                      </p>
                      <p className="text-sm opacity-75 [font-family:var(--font-libertinus),serif]">
                        {formatDate(wish.Time)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
