import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, PageHero } from "../ui";
import spiceRange from "@/public/products/spice-range.jpeg";

export const metadata: Metadata = {
  title: "Quality | NBI (PVT) LTD — New Badriya Industries",
  description:
    "At NBI, quality is at the heart of everything we do — premium quality, rich aroma, authentic natural taste, food safety and maximum freshness in every pack.",
};

const promises = [
  { title: "Premium Quality", body: "Carefully selected ingredients in every batch." },
  { title: "Rich Aroma", body: "Milled fresh so the fragrance stays in the pack." },
  { title: "Authentic Natural Taste", body: "The real flavor of Sri Lankan spice — nothing artificial." },
  { title: "Food Safety", body: "Strict hygienic processing at every stage." },
  { title: "Consistent Quality", body: "The same standard, order after order." },
  { title: "Maximum Freshness", body: "From mill to pack without delay." },
  { title: "Complete Customer Satisfaction", body: "Quality control that ends only when you're satisfied." },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        kicker="Quality is at the heart of everything we do"
        title="Quality"
        sub="Every product is manufactured using carefully selected ingredients and processed under strict hygienic conditions."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {promises.map((p, i) => (
            <div
              key={p.title}
              className={`rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow duration-200 ${
                i === promises.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <svg
                className="w-7 h-7 text-nbigreen"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              <h2 className="mt-3 font-extrabold text-lg">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-nbicocoa/90">{p.body}</p>
            </div>
          ))}
        </div>

        <figure className="mt-14 rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">
          <Image src={spiceRange} alt="NBI spice range in export-grade packaging" className="w-full h-auto" placeholder="blur" />
          <figcaption className="px-6 py-4 text-sm font-semibold text-nbicocoa/80 border-t border-gray-100">
            Our rigorous quality control procedures ensure that every pack delivers the authentic taste and aroma of Sri
            Lankan spices.
          </figcaption>
        </figure>

        <div className="mt-14 rounded-3xl bg-nbidark text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Taste the standard for yourself.</h2>
            <p className="mt-3 font-serif text-lg text-nbicream/90">Request samples or a full product specification sheet.</p>
          </div>
          <Link
            href="/contact"
            className="press shrink-0 inline-flex items-center gap-2 rounded-full bg-nbired px-7 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Contact Us
            <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
