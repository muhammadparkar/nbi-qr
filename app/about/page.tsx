import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, CheckItem, PageHero } from "../ui";
import heroRange from "@/public/products/hero-range.jpeg";

export const metadata: Metadata = {
  title: "About Us | NBI (PVT) LTD — New Badriya Industries",
  description:
    "New Badriya Industries (NBI) — premium Sri Lankan spice manufacturer and exporter, established in 1987 by Abdul Hameed Salahudeen in Negama, Anuradhapura District.",
};

const values = [
  "Quality First",
  "Customer Satisfaction",
  "Integrity & Trust",
  "Innovation",
  "Sustainability",
  "Food Safety",
  "Continuous Improvement",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Nearly four decades of spice heritage"
        title="About Us"
        sub="New Badriya Industries — premium Sri Lankan spice manufacturer & exporter, established 1987."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-serif text-lg leading-relaxed text-nbicocoa">
              New Badriya Industries (NBI) is a leading Sri Lankan manufacturer and exporter of premium spices,
              established in 1987 by <strong className="font-semibold text-nbidark">Abdul Hameed Salahudeen</strong> in
              Negama, Anuradhapura District, Sri Lanka.
            </p>
            <p className="mt-5 font-serif text-lg leading-relaxed text-nbicocoa">
              For nearly four decades, NBI has been dedicated to producing authentic Sri Lankan spices renowned for
              their exceptional quality, freshness, and rich natural flavor. Using carefully selected raw materials and
              hygienic manufacturing processes, we consistently deliver products that meet the highest expectations of
              both local and international markets.
            </p>
            <p className="mt-5 font-serif text-lg leading-relaxed text-nbicocoa">
              Driven by a commitment to quality, integrity, and customer satisfaction, NBI has become a trusted partner
              for importers, distributors, supermarkets, hotels, restaurants, wholesalers, and food service providers
              worldwide.
            </p>
            <Link
              href="/products"
              className="press mt-8 inline-flex items-center gap-2 rounded-full bg-nbired px-7 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbired focus-visible:ring-offset-2"
            >
              See Our Products
              <ArrowIcon />
            </Link>
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <Image
                src={heroRange}
                alt="NBI premium spice range"
                className="w-full h-auto"
                placeholder="blur"
                priority
              />
            </div>
            <div className="rounded-3xl bg-nbidark text-white p-8">
              <h2 className="text-xl font-extrabold tracking-tight">Our Core Values</h2>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {values.map((v) => (
                  <CheckItem key={v}>{v}</CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
