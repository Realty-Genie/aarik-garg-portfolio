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
    <main className="min-h-screen bg-[oklch(89%_9%_76deg)] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <p className="text-3xl italic text-[#7b4d2a] [font-family:var(--font-libertinus),serif]">For Aarik</p>
          <h1 className="mt-2 text-5xl font-black uppercase leading-tight text-[#17130f] [font-family:var(--font-caveat),cursive] sm:text-6xl">
            Send a Wish ✍️
          </h1>
          <p className="mt-3 text-lg text-[#543612] [font-family:var(--font-libertinus),serif]">
            Leave your love, blessing, or prayer for little Aarik. <span className="text-[#c88716]">♥</span>
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#fff6e8] py-16 text-center shadow-[12px_12px_0_rgba(23,19,15,0.12)]">
            <span className="text-6xl animate-bounce">📌</span>
            <h2 className="text-4xl font-black text-[#e3a83b] uppercase [font-family:var(--font-caveat),cursive]">Pinned!</h2>
            <p className="text-xl leading-8 text-[#302215] [font-family:var(--font-libertinus),serif]">
              Your warm wish is now on the wall! <br />Taking you there…
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={`relative rounded-2xl p-8 shadow-[16px_16px_0_rgba(23,19,15,0.14)] [font-family:var(--font-caveat),cursive] ${selectedCardColor.class}`}
          >
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(rgba(35,27,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px]" />

            <div className="relative z-10 flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-lg font-black text-[#21170f]/70">Your Name</label>
                <input
                  type="text"
                  placeholder="Your Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                  required
                  className={`w-full rounded-xl border border-[#21170f]/15 bg-white/25 px-4 py-2.5 text-xl outline-none backdrop-blur-sm placeholder-[#21170f]/40 transition-all focus:border-[#e3a83b] focus:bg-white/40 focus:ring-1 focus:ring-[#e3a83b] ${selectedTextColor.class}`}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-lg font-black text-[#21170f]/70">Your Wish</label>
                <textarea
                  placeholder="Write your blessing or wish..."
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  disabled={submitting}
                  required
                  maxLength={250}
                  rows={5}
                  className={`w-full resize-none rounded-xl border border-[#21170f]/15 bg-white/25 px-4 py-2.5 text-xl outline-none backdrop-blur-sm placeholder-[#21170f]/40 transition-all focus:border-[#e3a83b] focus:bg-white/40 focus:ring-1 focus:ring-[#e3a83b] ${selectedTextColor.class}`}
                />
              </div>

              <div className="rounded-xl border border-[#21170f]/8 bg-white/20 p-4 flex flex-col gap-4">
                <div>
                  <p className="mb-2 text-base font-black text-[#21170f]/60">Card Color</p>
                  <div className="flex flex-wrap gap-2.5">
                    {CARD_COLORS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedCardColor(c)}
                        title={c.name}
                        style={{ backgroundColor: c.hex }}
                        className={`size-7 cursor-pointer rounded-full border border-[#21170f]/20 shadow-sm transition-all ${selectedCardColor.name === c.name ? "scale-125 border-[#21170f] ring-2 ring-[#e3a83b]" : "hover:scale-110"}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-base font-black text-[#21170f]/60">Text Color</p>
                  <div className="flex flex-wrap gap-2.5">
                    {TEXT_COLORS.map((tc) => (
                      <button
                        key={tc.name}
                        type="button"
                        onClick={() => setSelectedTextColor(tc)}
                        title={tc.name}
                        style={{ backgroundColor: tc.hex }}
                        className={`size-7 cursor-pointer rounded-full border border-[#21170f]/20 shadow-sm transition-all ${selectedTextColor.name === tc.name ? "scale-125 border-[#21170f] ring-2 ring-[#e3a83b]" : "hover:scale-110"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !name.trim() || !wishText.trim()}
                className="w-full rounded-xl border-none bg-[#e3a83b] py-3 text-2xl font-black uppercase text-white shadow transition hover:bg-[#c9922f] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:bg-gray-300 cursor-pointer [font-family:var(--font-caveat),cursive]"
              >
                {submitting ? "Pinning…" : "Pin Wish! 💝"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center">
          <a href="/wishes" className="text-lg text-[#7b4d2a] underline underline-offset-4 [font-family:var(--font-libertinus),serif] hover:text-[#c88716]">
            ← View all wishes
          </a>
        </div>
      </div>
    </main>
  );
}
