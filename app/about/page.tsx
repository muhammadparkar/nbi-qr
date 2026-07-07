import type { Metadata } from "next";
import { PageHero } from "../ui";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | NBI (PVT) LTD — New Badriya Industries",
  description:
    "New Badriya Industries (NBI) — premium Sri Lankan spice manufacturer and exporter, established in 1987 by Abdul Hameed Salahudeen in Negama, Anuradhapura District.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Nearly four decades of spice heritage"
        title="About Us"
        sub="New Badriya Industries — premium Sri Lankan spice manufacturer & exporter, established 1987."
      />

      <AboutClient />
    </>
  );
}
