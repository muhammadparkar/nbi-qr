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

export function PhoneLink({ className = "" }: { className?: string }) {
  return (
    <a
      href="tel:+94772338350"
      className={`press inline-flex items-center gap-2 font-semibold text-nbidark/80 hover:text-nbired cursor-pointer ${className}`}
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372a1.5 1.5 0 0 0-1.106-1.447l-3.11-.9a1.5 1.5 0 0 0-1.6.44l-.86 1.05a11.25 11.25 0 0 1-5.94-5.94l1.05-.86a1.5 1.5 0 0 0 .44-1.6l-.9-3.11A1.5 1.5 0 0 0 5.622 3H4.25A2 2 0 0 0 2.25 5v1.75Z"
        />
      </svg>
      <span className="text-sm whitespace-nowrap">+94 77 233 8350</span>
    </a>
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
          <PhoneLink className="hidden lg:inline-flex mr-2" />
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
