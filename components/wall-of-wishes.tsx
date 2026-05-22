"use client";

import { useEffect, useState, useRef } from "react";

type WishType = {
  Id: string;
  Name: string;
  Wish: string;
  Time: string;
  CardColor?: string;
  TextColor?: string;
};

const CARD_COLORS = [
  { name: "Vanilla Gold", class: "bg-[#f3e3c5]", hex: "#f3e3c5" },
  { name: "Lavender", class: "bg-[#d8c8e4]", hex: "#d8c8e4" },
  { name: "Cream Paper", class: "bg-[#f8f3e8]", hex: "#f8f3e8" },
  { name: "Sunflower Yellow", class: "bg-[#f4d55b]", hex: "#f4d55b" },
  { name: "Rose Pink", class: "bg-[#f5c6c6]", hex: "#f5c6c6" },
  { name: "Sky Blue", class: "bg-[#c5e3f3]", hex: "#c5e3f3" },
  { name: "Mint Green", class: "bg-[#c5f3d8]", hex: "#c5f3d8" }
];

const TEXT_COLORS = [
  { name: "Charcoal Black", class: "text-[#21170f]", hex: "#21170f" },
  { name: "Crimson Red", class: "text-[#c22d2d]", hex: "#c22d2d" },
  { name: "Royal Blue", class: "text-[#1056a0]", hex: "#1056a0" },
  { name: "Forest Green", class: "text-[#1d7044]", hex: "#1d7044" },
  { name: "Deep Violet", class: "text-[#5e2b97]", hex: "#5e2b97" },
  { name: "Chocolate Brown", class: "text-[#543612]", hex: "#543612" }
];

const CARD_STYLES = [
  {
    color: "bg-[#f3e3c5]",
    tape: "left-5 -top-4 rotate-[-10deg]",
    rotate: "rotate-[-3deg]",
    heart: "text-[#d72422]",
  },
  {
    color: "bg-[#d8c8e4]",
    tape: "left-8 -top-5 rotate-[8deg]",
    rotate: "rotate-[2deg]",
    heart: "text-[#7552a3]",
  },
  {
    color: "bg-[#f8f3e8]",
    tape: "right-8 -top-4 rotate-[-3deg]",
    rotate: "rotate-[-1deg]",
    heart: "text-[#0d73a8]",
    grid: true,
  },
  {
    color: "bg-[#f4d55b]",
    tape: "left-7 -top-4 rotate-[-9deg]",
    rotate: "rotate-[3deg]",
    heart: "text-[#9a6a12]",
  },
  {
    color: "bg-[#f5c6c6]",
    tape: "left-6 -top-4 rotate-[6deg]",
    rotate: "rotate-[-2deg]",
    heart: "text-[#c22d2d]",
  },
  {
    color: "bg-[#c5e3f3]",
    tape: "right-6 -top-5 rotate-[-8deg]",
    rotate: "rotate-[4deg]",
    heart: "text-[#1d72b8]",
  },
  {
    color: "bg-[#c5f3d8]",
    tape: "left-5 -top-4 rotate-[-5deg]",
    rotate: "rotate-[-4deg]",
    heart: "text-[#1da05c]",
  }
];

