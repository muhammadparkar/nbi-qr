import Image from "next/image";
import Animations from "./animations";
import ContactForm from "./contact-form";
import MobileMenu from "./mobile-menu";
import heroRange from "@/public/products/hero-range.jpeg";
import spiceRange from "@/public/products/spice-range.jpeg";
import ceylonPack from "@/public/products/ceylon-mixture-pack.jpeg";
import ceylonPouches from "@/public/products/ceylon-pouches.jpeg";
import ceylonShelf from "@/public/products/ceylon-shelf.jpeg";

function DotsMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5.5" r="4" />
      <circle cx="12" cy="18.5" r="4" />
      <circle cx="5.5" cy="12" r="4" />
      <circle cx="18.5" cy="12" r="4" />
    </svg>
  );
}

function LogoMark({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="5.5" r="4" fill="#007A3E" />
      <circle cx="12" cy="18.5" r="4" fill="#007A3E" />
      <circle cx="5.5" cy="12" r="4" fill="#007A3E" />
      <circle cx="18.5" cy="12" r="4" fill="#007A3E" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function CheckItem({ children, iconClass = "text-nbigreen" }: { children: React.ReactNode; iconClass?: string }) {
  return (
    <li className="flex items-center gap-3">
      <svg className={`w-5 h-5 shrink-0 ${iconClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      {children}
    </li>
  );
}

const marqueeItems = [
  "Curry Powder",
  "Roasted Chilli",
  "Ceylon Cinnamon",
  "Black Pepper",
  "Turmeric",
  "Garam Masala",
  "Ceylon Mixture",
  "Since 1987",
];

const productCategories = [
  {
    name: "Curry & Chili",
    accent: "red",
    note: "Deep roast, slow island burn.",
    items: ["Curry Powder", "Roasted Curry Powder", "Chili Powder", "Fish Curry Mix"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
    ),
  },
  {
    name: "Pure Powders",
    accent: "green",
    note: "One origin. Nothing else added.",
    items: ["Black & White Pepper", "Turmeric Powder", "Coriander · Cumin", "Fennel Powder"],
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
        <circle cx="12" cy="12" r="3.5" />
      </>
    ),
  },
  {
    name: "Masala Blends",
    accent: "red",
    note: "Blended like a family recipe.",
    items: ["Mixed & Garam Masala", "Meat Masala", "Chicken Masala", "Custom Spice Blends"],
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    ),
  },
  {
    name: "Signature Ceylon",
    accent: "green",
    note: "The name Ceylon earned.",
    items: ["Ceylon Cinnamon", "Ceylon Tea", "Customized Packaging", "Private Label Options"],
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 0 0 8.25-8.25c0-4.556-3.694-8.25-8.25-11.25C7.444 4.5 3.75 8.194 3.75 12.75A8.25 8.25 0 0 0 12 21Z" />
        <path strokeLinecap="round" d="M12 21V9" />
      </>
    ),
  },
];

const journeySteps = [
  {
    n: "01",
    title: "Sourced",
    body: "Hand-picked harvests from trusted farmers across the Anuradhapura District — selected, not just collected.",
  },
  {
    n: "02",
    title: "Dried & Roasted",
    body: "Traditional sun-drying meets controlled roasting profiles — the deep color you see is earned, not dyed.",
  },
  {
    n: "03",
    title: "Milled Fresh",
    body: "Ground in small batches under strict hygiene control, so the aroma goes into the pack — not into the air.",
  },
  {
    n: "04",
    title: "Sealed & Shipped",
    body: "Export-grade packing with bilingual labelling — from Negama's gates to Gulf shelves, flavor intact.",
  },
];

const coreValues = [
  "Quality First",
  "Customer Satisfaction",
  "Integrity & Trust",
  "Innovation",
  "Sustainability",
  "Food Safety",
  "Continuous Improvement",
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#quality", label: "Quality" },
  { href: "#export", label: "Export" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <Animations />

      {/* ============ NAVBAR ============ */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <nav
          className="relative mx-auto max-w-6xl rounded-2xl bg-white/85 backdrop-blur-md border border-gray-200 shadow-sm px-5 py-3 flex items-center justify-between gap-3"
          aria-label="Main navigation"
        >
          <a href="#top" className="flex items-center gap-3 cursor-pointer" aria-label="NBI home">
            <LogoMark className="w-8 h-8" />
            <span className="leading-none">
              <span className="block font-extrabold tracking-tight text-lg text-nbidark">NBI</span>
              <span className="block text-[10px] tracking-[0.18em] uppercase text-nbisand">Since 1987</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-nbidark/80">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-nbired transition-colors duration-200 cursor-pointer">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            <a
              href="#contact"
              className="press hidden md:inline-flex items-center gap-2 rounded-xl bg-nbired px-4 py-2.5 text-sm font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbired focus-visible:ring-offset-2"
            >
              Request a Quote
              <ArrowIcon />
            </a>
            <MobileMenu links={navLinks} />
          </div>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section id="top" className="relative overflow-hidden bg-nbidark text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="hero-blob absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-nbigreen/25 blur-3xl" />
          <div className="hero-blob absolute -bottom-40 -left-24 w-[28rem] h-[28rem] rounded-full bg-nbired/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pt-32 pb-16 sm:pt-36 md:pt-48 md:pb-32">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <p className="hero-item inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-nbicream">
                <DotsMark className="w-3.5 h-3.5" />
                Est. 1987 · Negama, Anuradhapura, Sri Lanka
              </p>
              <h1 className="hero-item mt-6 font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                The Island&apos;s Flavor,
                <br />
                <span className="font-serif italic font-medium" style={{ color: "#FF5A4C" }}>
                  Ground at the Source.
                </span>
              </h1>
              <p className="hero-item mt-6 font-serif text-lg md:text-xl text-nbicream/90 max-w-xl leading-relaxed">
                Since 1987, New Badriya Industries has milled Sri Lanka&apos;s boldest harvests in Negama, Anuradhapura — and
                sealed that aroma into every pack that leaves our gates. If it doesn&apos;t smell like the island, it
                doesn&apos;t ship.
              </p>
              <div className="hero-item mt-9 flex flex-wrap gap-4">
                <a
                  href="#products"
                  className="press inline-flex items-center gap-2 rounded-xl bg-nbired px-6 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore Our Spices
                  <ArrowIcon />
                </a>
                <a
                  href="#export"
                  className="press inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 font-bold text-white hover:bg-white/15 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Export Partnerships
                </a>
              </div>
              <dl className="hero-item mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <dt className="stat text-3xl font-extrabold" data-count="35" data-suffix="+">
                    35+
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-nbicream/70">Years of craft</dd>
                </div>
                <div>
                  <dt className="stat text-3xl font-extrabold" data-count="17" data-suffix="+">
                    17+
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-nbicream/70">Product lines</dd>
                </div>
                <div>
                  <dt className="stat text-3xl font-extrabold" data-count="100" data-suffix="%">
                    100%
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-nbicream/70">Sri Lankan sourced</dd>
                </div>
              </dl>
            </div>
            <div className="md:col-span-5">
              <div className="hero-badge relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <Image
                  src={heroRange}
                  alt="NBI spice range — cumin, curry, turmeric, chilli, black pepper, coriander and Kashmiri chilli powder packs"
                  className="w-full h-auto object-cover"
                  placeholder="blur"
                  priority
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-nbidark/80 backdrop-blur px-3 py-1.5 text-xs font-bold tracking-wide text-nbicream">
                  The NBI Spice Range
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* wave divider */}
        <svg className="block w-full text-[#FBFAF7]" viewBox="0 0 1440 64" fill="currentColor" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 32C240 64 480 0 720 16s480 48 720 16v32H0Z" />
        </svg>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="bg-nbired text-white overflow-hidden py-3 select-none" aria-hidden="true">
        <div id="marquee" className="flex w-max whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-8 pr-8 text-sm font-extrabold uppercase tracking-[0.2em]">
              {marqueeItems.map((item) => (
                <span key={item} className="flex items-center gap-8">
                  {item}
                  <DotsMark className="w-3 h-3 shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ ABOUT ============ */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="reveal">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Our Story</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Three decades of spice heritage</h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-nbicocoa">
              Founded in 1987 by visionary entrepreneur <strong className="font-semibold text-nbidark">A.H. Salahudeen</strong>,
              New Badriya Industries has grown from the heart of Negama, Anuradhapura District into a trusted name in Sri
              Lankan spice manufacturing.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
              We combine carefully selected raw materials with modern processing techniques — earning the trust of
              wholesalers, retailers, distributors, and international buyers alike.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-nbicream/60 border border-nbigreen/15 p-5">
                <h3 className="font-extrabold text-nbigreen">Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-nbidark/80">
                  Sri Lanka&apos;s leading spice manufacturer and a globally recognized exporter of premium Ceylon spices.
                </p>
              </div>
              <div className="rounded-2xl bg-nbicream/60 border border-nbigreen/15 p-5">
                <h3 className="font-extrabold text-nbigreen">Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-nbidark/80">
                  Safe, hygienic, premium-quality spices that exceed expectations — bringing authentic Sri Lankan flavor to
                  the world.
                </p>
              </div>
            </div>
          </div>
          <div className="reveal">
            <div className="rounded-3xl bg-nbidark text-white p-8 md:p-10">
              <h3 className="text-xl font-extrabold tracking-tight">Our Core Values</h3>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {coreValues.map((v) => (
                  <CheckItem key={v}>{v}</CheckItem>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl bg-white/10 border border-white/15 p-5">
                <p className="font-serif italic text-nbicream leading-relaxed">
                  &ldquo;Our dedication to quality, consistency, and customer satisfaction has made us a trusted name for over
                  three decades.&rdquo;
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-nbicream/70">— New Badriya Industries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS ============ */}
      <section id="products" className="texture-dots bg-nbicream/40 border-y border-nbigreen/10">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-2xl reveal">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Our Products</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Premium Ceylon spice range</h2>
            <p className="mt-5 font-serif text-lg leading-relaxed text-nbicocoa">
              From single-origin powders to signature masala blends — every product carries the authentic flavor of Sri
              Lanka.
            </p>
          </div>

          <figure className="reveal mt-12 rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">
            <Image
              src={spiceRange}
              alt="Seven NBI 200g spice packs: Cumin, Curry, Turmeric, Chilli, Black Pepper, Coriander and Kashmiri Chilli powders"
              className="w-full h-auto"
              placeholder="blur"
            />
            <figcaption className="px-6 py-4 text-sm font-semibold text-nbicocoa/80 border-t border-gray-100">
              The NBI 200g retail range — seven signature powders in export-grade packaging.
            </figcaption>
          </figure>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {productCategories.map((cat) => (
              <div
                key={cat.name}
                className={`reveal group rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  cat.accent === "red" ? "hover:border-nbired/40" : "hover:border-nbigreen/50"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    cat.accent === "red" ? "bg-nbired/10" : "bg-nbigreen/10"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${cat.accent === "red" ? "text-nbired" : "text-nbigreen"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </svg>
                </div>
                <h3 className="mt-4 font-extrabold text-lg">{cat.name}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-nbicocoa/90">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 pt-3 border-t border-gray-100 font-serif italic text-sm text-nbisand">{cat.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 reveal">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-bold text-nbired hover:text-[#b82217] transition-colors duration-200 cursor-pointer"
            >
              Request full product catalogue
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ============ FEATURED: CEYLON MIXTURE ============ */}
      <section id="featured" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal order-2 md:order-1 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm col-span-2">
              <Image
                src={ceylonPack}
                alt="NBI Ceylon Mixture 200g pack, front and back with bilingual English and Arabic labelling"
                className="w-full h-auto"
                placeholder="blur"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={ceylonPouches}
                alt="NBI Ceylon Mixture 100g kraft pouches with window showing the snack mix"
                className="w-full h-full object-cover"
                placeholder="blur"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={ceylonShelf}
                alt="NBI Ceylon Mixture kraft pouches in 100g and 200g sizes lined up on a shelf"
                className="w-full h-full object-cover"
                placeholder="blur"
              />
            </div>
          </div>
          <div className="reveal order-1 md:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbired">Featured Product</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Ceylon Mixture</h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-nbicocoa">
              Our signature Sri Lankan snack mix — crunchy murukku, peanuts, roasted garam and curry leaves, seasoned with
              NBI chilli. Packed in resealable kraft pouches with bilingual English–Arabic labelling for Middle East retail.
            </p>
            <ul className="mt-8 space-y-3 text-sm font-semibold text-nbidark">
              <CheckItem>100g &amp; 200g retail sizes</CheckItem>
              <CheckItem>Bilingual labelling with full nutrition facts</CheckItem>
              <CheckItem>Distributed in Qatar via ARCO Trading &amp; Marketing Co WLL, Doha</CheckItem>
            </ul>
            <a
              href="#contact"
              className="press mt-9 inline-flex items-center gap-2 rounded-xl bg-nbired px-6 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbired focus-visible:ring-offset-2"
            >
              Order Ceylon Mixture
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ============ FARM TO POUCH ============ */}
      <section id="journey" className="relative bg-nbicream/40 texture-dots border-y border-nbigreen/10 overflow-hidden">
        <p
          className="pointer-events-none select-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-extrabold tracking-tight text-[9rem] md:text-[13rem] leading-none text-nbigreen/5"
          aria-hidden="true"
        >
          SINCE 1987
        </p>
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-2xl reveal">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">From Farm to Pack</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Four steps. Zero shortcuts.</h2>
            <p className="mt-5 font-serif text-lg leading-relaxed text-nbicocoa">
              Most spice loses its soul between harvest and shelf. Ours doesn&apos;t get the chance.
            </p>
          </div>
          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {journeySteps.map((step) => (
              <li key={step.n} className="reveal relative rounded-2xl bg-white border border-gray-200 p-6">
                <span className="text-5xl font-extrabold text-nbired/15" aria-hidden="true">
                  {step.n}
                </span>
                <h3 className="mt-2 font-extrabold text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-nbicocoa/90">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ QUALITY / WHY NBI ============ */}
      <section id="quality" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 reveal">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Quality Assurance</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              Quality is the foundation of everything we do
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-nbicocoa">
              Every product undergoes strict quality control for freshness, purity, hygiene, and consistent flavor.
              Ingredients are sourced from trusted Sri Lankan farmers and processed under hygienic, export-grade conditions.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-nbigreen/10 border border-nbigreen/20 p-5">
              <svg className="w-10 h-10 text-nbigreen shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <p className="text-sm font-semibold text-nbidark">
                Farm-to-pack traceability with strict in-house quality control at every stage.
              </p>
            </div>
          </div>
          <div className="md:col-span-7 reveal">
            <h3 className="sr-only">Why choose NBI</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow duration-200">
                <p className="text-2xl font-extrabold text-nbired">1987</p>
                <p className="mt-1 font-bold">Established heritage</p>
                <p className="mt-1.5 text-sm text-nbicocoa/90">35+ years of proven spice manufacturing experience.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow duration-200">
                <p className="text-2xl font-extrabold text-nbired">100%</p>
                <p className="mt-1 font-bold">Authentic &amp; premium</p>
                <p className="mt-1.5 text-sm text-nbicocoa/90">
                  Genuine Sri Lankan spices, premium quality at competitive pricing.
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow duration-200">
                <svg className="w-7 h-7 text-nbigreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <p className="mt-2 font-bold">Reliable supply chain</p>
                <p className="mt-1.5 text-sm text-nbicocoa/90">Export-oriented manufacturing with dependable delivery.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow duration-200">
                <svg className="w-7 h-7 text-nbigreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z" />
                </svg>
                <p className="mt-2 font-bold">Customized solutions</p>
                <p className="mt-1.5 text-sm text-nbicocoa/90">Custom blends, packaging formats, and private-label service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ EXPORT ============ */}
      <section id="export" className="bg-nbidark text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#7BC9A0" }}>
                Export Markets
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Bringing Ceylon flavor to the world</h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-nbicream/90">
                NBI supplies premium Sri Lankan spices to international markets — with a strong focus on the Middle East,
                including <strong className="font-semibold text-white">Qatar</strong>, and growing reach across global
                destinations.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                <CheckItem iconClass="text-[#7BC9A0]">Export-grade processing &amp; packaging</CheckItem>
                <CheckItem iconClass="text-[#7BC9A0]">Wholesale, retail &amp; distributor partnerships</CheckItem>
                <CheckItem iconClass="text-[#7BC9A0]">Customized packaging for target markets</CheckItem>
              </ul>
              <a
                href="#contact"
                className="press mt-9 inline-flex items-center gap-2 rounded-xl bg-nbired px-6 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Become a Distribution Partner
                <ArrowIcon />
              </a>
            </div>
            <div className="reveal" aria-hidden="true">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
                <svg viewBox="0 0 400 240" className="w-full h-auto">
                  <defs>
                    <radialGradient id="glow" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#007A3E" stopOpacity=".45" />
                      <stop offset="100%" stopColor="#007A3E" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="240" rx="16" fill="url(#glow)" />
                  <path d="M80 170 Q 160 60 250 96" fill="none" stroke="#D9291C" strokeWidth="2.5" strokeDasharray="6 6" />
                  <path d="M80 170 Q 200 220 330 120" fill="none" stroke="#DEEEDE" strokeWidth="2" strokeDasharray="5 7" opacity=".7" />
                  <path d="M80 170 Q 140 130 200 40" fill="none" stroke="#7BC9A0" strokeWidth="2" strokeDasharray="5 7" opacity=".8" />
                  <circle cx="80" cy="170" r="10" fill="#D9291C" />
                  <circle cx="80" cy="170" r="16" fill="none" stroke="#D9291C" strokeWidth="2" opacity=".5" />
                  <circle cx="250" cy="96" r="7" fill="#DEEEDE" />
                  <circle cx="330" cy="120" r="7" fill="#DEEEDE" />
                  <circle cx="200" cy="40" r="7" fill="#DEEEDE" />
                  <text x="80" y="204" textAnchor="middle" fontWeight="700" fontSize="13" fill="#DEEEDE">
                    Sri Lanka
                  </text>
                  <text x="250" y="80" textAnchor="middle" fontSize="12" fill="#DEEEDE" opacity=".85">
                    Qatar
                  </text>
                  <text x="330" y="104" textAnchor="middle" fontSize="12" fill="#DEEEDE" opacity=".85">
                    Middle East
                  </text>
                  <text x="200" y="26" textAnchor="middle" fontSize="12" fill="#DEEEDE" opacity=".85">
                    Global
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT / CTA ============ */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="rounded-3xl bg-nbired text-white overflow-hidden relative">
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="relative grid md:grid-cols-2 gap-10 p-8 md:p-14 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Let&apos;s trade in authentic flavor.</h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-white/90">
                Wholesale orders, export inquiries, or custom spice blends — our team responds promptly.
              </p>
              <address className="mt-8 not-italic space-y-3 text-sm font-semibold">
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  NBI (PVT) LTD, Negama, Anuradhapura District, Sri Lanka
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <a
                    href="mailto:info@nbispices.lk"
                    className="underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors duration-200 cursor-pointer"
                  >
                    info@nbispices.lk
                  </a>
                </p>
              </address>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
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
                <a key={l.href} href={l.href} className="hover:text-white transition-colors duration-200 cursor-pointer">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-nbicream/60">
            <p>© 2026 New Badriya Industries (PVT) LTD. All rights reserved.</p>
            <p>Founded by A.H. Salahudeen · Negama, Anuradhapura District, Sri Lanka</p>
            <p>
              Designed and developed by{" "}
              <a
                href="https://qadmastechnologies.com/"
                target="_blank"
                rel="noopener"
                className="font-semibold text-nbicream/80 hover:text-white underline decoration-nbicream/30 underline-offset-2 hover:decoration-white transition-colors duration-200 cursor-pointer"
              >
                Qadmas Technologies
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
