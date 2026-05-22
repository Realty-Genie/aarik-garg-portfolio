"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CARD_COLORS = [
  { name: "Vanilla Gold", class: "bg-[#f3e3c5]", hex: "#f3e3c5" },
  { name: "Lavender", class: "bg-[#d8c8e4]", hex: "#d8c8e4" },
  { name: "Cream Paper", class: "bg-[#f8f3e8]", hex: "#f8f3e8" },
  { name: "Sunflower Yellow", class: "bg-[#f4d55b]", hex: "#f4d55b" },
  { name: "Rose Pink", class: "bg-[#f5c6c6]", hex: "#f5c6c6" },
  { name: "Sky Blue", class: "bg-[#c5e3f3]", hex: "#c5e3f3" },
  { name: "Mint Green", class: "bg-[#c5f3d8]", hex: "#c5f3d8" },
];

const TEXT_COLORS = [
  { name: "Charcoal Black", class: "text-[#21170f]", hex: "#21170f" },
  { name: "Crimson Red", class: "text-[#c22d2d]", hex: "#c22d2d" },
  { name: "Royal Blue", class: "text-[#1056a0]", hex: "#1056a0" },
  { name: "Forest Green", class: "text-[#1d7044]", hex: "#1d7044" },
  { name: "Deep Violet", class: "text-[#5e2b97]", hex: "#5e2b97" },
  { name: "Chocolate Brown", class: "text-[#543612]", hex: "#543612" },
];