function BlobButton({
  children,
  className = "",
  onClick,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}>) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex h-16 items-center justify-center px-9 text-base font-black uppercase text-[#231b14] drop-shadow-[0_8px_0_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 [font-family:var(--font-caveat),cursive] border-none bg-transparent cursor-pointer ${className}`}
    >
      <svg
        className="absolute inset-0 -z-10 size-full text-[#e3a83b]"
        viewBox="0 0 210 82"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M13.4 54.8C4.8 40.5 8.4 19.1 26.4 11.3 43.8 3.8 69 7.5 88.1 5.4c28.2-3 48.7-6.7 70.7.9 15.9 5.5 22 17.5 24.5 28.1 14 2.2 19.4 13.2 12.5 24.1-8.3 13.2-30.2 13.6-47.8 12.7-25.1-1.3-44.1 3.8-69 5.1-27 1.4-51.1-.3-65.6-21.5Z"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function WallOfWishes() {
  const [wishes, setWishes] = useState<WishType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [wishText, setWishText] = useState("");
  
  const [selectedCardColor, setSelectedCardColor] = useState(CARD_COLORS[0]);
  const [selectedTextColor, setSelectedTextColor] = useState(TEXT_COLORS[0]);

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

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

        // Normalize keys robustly to match any header capitalization
        const normalized = rawWishes.map((item: any) => ({
          Id: item.Id ?? item.id ?? item.ID ?? String(Math.random()),
          Name: item.Name ?? item.name ?? item.NAME ?? "Anonymous",
          Wish: item.Wish ?? item.wish ?? item.WISH ?? "",
          Time: item.Time ?? item.time ?? item.TIME ?? new Date().toISOString(),
          CardColor: item.cardColor ?? item.cardcolor ?? item.CARDCOLOR ?? "",
          TextColor: item.textColor ?? item.textcolor ?? item.TEXTCOLOR ?? "",
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !wishText.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/greets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          wish: wishText.trim(),
          cardColor: selectedCardColor.class,
          textColor: selectedTextColor.class,
        }),
      });

      if (res.ok) {
        setName("");
        setWishText("");
        setSelectedCardColor(CARD_COLORS[0]);
        setSelectedTextColor(TEXT_COLORS[0]);
        setSuccess(true);
        // Refresh list
        await fetchWishes();
        // Hide success message after 4 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 4000);
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to submit wish. Please try again.");
      }
    } catch (error) {
      console.error("Failed to submit wish", error);
      alert("Failed to submit wish due to a network error.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleWriteWishClick = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);
  };

  // Helper to format date string nicely
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

  // Sort wishes chronologically or reverse-chronologically (newest first)
  const sortedWishes = [...wishes].sort((a, b) => {
    const timeA = new Date(a.Time).getTime();
    const timeB = new Date(b.Time).getTime();
    return timeB - timeA;
  });

  return (
    <section
      id="wishes"
      className="relative isolate z-10 overflow-hidden bg-[oklch(24%_3%_88deg)] pb-16 pt-36 text-white md:pb-20 md:pt-48"
      aria-labelledby="wall-title"
    >
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
            <p className="mt-3 text-sm text-white/88 [font-family:var(--font-inter),sans-serif] sm:text-base">
              Your wishes, love & blessings mean the world to me.{" "}
              <span className="text-[#e3a83b]">♡</span>
            </p>
          </div>
          <div className="flex justify-center md:flex-1 md:justify-end">
            <BlobButton onClick={handleWriteWishClick} className="rotate-[-3deg]">
              Write a Wish ✍️
            </BlobButton>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 justify-center items-stretch w-full max-w-7xl mx-auto">
          
          {/* Interactive Wish Form Card */}
          <div
            ref={formRef}
            className={`relative w-[300px] min-h-[410px] p-7 text-[#21170f] shadow-[0_12px_28px_-6px_rgba(0,0,0,0.35),0_4px_12px_-2px_rgba(0,0,0,0.22)] rounded-2xl ${selectedCardColor.class} border border-[#21170f]/10 rotate-[1deg] [font-family:var(--font-caveat),cursive] transition-all duration-300 hover:rotate-0 hover:scale-[1.03] hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.45)] flex flex-col justify-between`}
          >
            <span className="absolute left-1/2 -translate-x-1/2 -top-3.5 h-6 w-24 bg-white/35 backdrop-blur-[1px] border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.05)] rotate-[-1.5deg] rounded-sm pointer-events-none z-10" />
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(rgba(227,168,59,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(227,168,59,0.06)_1px,transparent_1px)] bg-[size:16px_16px]" />

            {success ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-6">
                <span className="text-5xl mb-3 animate-bounce">📌</span>
                <h3 className="text-3xl font-black text-[#e3a83b] uppercase">Pinned!</h3>
                <p className="text-2xl mt-4 leading-8 max-w-[200px] text-center mx-auto">
                  Your warm wish is now pinned to the wall! ♥
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between gap-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-black text-[#e3a83b] mb-3 text-center uppercase tracking-wider">
                    Pin a Wish ✍️
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    <input
                      ref={nameInputRef}
                      type="text"
                      placeholder="Your Name..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      required
                      className={`w-full bg-white/20 focus:bg-white/35 backdrop-blur-[1px] border border-[#21170f]/15 focus:border-[#e3a83b] focus:ring-1 focus:ring-[#e3a83b] outline-none text-2.5xl py-1 px-3.5 rounded-xl placeholder-[#21170f]/40 [font-family:var(--font-caveat),cursive] transition-all duration-200 ${selectedTextColor.class}`}
                    />
                    
                    <textarea
                      placeholder="Write your blessing or wish..."
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      disabled={submitting}
                      required
                      maxLength={250}
                      className={`w-full h-24 bg-white/20 focus:bg-white/35 backdrop-blur-[1px] border border-[#21170f]/15 focus:border-[#e3a83b] focus:ring-1 focus:ring-[#e3a83b] outline-none text-2.5xl py-2 px-3.5 rounded-xl resize-none placeholder-[#21170f]/40 [font-family:var(--font-caveat),cursive] transition-all duration-200 ${selectedTextColor.class}`}
                    />
                  </div>

                  {/* Selectors Panel */}
                  <div className="mt-3.5 bg-white/20 border border-[#21170f]/5 p-3 rounded-xl flex flex-col gap-3">
                    {/* Card Color Selector */}
                    <div>
                      <p className="text-base font-black mb-1.5 text-[#21170f]/60 leading-none">Card Color:</p>
                      <div className="flex flex-wrap gap-2">
                        {CARD_COLORS.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setSelectedCardColor(c)}
                            title={c.name}
                            style={{ backgroundColor: c.hex }}
                            className={`size-6 rounded-full border border-[#21170f]/20 shadow-sm transition-all duration-200 cursor-pointer ${
                              selectedCardColor.name === c.name ? "scale-125 border-[#21170f] ring-2 ring-[#e3a83b]" : "hover:scale-110"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Text Color Selector */}
                    <div>
                      <p className="text-base font-black mb-1.5 text-[#21170f]/60 leading-none">Text Color:</p>
                      <div className="flex flex-wrap gap-2">
                        {TEXT_COLORS.map((tc) => (
                          <button
                            key={tc.name}
                            type="button"
                            onClick={() => setSelectedTextColor(tc)}
                            title={tc.name}
                            style={{ backgroundColor: tc.hex }}
                            className={`size-6 rounded-full border border-[#21170f]/20 shadow-sm transition-all duration-200 cursor-pointer ${
                              selectedTextColor.name === tc.name ? "scale-125 border-[#21170f] ring-2 ring-[#e3a83b]" : "hover:scale-110"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !name.trim() || !wishText.trim()}
                  className="w-full py-2 flex items-center justify-center bg-[#e3a83b] hover:bg-[#c9922f] disabled:bg-gray-300 disabled:opacity-50 text-white font-black text-2xl uppercase rounded-xl shadow transition cursor-pointer [font-family:var(--font-caveat),cursive] hover:scale-[1.02] active:scale-95 border-none"
                >
                  {submitting ? "Pinning..." : "Pin Wish! 💝"}
                </button>
              </form>
            )}
          </div>

          {/* Wishes List (Fetched + Defaults) */}
          {loading ? (
            // Shimmer / skeleton states for loading wishes
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`loading-${idx}`}
                className="relative w-[300px] min-h-[320px] p-7 bg-[#faf6ee]/10 border border-white/10 rounded-2xl animate-pulse flex flex-col justify-between"
              >
                <div className="h-4 bg-white/20 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/20 rounded w-5/6 mb-3" />
                <div className="h-4 bg-white/20 rounded w-2/3" />
                <div className="mt-8">
                  <div className="h-4 bg-white/20 rounded w-1/3 mb-2" />
                  <div className="h-3 bg-white/10 rounded w-1/4" />
                </div>
              </div>
            ))
          ) : (
            sortedWishes.map((wish, i) => {
              const style = CARD_STYLES[i % CARD_STYLES.length];
              const cardColor = wish.CardColor || style.color;
              const textColor = wish.TextColor || "text-[#21170f]";
              const rotations = ["rotate-[-2deg]", "rotate-[1deg]", "rotate-[-1deg]", "rotate-[2deg]"];
              const rotateClass = rotations[i % rotations.length];
              
              return (
                <article
                  key={wish.Id || `${wish.Name}-${i}`}
                  className={`relative w-[300px] min-h-[320px] p-7 ${textColor} shadow-[0_12px_28px_-6px_rgba(0,0,0,0.3),0_4px_12px_-2px_rgba(0,0,0,0.2)] ${cardColor} border border-[#21170f]/10 ${rotateClass} rounded-2xl [font-family:var(--font-caveat),cursive] transition-all duration-300 hover:rotate-0 hover:scale-[1.03] hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.4)] flex flex-col justify-between`}
                >
                  <span className="absolute left-1/2 -translate-x-1/2 -top-3.5 h-6 w-24 bg-white/35 backdrop-blur-[1px] border border-white/20 shadow-[0_2px_4px_rgba(0,0,0,0.05)] rotate-[-2deg] rounded-sm pointer-events-none z-10" />
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(rgba(33,23,15,0.06)_1px,transparent_1px)] bg-[size:100%_28px]" />
                  
                  {/* Decorative soft watermark */}
                  <div className="absolute right-5 bottom-5 w-16 h-16 pointer-events-none opacity-[0.06] text-[#21170f] z-0">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 14h14v2H5v-2z" />
                    </svg>
                  </div>

                  <p className="relative text-[22px] leading-[28px] break-words whitespace-pre-wrap z-10">{wish.Wish}</p>
                  <div className="relative mt-6 text-lg z-10 flex flex-col gap-0.5">
                    <p className="font-bold">– {wish.Name} <span className={style.heart}>♥</span></p>
                    <p className="text-sm opacity-80 [font-family:var(--font-inter),sans-serif]">
                      {formatDate(wish.Time)}
                    </p>
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
