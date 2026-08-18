import type { Metadata } from "next";
import { PageHero } from "../ui";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | NBI HOLDING — Sri Lankan Heritage & Quality Products",
  description:
    "NBI HOLDING is a Sri Lankan family-owned business established in 1987 in Kadugannawa, Kandy. Delivering quality food products, spices, FMCG & HORECA solutions locally and internationally through ARCO Trading & Marketing in Qatar.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Established Since 1987"
        title="ABOUT US"
        sub="Sri Lankan Heritage. Quality Products. Trusted Partnerships."
      />

      <AboutClient />
    </>
  );
}