export default function SendWishPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [wishText, setWishText] = useState("");
  const [selectedCardColor, setSelectedCardColor] = useState(CARD_COLORS[0]);
  const [selectedTextColor, setSelectedTextColor] = useState(TEXT_COLORS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !wishText.trim()) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/greets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          wish: wishText.trim(),
          cardColor: selectedCardColor.class,
          textColor: selectedTextColor.class,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/wishes"), 2000);
      } else {
        const errData = await res.json();
        alert(errData.message || "Failed to submit wish. Please try again.");
      }
    } catch {
      alert("Failed to submit wish due to a network error.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-[oklch(89%_9%_76deg)] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">

      {/* Doodles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden text-[#d08b19]" aria-hidden="true">
        <span className="absolute left-[3%] top-[12%] rotate-[-15deg] text-5xl leading-none [font-family:var(--font-caveat),cursive]">♡</span>
        <span className="absolute left-[7%] top-[38%] rotate-[8deg] text-4xl leading-none opacity-60 [font-family:var(--font-caveat),cursive]">♕</span>
        <span className="absolute left-[2%] bottom-[20%] rotate-[-10deg] text-6xl leading-none opacity-50 [font-family:var(--font-caveat),cursive]">♡</span>
        <span className="absolute right-[4%] top-[10%] rotate-[12deg] text-5xl leading-none [font-family:var(--font-caveat),cursive]">♕</span>
        <span className="absolute right-[2%] top-[42%] rotate-[-8deg] text-4xl leading-none opacity-70 [font-family:var(--font-caveat),cursive]">♡♡</span>
        <span className="absolute right-[6%] bottom-[15%] rotate-[14deg] text-5xl leading-none opacity-55 [font-family:var(--font-caveat),cursive]">♕</span>
        <span className="absolute left-[45%] top-[6%] rotate-[5deg] text-3xl leading-none opacity-50 [font-family:var(--font-caveat),cursive]">✦</span>
        <span className="absolute left-[55%] bottom-[8%] rotate-[-12deg] text-4xl leading-none opacity-45 [font-family:var(--font-caveat),cursive]">♡</span>
        <svg className="absolute left-[15%] bottom-[10%] h-16 w-16 opacity-30" viewBox="0 0 60 60">
          <path d="M30 5v15M30 40v15M5 30h15M40 30h15" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"/>
          <path d="M12 12l8 8M40 40l8 8M48 12l-8 8M20 40l-8 8" fill="none" stroke="#e6a91d" strokeLinecap="round" strokeWidth="3"/>
        </svg>
        <svg className="absolute right-[12%] top-[28%] h-14 w-14 opacity-35" viewBox="0 0 60 60">
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx={10 + (i % 3) * 15} cy={10 + Math.floor(i / 3) * 15} r={i % 2 === 0 ? 2 : 1.3} fill="currentColor" opacity="0.8" />
          ))}
        </svg>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* Left — copy */}
        <div>
          <p className="text-2xl italic text-[#7b4d2a] [font-family:var(--font-comic-neue),cursive]">Psst… it&apos;s me, Aarik.</p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-[0.95] text-[#17130f] [font-family:var(--font-caveat),cursive] sm:text-6xl lg:text-7xl">
            Send me<br />a wish.
          </h1>
          <div className="mt-5 h-3 w-48 rounded-full bg-[#edb21c] [clip-path:polygon(0_38%,86%_25%,88%_0,100%_50%,88%_100%,86%_68%,0_72%)]" />

          <p className="mt-8 text-xl leading-9 text-[#302215] [font-family:var(--font-comic-neue),cursive]">
            Write something emotional, funny, dramatic, full of emojis, or all of the above.
            <br /><br />
            I&apos;ll read it one day and probably pretend I&apos;m not crying.
            <span className="ml-2 text-[#c88716]">♥</span>
          </p>

          <a
            href="/wishes"
            className="relative isolate mt-10 inline-flex h-14 items-center justify-center px-8 text-lg font-black text-[#21170f] transition hover:-translate-y-0.5 [font-family:var(--font-caveat),cursive]"
          >
            <svg
              className="absolute inset-0 -z-10 size-full text-[#e3a83b]"
              viewBox="0 0 210 62"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M13.4 42C4.8 30.5 8.4 14.1 26.4 8.3 43.8 2.8 69 5.5 88.1 3.4c28.2-3 48.7-4.7 70.7.9 15.9 4.5 22 13.5 24.5 22.1 14 2.2 19.4 11.2 12.5 20.1-8.3 11.2-30.2 11.6-47.8 10.7-25.1-1.3-44.1 3.8-69 5.1-27 1.4-51.1-.3-65.6-20.3Z"
              />
            </svg>
            <span className="relative z-10"> View All Wishes</span>
          </a>
        </div>

        {/* Right — sticky note form */}
        <div className="flex justify-center lg:justify-end">
          {success ? (
            <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-sm bg-[#f3e3c5] py-16 text-center shadow-[8px_8px_0_rgba(23,19,15,0.18)]">
              <span className="text-6xl animate-bounce">📌</span>
              <h2 className="text-4xl font-black uppercase text-[#e3a83b] [font-family:var(--font-caveat),cursive]">Pinned!</h2>
              <p className="text-xl leading-8 text-[#302215] [font-family:var(--font-libertinus),serif]">
                Your wish is on the wall!<br />Taking you there…
              </p>
            </div>
          ) : (
            <div className="relative w-full max-w-md rotate-[1deg] transition-transform hover:rotate-0">
              {/* tape strip */}
              <div
                className="absolute left-1/2 -top-4 z-20 h-8 w-32 -translate-x-1/2 rotate-[-2deg] rounded-[2px] border border-white/20 shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
                style={{
                  background: "repeating-linear-gradient(105deg,rgba(255,255,232,0.82) 0 10px,rgba(255,242,179,0.55) 10px 20px)",
                }}
              />

              <form
                onSubmit={handleSubmit}
                className={`relative rounded-sm p-8 pt-10 shadow-[8px_8px_0_rgba(23,19,15,0.2),16px_16px_0_rgba(23,19,15,0.08)] [font-family:var(--font-caveat),cursive] ${selectedCardColor.class}`}
              >
                {/* paper texture */}
                <span className="pointer-events-none absolute inset-0 rounded-sm bg-[linear-gradient(rgba(35,27,20,0.04)_1px,transparent_1px)] bg-[size:100%_32px]" />
                {/* dog-ear */}
                <span className="pointer-events-none absolute right-0 top-0 h-10 w-10 rounded-bl-sm bg-[linear-gradient(135deg,rgba(255,255,255,0.6)_0_49%,rgba(35,27,20,0.15)_50%,rgba(255,255,255,0.2)_56%)]" />

                <div className="relative z-10 flex flex-col gap-5">
                  <div>
                    <label className="mb-2 block text-2xl font-black text-[#21170f]/70">Your Name</label>
                    <input
                      type="text"
                      placeholder="What do I call you? 😊"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      required
                      className={`w-full border-0 border-b-2 border-[#21170f]/20 bg-transparent px-1 py-2 text-2xl outline-none placeholder-[#21170f]/35 transition-all focus:border-[#e3a83b] ${selectedTextColor.class}`}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-2xl font-black text-[#21170f]/70">Your Wish</label>
                    <textarea
                      placeholder="Make it emotional, funny, chaotic, full of emojis — Aarik will love it all 💛"
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      disabled={submitting}
                      required
                      maxLength={250}
                      rows={6}
                      className={`w-full resize-none border-0 bg-transparent px-1 py-1 text-2xl leading-9 outline-none placeholder-[#21170f]/35 transition-all focus:placeholder-[#21170f]/20 ${selectedTextColor.class}`}
                    />
                  </div>

                  <div className="border-t border-[#21170f]/10 pt-4 flex flex-col gap-3">
                    <div>
                      <p className="mb-2 text-sm font-black uppercase tracking-wider text-[#21170f]/50">Card Color</p>
                      <div className="flex flex-wrap gap-2">
                        {CARD_COLORS.map((c) => (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => setSelectedCardColor(c)}
                            title={c.name}
                            style={{ backgroundColor: c.hex }}
                            className={`size-6 cursor-pointer rounded-full border border-[#21170f]/20 shadow-sm transition-all ${selectedCardColor.name === c.name ? "scale-125 border-[#21170f] ring-2 ring-[#e3a83b]" : "hover:scale-110"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-black uppercase tracking-wider text-[#21170f]/50">Text Color</p>
                      <div className="flex flex-wrap gap-2">
                        {TEXT_COLORS.map((tc) => (
                          <button
                            key={tc.name}
                            type="button"
                            onClick={() => setSelectedTextColor(tc)}
                            title={tc.name}
                            style={{ backgroundColor: tc.hex }}
                            className={`size-6 cursor-pointer rounded-full border border-[#21170f]/20 shadow-sm transition-all ${selectedTextColor.name === tc.name ? "scale-125 border-[#21170f] ring-2 ring-[#e3a83b]" : "hover:scale-110"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !name.trim() || !wishText.trim()}
                    className="mt-1 w-full rounded-sm border-none bg-[oklch(24%_3%_88deg)] py-3 text-2xl font-black uppercase text-[#f3bc25] shadow-[4px_4px_0_rgba(23,19,15,0.25)] transition hover:bg-[oklch(30%_3%_88deg)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 cursor-pointer [font-family:var(--font-caveat),cursive]"
                  >
                    {submitting ? "Sending…" : "Send"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
