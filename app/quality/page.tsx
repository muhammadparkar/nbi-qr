import type { Metadata } from "next";
import { PageHero } from "../ui";
import QualityClient from "./quality-client";

export const metadata: Metadata = {
  title: "Quality | NBI (PVT) LTD — New Badriya Industries",
  description:
    "At NBI, quality is at the heart of everything we do — premium quality, rich aroma, authentic natural taste, food safety and maximum freshness in every pack.",
};

export default function QualityPage() {
  return (
    <>
      <PageHero
        kicker="Quality is at the heart of everything we do"
        title="Quality"
        sub="Every product is manufactured using carefully selected ingredients and processed under strict hygienic conditions."
      />

      <QualityClient />
    </>
  );
}
