import type { Metadata } from "next";
import { PageHero } from "../ui";
import ExportClient from "./export-client";

export const metadata: Metadata = {
  title: "Export | NBI (PVT) LTD — New Badriya Industries",
  description:
    "NBI exports premium Sri Lankan spices worldwide — serving importers, distributors, supermarkets, hotels and food service providers across the GCC, Middle East, Asia, Europe and Africa.",
};

export default function ExportPage() {
  return (
    <>
      <PageHero
        kicker="From Negama to the world"
        title="Export"
        sub="NBI proudly exports premium Sri Lankan spices to customers around the world."
      />

      <ExportClient />
    </>
  );
}
