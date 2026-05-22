const navItems = ["Home", "My Story", "Milestones", "Gallery"];

const navLinks: Record<string, string> = {
  Home: "/",
  "My Story": "/my-story",
  Milestones: "#",
  Gallery: "#",
};

export function Navbar() {
  return (
    <header className="relative z-50 bg-[oklch(24%_3%_88deg)] shadow-[0_4px_20px_rgba(35,25,18,0.22)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        <a href="/" className="leading-none" aria-label="Aarik Garg home">
          <span className="block -rotate-6 text-xl text-[#f1b71c] [font-family:var(--font-caveat),cursive] sm:text-2xl">
            ♕
          </span>
          <span className="block text-2xl font-bold tracking-wide text-white [font-family:var(--font-caveat),cursive] sm:text-3xl">
            AARIK GARG
          </span>
          <span className="mt-0.5 block text-xs font-black uppercase tracking-[0.12em] text-[#f1b71c] [font-family:var(--font-caveat),cursive] sm:text-sm">
            My Little Journey
          </span>
        </a>

        <div className="hidden items-center gap-9 text-base text-white/90 md:flex">
          {navItems.map((item) => (
            <a
              href={navLinks[item]}
              key={item}
              className="inline-flex items-center gap-2 font-medium transition hover:text-[#f3bc25] [font-family:var(--font-libertinus),serif]"
            >
              {item === "Home" ? (
                <span className="text-lg leading-none text-[#f3bc25]">✭</span>
              ) : null}
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="/#wishes"
            className="relative inline-flex h-12 min-w-32 items-center justify-center px-7 text-base font-bold text-[#21170f] transition hover:-translate-y-0.5 [font-family:var(--font-caveat),cursive]"
          >
            <svg
              className="absolute inset-0 -z-10 size-full text-[#e3a83b]"
              viewBox="0 0 176 76"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M9.6 50.9C2.5 37.6 7 17.2 23.1 9.7 37.4 3 59.8 4.2 76.5 3.3c22.2-1.2 46.8-3 64.5 4.8 14 6.2 18.8 16.8 21.5 27.1 10.1 1.6 13.2 11.7 8 20.8-6.6 11.6-23.7 12.5-38.2 11.6-18.9-1.1-35.1 3.1-53.4 4.8-18.4 1.7-38.1.1-52.2-3.1C18.9 67.5 13.8 58.8 9.6 50.9Z"
              />
            </svg>
            <span className="relative z-10">
              Wishes <span className="ml-2 text-[#c9171f]">♡</span>
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
