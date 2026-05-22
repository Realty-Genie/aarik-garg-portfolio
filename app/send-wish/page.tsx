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
            className="mt-10 inline-block text-base text-[#7b4d2a] underline underline-offset-4 [font-family:var(--font-comic-neue),cursive] hover:text-[#c88716]"
          >
            ← View All Wishes 
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
                    <label className="mb-1.5 block text-lg font-black text-[#21170f]/70">Your Name</label>
                    <input
                      type="text"
                      placeholder="Your name…"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      required
                      className={`w-full border-0 border-b-2 border-[#21170f]/20 bg-transparent px-1 py-1.5 text-xl outline-none placeholder-[#21170f]/35 transition-all focus:border-[#e3a83b] ${selectedTextColor.class}`}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-lg font-black text-[#21170f]/70">Your Wish</label>
                    <textarea
                      placeholder="Write your wish here…"
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      disabled={submitting}
                      required
                      maxLength={250}
                      rows={6}
                      className={`w-full resize-none border-0 bg-transparent px-1 py-1 text-xl leading-8 outline-none placeholder-[#21170f]/35 transition-all focus:placeholder-[#21170f]/20 ${selectedTextColor.class}`}
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
                    className="mt-1 w-full rounded-sm border-none bg-[#e3a83b] py-3 text-2xl font-black uppercase text-white shadow-[4px_4px_0_rgba(23,19,15,0.18)] transition hover:bg-[#c9922f] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:bg-gray-300 cursor-pointer [font-family:var(--font-caveat),cursive]"
                  >
                    {submitting ? "Pinning…" : "Pin it! 📌"}
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
