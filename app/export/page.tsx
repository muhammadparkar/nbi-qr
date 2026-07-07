import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckItem, PageHero } from "../ui";

export const metadata: Metadata = {
  title: "Export | NBI (PVT) LTD — New Badriya Industries",
  description:
    "NBI exports premium Sri Lankan spices worldwide — serving importers, distributors, supermarkets, hotels and food service providers across the GCC, Middle East, Asia, Europe and Africa.",
};

const customers = [
  "Importers",
  "Distributors",
  "Supermarkets",
  "Hypermarkets",
  "Hotels",
  "Restaurants",
  "Catering Companies",
  "Food Service Providers",
];

const markets = ["GCC Countries", "Middle East", "Asia", "Europe", "Africa"];

export default function ExportPage() {
  return (
    <>
      <PageHero
        kicker="From Negama to the world"
        title="Export"
        sub="NBI proudly exports premium Sri Lankan spices to customers around the world."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <h2 className="text-xl font-extrabold tracking-tight">We Serve</h2>
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold text-nbidark">
              {customers.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">Target Markets</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {markets.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-nbigreen/25 bg-nbigreen/10 px-5 py-2.5 text-sm font-bold text-nbidark"
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="mt-8 font-serif text-lg leading-relaxed text-nbicocoa">
              With competitive pricing, flexible packaging options, and dependable logistics, NBI is committed to
              building long-term partnerships with customers across global markets.
            </p>
            <Link
              href="/contact"
              className="press mt-8 inline-flex items-center gap-2 rounded-full bg-nbired px-7 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbired focus-visible:ring-offset-2"
            >
              Become a Distribution Partner
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
