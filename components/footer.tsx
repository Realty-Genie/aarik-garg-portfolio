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
        className="h-20 w-24 stroke-[1.8] text-[#21170f] md:h-24 md:w-28"
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
          d="M15 57C6 41 10 18 31 10c18-7 43-2 64-4 32-3 53-7 77 2 17 6 24 18 27 30 14 2 19 14 12 25-9 14-33 14-53 13-27-1-48 4-75 5-30 1-52-1-68-24Z"
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
          <span className="absolute left-[4%] top-8 rotate-[-12deg] text-6xl leading-none opacity-80 [font-family:var(--font-caveat),cursive]">
            ♡
          </span>
          <span className="absolute right-[6%] top-5 rotate-12 text-6xl leading-none opacity-80 [font-family:var(--font-caveat),cursive]">
            ♡♡
          </span>
          <span className="absolute left-[18%] bottom-4 rotate-[6deg] text-5xl leading-none opacity-55 [font-family:var(--font-caveat),cursive]">
            〰
          </span>
          <span className="absolute right-[19%] bottom-10 rotate-[-14deg] text-4xl leading-none [font-family:var(--font-caveat),cursive]">
            ♕
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5">
          <div className="relative mx-auto px-5 py-8 md:px-12">
            <svg
              className="absolute inset-0 -z-10 size-full text-[oklch(92%_7%_74deg)] drop-shadow-[0_16px_22px_rgba(0,0,0,0.16)]"
              viewBox="0 0 980 170"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M23 113C-7 73 16 21 77 17c80-5 125 21 203 8 93-15 151-31 240-6 59 17 91 55 154 38 70-19 153-33 218 5 65 38 47 84-10 95-81 16-141-15-231-2-102 15-165 23-267 3-94-18-152-4-242 3-62 5-94-22-119-48Z"
              />
            </svg>

            <div className="grid items-center gap-6 text-center md:grid-cols-[auto_1fr_auto] md:text-left">
              <div className="mx-auto md:mx-0">
                <OpenEnvelopeIcon />
              </div>
              <p className="text-4xl font-bold leading-tight [font-family:var(--font-caveat),cursive] sm:text-5xl">
                Leave your wishes
                <br />
                for me <span className="text-[#d08b19]">♡</span>
              </p>
              <BlobButton href="#wishes" className="mx-auto h-20 px-12 rotate-[2deg] md:mx-0">
                <span className="inline-flex items-center gap-2">
                  Send your wish <ArrowRight className="h-5 w-5" />
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

          <div className="text-sm leading-7 [font-family:var(--font-inter),sans-serif]">
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
