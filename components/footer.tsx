import {
  ArrowRight,
  ArrowUp,
  AtSign,
  Heart,
  Mail,
  MailOpen,
  UserCircle,
} from "lucide-react";

function OpenEnvelopeIcon() {
  return (
    <div className="relative">
      <MailOpen
        className="stroke-[1.8] text-[#21170f] max-sm:h-16 max-sm:w-20 h-20 w-24 md:h-24 md:w-28"
        aria-hidden="true"
      />
      <Heart
        className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/4 stroke-[2.2] text-[#21170f]"
        aria-hidden="true"
      />
    </div>
  );
}

function BlobButton({
  children,
  className = "",
  href = "#",
  onClick,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}>) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative inline-flex h-16 items-center justify-center px-9 text-base font-black uppercase text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 [font-family:var(--font-caveat),cursive] ${className}`}
    >
      <svg
        className="absolute inset-0 -z-10 size-full text-[oklch(24%_3%_88deg)]"
        viewBox="0 0 230 86"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M18 44C16 24 30 7 56 4 80 1 102 10 124 8 150 5 174 1 198 11 216 19 226 36 222 54 218 71 204 81 180 83 154 85 128 77 106 80 82 83 56 87 34 79 20 66 18 44Z"
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[oklch(89%_9%_76deg)] text-[#21170f]">
      <div className="relative bg-[oklch(24%_3%_88deg)] pb-14 pt-6">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden text-[#d08b19]"
          aria-hidden="true"
        >
          <span className="absolute left-[4%] top-8 rotate-[-12deg] leading-none opacity-80 [font-family:var(--font-caveat),cursive] max-sm:text-4xl text-6xl">
            ♡
          </span>
          <span className="absolute right-[6%] top-5 rotate-12 leading-none opacity-80 [font-family:var(--font-caveat),cursive] max-sm:text-4xl text-6xl">
            ♡♡
          </span>
          <span className="absolute left-[18%] bottom-4 rotate-[6deg] leading-none opacity-55 [font-family:var(--font-caveat),cursive] max-sm:text-3xl text-5xl">
            〰
          </span>
          <span className="absolute right-[19%] bottom-10 rotate-[-14deg] leading-none [font-family:var(--font-caveat),cursive] max-sm:text-2xl text-4xl">
            ♕
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="relative mx-auto px-8 py-12 md:px-20 md:py-14">
            <svg
              className="absolute inset-0 -z-10 size-full text-[oklch(92%_7%_74deg)] drop-shadow-[0_10px_16px_rgba(0,0,0,0.14)]"
              viewBox="0 0 980 200"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M60 100C55 60 78 18 140 10 210 2 290 20 370 14 455 8 525 2 605 10 690 18 768 8 845 16 910 22 962 55 968 100 974 145 944 172 878 180 798 188 718 174 638 180 556 186 472 178 390 184 306 190 222 178 144 172 82 164 64 140 60 100Z"
              />
            </svg>

            <div className="grid items-center gap-4 text-center md:grid-cols-[auto_1fr_auto] md:text-left">
              <div className="mx-auto md:mx-0">
                <MailOpen className="stroke-[1.8] text-[#21170f] h-12 w-14 md:h-14 md:w-16" aria-hidden="true" />
              </div>
              <p className="text-2xl font-bold leading-tight [font-family:var(--font-caveat),cursive] sm:text-3xl md:text-4xl">
                Leave your wishes for me <span className="text-[#d08b19]">♡</span>
              </p>
              <BlobButton href="/send-wish" className="mx-auto h-14 px-5 max-sm:rotate-0 sm:px-7 rotate-[2deg] md:mx-0">
                <span className="inline-flex items-center gap-2">
                  Send your wish <ArrowRight className="h-4 w-4" />
                </span>
              </BlobButton>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-5 pb-6 pt-8">
        <svg
          className="pointer-events-none absolute inset-x-0 -top-16 h-20 w-full text-[oklch(89%_9%_76deg)]"
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0 86C58 100 94 132 157 113C226 92 248 62 319 80C389 98 411 126 488 112C560 99 588 55 665 67C748 80 777 121 860 108C939 95 966 55 1047 69C1133 84 1168 127 1249 112C1323 98 1364 64 1440 78V150H0Z"
          />
        </svg>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-5 text-center md:flex-row md:justify-between">
          <div className="flex gap-5">
            <a href="#" aria-label="Instagram" className="hover:text-[#c88716]">
              <AtSign className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#c88716]">
              <UserCircle className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Email" className="hover:text-[#c88716]">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-sm leading-7 [font-family:var(--font-libertinus),serif]">
            <p>
              Made with love for AARIK GARG{" "}
              <span className="text-[#9d6a13]">♥</span>
            </p>
            <p>© 2025 Aarik&apos;s Journey. All rights reserved.</p>
          </div>

          <a
            href="#"
            aria-label="Back to top"
            className="relative grid size-12 place-items-center text-xl font-black text-[#21170f] transition hover:-translate-y-0.5"
          >
            <svg
              className="absolute inset-0 -z-10 size-full text-[#e3a83b]"
              viewBox="0 0 60 60"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M8 32C4 18 15 6 31 7c15 1 24 11 22 25-2 14-13 22-28 20C14 51 10 42 8 32Z"
              />
            </svg>
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
