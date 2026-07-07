import Link from "next/link";
import MobileMenu from "./mobile-menu";

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/quality", label: "Quality" },
  { href: "/export", label: "Export" },
  { href: "/contact", label: "Contact" },
];

export function DotsMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5.5" r="4" />
      <circle cx="12" cy="18.5" r="4" />
      <circle cx="5.5" cy="12" r="4" />
      <circle cx="18.5" cy="12" r="4" />
    </svg>
  );
}

export function LogoMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="5.5" r="4" fill="#007A3E" />
      <circle cx="12" cy="18.5" r="4" fill="#007A3E" />
      <circle cx="5.5" cy="12" r="4" fill="#007A3E" />
      <circle cx="18.5" cy="12" r="4" fill="#007A3E" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3" />
    </svg>
  );
}

export function CheckItem({ children, iconClass = "text-nbigreen" }: { children: React.ReactNode; iconClass?: string }) {
  return (
    <li className="flex items-center gap-3">
      <svg
        className={`w-5 h-5 shrink-0 ${iconClass}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      {children}
    </li>
  );
}

/** Dark page header band for subpages */
export function PageHero({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden bg-nbidark text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-nbigreen/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-nbired/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 pt-36 pb-16 md:pt-44 md:pb-20">
        <p className="font-serif italic text-lg" style={{ color: "#FF5A4C" }}>
          {kicker}
        </p>
        <h1 className="mt-2 font-extrabold tracking-tight text-4xl sm:text-5xl leading-[1.05]">{title}</h1>
        {sub && <p className="mt-5 font-serif text-lg md:text-xl text-nbicream/90 max-w-2xl leading-relaxed">{sub}</p>}
      </div>
      <svg
        className="block w-full text-[#FBFAF7]"
        viewBox="0 0 1440 64"
        fill="currentColor"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 32C240 64 480 0 720 16s480 48 720 16v32H0Z" />
      </svg>
    </section>
  );
}

export function SiteNav() {
  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <nav
        className="relative mx-auto max-w-6xl rounded-2xl bg-white/85 backdrop-blur-md border border-gray-200 shadow-sm px-5 py-3 flex items-center justify-between gap-3"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3 cursor-pointer" aria-label="NBI home">
          <LogoMark className="w-8 h-8" />
          <span className="leading-none">
            <span className="block font-extrabold tracking-tight text-lg text-nbidark">NBI</span>
            <span className="block text-[10px] tracking-[0.18em] uppercase text-nbisand">Since 1987</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-nbidark/80">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-nbired transition-colors duration-200 cursor-pointer">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto md:ml-0">
          <Link
            href="/contact"
            className="press hidden md:inline-flex items-center gap-2 rounded-xl bg-nbired px-4 py-2.5 text-sm font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbired focus-visible:ring-offset-2"
          >
            Request a Quote
            <ArrowIcon />
          </Link>
          <MobileMenu links={navLinks} />
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-nbidark text-nbicream/80">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <LogoMark className="w-8 h-8" />
            <div className="leading-tight">
              <p className="font-extrabold text-white">NBI (PVT) LTD</p>
              <p className="text-xs">New Badriya Industries · Since 1987</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-semibold" aria-label="Footer">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors duration-200 cursor-pointer">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-nbicream/60">
          <p>© 2026 New Badriya Industries (PVT) LTD. All rights reserved.</p>
          <p>Founded by Salahudeen Abdul Hameed · Negama, Anuradhapura District, Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
