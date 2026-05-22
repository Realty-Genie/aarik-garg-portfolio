import Image from "next/image";
import type { ReactNode } from "react";

function Scribble({ className = "" }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 230 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 25C35 3 49 45 82 16C112 -9 130 45 160 18C188 -7 202 36 225 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

function StoryBadge({
  children,
  className = "",
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <span
      className={`absolute z-20 px-5 py-3 text-lg font-black text-[#17130f] shadow-[5px_5px_0_rgba(23,19,15,0.9)] [font-family:var(--font-caveat),cursive] ${className}`}
    >
      {children}
    </span>
  );
}

export function MyStory() {
  return (
    <section
      id="my-story"
      className="relative isolate overflow-hidden bg-[oklch(89%_9%_76deg)] px-5 py-20 text-[#21170f] sm:px-8 md:py-28 lg:px-10"
      aria-labelledby="my-story-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(35,27,20,0.075)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden text-[#d08b19]"
        aria-hidden="true"
      >
        <span className="absolute left-[5%] top-20 rotate-[-12deg] text-6xl leading-none [font-family:var(--font-caveat),cursive]">
          〰
        </span>
        <span className="absolute right-[9%] top-24 rotate-12 text-6xl leading-none [font-family:var(--font-caveat),cursive]">
          ✦
        </span>
        <span className="absolute bottom-20 left-[8%] rotate-[10deg] text-5xl leading-none text-[#21170f]/45 [font-family:var(--font-caveat),cursive]">
          ♡
        </span>
        <span className="absolute bottom-32 right-[7%] rotate-[-8deg] text-7xl leading-none text-[#21170f]/40 [font-family:var(--font-caveat),cursive]">
          〰
        </span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="text-3xl italic text-[#7b4d2a] [font-family:var(--font-libertinus),serif]">
            Chapter 1
          </p>
          <h2
            id="my-story-title"
            className="mt-4 text-6xl font-black uppercase leading-[0.9] tracking-normal text-[#17130f] [font-family:var(--font-caveat),cursive] sm:text-7xl lg:text-8xl"
          >
            Hi, I&apos;m Aarik.
          </h2>
          <Scribble className="mt-5 h-10 w-72 text-[#d49b22]" />

          <div
            className="relative mt-10 bg-[#fff6e8] px-7 py-8 text-xl font-semibold leading-9 text-[#302215] shadow-[16px_16px_0_rgba(23,19,15,0.16)] [clip-path:polygon(4%_0,100%_4%,96%_96%,74%_100%,28%_97%,0_100%,2%_20%)] [font-family:var(--font-libertinus),serif] sm:px-9 sm:text-2xl sm:leading-10"
          >
            <p>
              Once upon a time, a very tiny lion entered the world. That lion
              was me.
            </p>

            <p className="mt-6">
              I arrived earlier than expected and smaller than most people
              imagined. My first little adventures happened inside the NICU,
              surrounded by warm hands, bright lights, sleepy prayers, and
              people whispering my name with hope in their hearts.
            </p>

            <p className="mt-6">
              Mumma watched me with brave eyes. Papa learned that love can make
              someone both terrified and fearless at the same time. Somewhere
              between tiny socks, feeding schedules, and midnight alarms, our
              family became even stronger.
            </p>

            <p className="mt-6">
              Everyone says I fought like a little lion. I think they might be
              right.
            </p>

            <p className="mt-6">
              One day, when I&apos;m older, I&apos;ll come back here and see how
              deeply I was loved before I could even speak.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl">
          <StoryBadge className="-left-2 top-7 rotate-[-10deg] bg-[#d49b22]">
            NICU graduate ✨
          </StoryBadge>
          <StoryBadge className="right-2 top-0 rotate-12 bg-[#e45757] text-white">
            Tiny but legendary
          </StoryBadge>

          <div
            className="relative bg-[#17130f] p-5 shadow-[24px_24px_0_rgba(23,19,15,0.18)] [clip-path:polygon(4%_0,100%_4%,96%_96%,72%_100%,28%_96%,0_100%,2%_18%)] sm:p-6"
          >
            <Image
              src="/astro.png"
              alt="Aarik astronaut NICU artwork"
              width={1160}
              height={1355}
              className="w-full"
              sizes="(max-width: 1024px) 90vw, 44vw"
            />

            <div
              className="mt-6 bg-[#f7e9d2] p-7 text-[#17130f] shadow-[8px_8px_0_#d49b22] [clip-path:polygon(3%_0,100%_7%,95%_100%,0_92%)]"
            >
              <p className="text-4xl font-black italic leading-tight [font-family:var(--font-libertinus),serif]">
                Tiny paws. Brave heart. A little lion learning how to roar.
                <span className="text-[#d49b22]"> ♥</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
