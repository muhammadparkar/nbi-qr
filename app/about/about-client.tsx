"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../ui";

// ----------------- DATA DEFINITIONS -----------------

const coreProductsList = [
  "Sri Lankan Spices",
  "Spice Blends & Curry Powders",
  "Whole Spices",
  "Coconut Products",
  "Ceylon Tea & Beverages",
  "Rice & Grains",
  "Snacks & Food Products",
  "Related FMCG Products",
  "HORECA Food Products",
];

const valuesDetails = [
  {
    name: "Quality",
    desc: "Consistent and reliable products.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: "Authenticity",
    desc: "Preserving the traditional flavours of Sri Lanka.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v4l3 3" />
      </svg>
    ),
  },
  {
    name: "Trust",
    desc: "Building long-term relationships with customers and partners.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Reliability",
    desc: "Providing dependable products and professional service.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: "Growth",
    desc: "Continuously developing our products and international markets.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const mapHotspots = [
  {
    id: "kadugannawa",
    name: "Kadugannawa, Kandy",
    role: "Founding Heritage & Hill Country Origin",
    x: 175,
    y: 235,
    spice: "Heritage Origins & Hill Spices",
    notes: "The business began in Kadugannawa, Kandy, Sri Lanka. From its early beginnings, NBI has focused on developing and supplying quality food products while maintaining the authentic taste and traditions of Sri Lanka.",
    wiki: "https://en.wikipedia.org/wiki/Kadugannawa",
    img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=70",
  },
  {
    id: "galle",
    name: "Galle & Southern Coast",
    role: "Ceylon Cinnamon Source",
    x: 145,
    y: 335,
    spice: "Ceylon Cinnamon (Alba/C5)",
    notes: "The unique coastal soil and humid atmosphere in Galle yield high-grade Ceylon Cinnamon. Local family farmers hand-peel thin inner bark quills, preserving the delicate sweet aroma.",
    img: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&q=70",
  },
  {
    id: "kandy",
    name: "Kandy (Central Hills)",
    role: "Black Pepper & Cloves",
    x: 175,
    y: 235,
    spice: "Black Pepper & Cardamom",
    notes: "Grown in biodiverse forest gardens alongside tea and spices, high-altitude black pepper possesses rich piperine levels and a sharp, citrus-pine finish.",
    img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=70",
  },
  {
    id: "matale",
    name: "Matale Valley",
    role: "Turmeric & Ginger Cultivation",
    x: 170,
    y: 195,
    spice: "Golden Turmeric",
    notes: "The volcanic-rich soils produce turmeric roots with exceptional curcumin content, offering deep gold coloration and potent quality.",
    img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=70",
  },
];

// Chilli Roasting Slider Data
const chilliRoastSteps = [
  {
    title: "Fresh Harvest",
    color: "#22c55e",
    notes: "Crisp, watery, and sharp capsicum sting. High moisture, not millable.",
    hue: "0deg",
    glow: "rgba(34, 197, 94, 0.3)",
    img: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?w=600&q=75",
  },
  {
    title: "Sun-Dried Chilli",
    color: "#ef4444",
    notes: "Natural moisture evaporated under the Sri Lankan sun. Deep heat profile matures.",
    hue: "45deg",
    glow: "rgba(239, 68, 68, 0.4)",
    img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&q=75",
  },
  {
    title: "Light Roast",
    color: "#b91c1c",
    notes: "Toasty outer layer, sharp punch, preserves high color value. Great for retail powders.",
    hue: "80deg",
    glow: "rgba(185, 28, 28, 0.5)",
    img: "https://images.unsplash.com/photo-1548611716-3000815a5803?w=600&q=75",
  },
  {
    title: "NBI Signature Roast",
    color: "#4a0404",
    notes: "Matured mahogany tone. Slow-release, smoky, rich roasted flavor. The soul of Sri Lankan Curry.",
    hue: "120deg",
    glow: "rgba(74, 4, 4, 0.6)",
    img: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=600&q=75",
  },
];

// Cinnamon Grind Slider Data
const cinnamonGrindSteps = [
  {
    title: "Alba Quills",
    desc: "Delicate multi-layered quills. Hand-scraped and dried whole to preserve essential oils.",
    visual: "|||||||||",
    img: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&q=75",
  },
  {
    title: "Cracked Chips",
    desc: "Coarse pieces. Ideal for herbal infusions, tea bags, and direct steam distillation.",
    visual: "• ❖ • ❖ •",
    img: "https://images.unsplash.com/photo-1509358770146-512c0199e46a?w=600&q=75",
  },
  {
    title: "Baker's Ground",
    desc: "Medium grains that hold their fragrant bouquet when baked at high temperatures.",
    visual: ".:. .:.:. .:",
    img: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=600&q=75",
  },
  {
    title: "NBI Export Grade",
    desc: "Micro-milled at 18°C. Superfine dust that dissolves easily and releases sweet notes instantly.",
    visual: "░░░░░░░░░",
    img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=75",
  },
];

// Turmeric Sourcing Soil details
const turmericSoilDetails = {
  standard: {
    title: "Standard Wet-Zone Sourcing",
    notes: "High rain dilutes soil minerals. The plant grows larger but has lower curcumin concentration and lighter yellow coloration.",
    img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=75",
  },
  nbi: {
    title: "Hill Country Sourcing (Kadugannawa / Matale)",
    notes: "High-iron content in hill soil limits excess water absorption, triggering the rhizome to overproduce Curcumin. Deep aroma & rich golden color.",
    img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=75",
  }
};

export default function AboutClient() {
  const [selectedHotspot, setSelectedHotspot] = useState(mapHotspots[0]);
  const [chilliRoast, setChilliRoast] = useState(2);
  const [cinnamonGrind, setCinnamonGrind] = useState(2);
  const [soilType, setSoilType] = useState("nbi");
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        iframe.contentWindow?.postMessage({ action: "setHotspot", id: selectedHotspot.id }, "*");
      };
      iframe.addEventListener("load", handleLoad);
      iframe.contentWindow?.postMessage({ action: "setHotspot", id: selectedHotspot.id }, "*");
      return () => {
        iframe.removeEventListener("load", handleLoad);
      };
    }
  }, [selectedHotspot]);

  return (
    <div className="space-y-16 md:space-y-24 pb-20 overflow-hidden">
      
      {/* ============ ABOUT US & HERITAGE SECTION ============ */}
      <section className="relative mx-auto max-w-5xl px-5 pt-8">
        <div className="bg-white rounded-3xl border border-gray-200 p-7 sm:p-10 md:p-14 shadow-md space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-nbigreen/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="border-b border-gray-200/80 pb-6">
            <span className="inline-block rounded-full bg-nbigreen/10 text-nbigreen px-3.5 py-1 text-xs font-bold uppercase tracking-widest mb-3">
              ABOUT US
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-nbidark">
              NBI HOLDING
            </h2>
            <p className="mt-2 text-lg sm:text-xl font-serif italic text-nbired font-semibold">
              Sri Lankan Heritage. Quality Products. Trusted Partnerships.
            </p>
          </div>

          <div className="text-base sm:text-lg leading-relaxed text-nbicocoa space-y-6">
            <p className="text-nbidark font-semibold text-lg sm:text-xl">
              NBI HOLDING is a Sri Lankan family-owned business with a long-standing heritage in the food, spice, and related FMCG industries.
            </p>

            <p>
              The business began in{" "}
              <a
                href="https://en.wikipedia.org/wiki/Kadugannawa"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-nbigreen underline hover:text-nbired transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Learn more about Kadugannawa on Wikipedia"
              >
                Kadugannawa, Kandy, Sri Lanka
                <svg className="w-4 h-4 shrink-0 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              . From its early beginnings, NBI has focused on developing and supplying quality food products while maintaining the authentic taste and traditions of Sri Lanka.
            </p>

            <p>
              Over the years, NBI has developed strong expertise in spices, spice blends, and related food products, building a foundation based on quality, consistency, reliability, and customer trust.
            </p>

            <p>
              Today, NBI HOLDING continues to expand its product portfolio and develop opportunities in both local and international markets.
            </p>

            <div className="bg-[#FBFAF7] p-6 rounded-2xl border-l-4 border-nbigreen text-nbidark shadow-xs space-y-2">
              <p className="font-medium text-base sm:text-lg leading-relaxed">
                Through its international business activities and <strong className="font-bold text-nbigreen">ARCO Trading &amp; Marketing in Qatar</strong>, the group aims to introduce authentic Sri Lankan products to the Qatar FMCG and HORECA markets, serving hotels, restaurants, cafés, catering companies, supermarkets, wholesalers, and other business customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR CORE PRODUCT FOCUS ============ */}
      <section className="mx-auto max-w-5xl px-5">
        <div className="bg-[#FBFAF7] rounded-3xl border border-gray-200 p-7 sm:p-10 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Comprehensive Portfolio</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-nbidark">Our Core Product Focus</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreProductsList.map((item, idx) => (
              <div
                key={item}
                className="flex items-center gap-3.5 bg-white p-4.5 rounded-2xl border border-gray-200/90 shadow-xs hover:border-nbigreen/40 hover:shadow-md transition-all duration-200"
              >
                <span className="w-8 h-8 rounded-full bg-nbigreen/10 text-nbigreen flex items-center justify-center font-extrabold text-xs shrink-0">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
                <span className="font-bold text-nbidark text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OUR VALUES SECTION ============ */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-nbired">Guided by Principles</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-nbidark">Our Values</h2>
          <p className="mt-3 font-serif text-base sm:text-lg leading-relaxed text-nbicocoa">
            Building long-term trust across local and international markets since 1987.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {valuesDetails.map((item, index) => {
            const isHovered = activeValue === index;
            return (
              <div
                key={item.name}
                onClick={() => setActiveValue(activeValue === index ? null : index)}
                onMouseEnter={() => setActiveValue(index)}
                onMouseLeave={() => setActiveValue(null)}
                className={`group relative rounded-3xl border p-7 sm:p-8 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  isHovered
                    ? "bg-nbidark text-white border-nbidark shadow-xl scale-[1.02]"
                    : "bg-white text-nbidark border-gray-200 hover:border-nbigreen/40 shadow-sm"
                }`}
              >
                <div
                  className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full blur-2xl transition-opacity duration-300 ${
                    isHovered ? "bg-nbigreen/20 opacity-100" : "bg-nbigreen/5 opacity-0"
                  }`}
                />

                <div className="relative z-10 space-y-3">
                  <div className={`transition-colors duration-300 ${isHovered ? "text-nbired" : "text-nbigreen"}`}>
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-extrabold tracking-tight">
                    {item.name}
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                    isHovered ? "text-nbicream/90" : "text-nbicocoa/95"
                  }`}>
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-current/10 relative z-10 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
                  <span>Core Pillar</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ OUR VISION & MISSION ============ */}
      <section className="mx-auto max-w-5xl px-5">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* VISION CARD */}
          <div className="rounded-3xl bg-nbidark text-white p-8 md:p-10 flex flex-col justify-between border border-nbidark relative overflow-hidden shadow-lg">
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-nbigreen/25 blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <span className="inline-block rounded-full bg-white/10 text-nbicream border border-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                Strategic Direction
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Vision</h3>
              <p className="font-serif text-lg leading-relaxed text-nbicream/95">
                To build NBI HOLDING into a respected Sri Lankan food and FMCG group with a strong presence in local and international markets.
              </p>
            </div>
          </div>

          {/* MISSION CARD */}
          <div className="rounded-3xl bg-white border border-gray-200 p-8 md:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="inline-block rounded-full bg-nbired/10 text-nbired px-3 py-1 text-xs font-bold uppercase tracking-widest">
                Operational Purpose
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-nbidark">Our Mission</h3>
              <p className="font-serif text-lg leading-relaxed text-nbicocoa">
                To deliver quality Sri Lankan food products while preserving authentic flavours, creating trusted partnerships, and providing reliable solutions to the FMCG and HORECA sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BRAND STATEMENT BANNER ============ */}
      <section className="mx-auto max-w-5xl px-5">
        <div className="rounded-3xl bg-gradient-to-r from-nbidark via-[#0d4527] to-nbidark text-white p-8 md:p-12 text-center space-y-4 relative overflow-hidden shadow-xl border border-nbigreen/30">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">NBI HOLDING</h2>
          <p className="font-serif italic text-base sm:text-xl text-nbicream/95 max-w-3xl mx-auto">
            Sri Lankan Heritage | Quality Food Products | Global Opportunities
          </p>
          <div className="pt-2">
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-nbicream">
              Established Since 1987
            </span>
          </div>
        </div>
      </section>

      {/* ============ INTERACTIVE MAP SECTION ============ */}
      <section className="mx-auto max-w-6xl px-5 py-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-nbigreen">Spice Origin Map</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-nbidark">Sourced Across Sri Lanka</h2>
          <p className="mt-3 font-serif text-base md:text-lg leading-relaxed text-nbicocoa">
            Originating in{" "}
            <a
              href="https://en.wikipedia.org/wiki/Kadugannawa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-nbigreen underline hover:text-nbired"
            >
              Kadugannawa, Kandy
            </a>
            , our sourcing network spans Sri Lanka&apos;s finest spice districts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Column 1: Live Sourcing Map Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col justify-between h-[340px] md:h-[520px] relative overflow-hidden">
            <div className="absolute inset-0 texture-dots rounded-3xl opacity-40 pointer-events-none" />
            
            <div className="relative z-10 w-full pb-3 border-b border-gray-100 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-nbisand block">
                  Interactive Sourcing Map
                </span>
                <h4 className="text-sm font-bold text-nbidark">{selectedHotspot.name}</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-nbigreen/10 text-nbigreen font-bold text-[9px] uppercase tracking-wider">
                Live Sourcing Map
              </span>
            </div>

            <div className="flex-1 w-full my-4 rounded-2xl overflow-hidden border border-gray-200 relative bg-gray-50 min-h-0">
              <iframe
                ref={iframeRef}
                title="Sri Lanka Sourcing Locations Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="/sourcing-map.html"
              />
            </div>
            
            <p className="relative z-10 text-[9px] font-extrabold text-center text-nbisand tracking-widest uppercase select-none pt-2 border-t border-gray-100 w-full">
              Use tabs below to explore regions
            </p>
          </div>

          {/* Column 2: Hotspot Details Card */}
          <div className="bg-nbidark text-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl relative overflow-hidden h-auto md:h-[520px] flex flex-col justify-between transition-all duration-500 gap-6 md:gap-0">
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-nbigreen/20 blur-3xl" />
            
            <div key={selectedHotspot.id} className="relative z-10 space-y-3 min-h-0 overflow-y-auto animate-slide-up">
              <span className="inline-block rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-nbicream">
                {selectedHotspot.spice}
              </span>
              
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
                  {selectedHotspot.name}
                  {selectedHotspot.wiki && (
                    <a
                      href={selectedHotspot.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-nbigreen hover:underline bg-white/10 px-2 py-0.5 rounded-full"
                      title="View Wikipedia"
                    >
                      Wiki ↗
                    </a>
                  )}
                </h3>
                <p className="text-xs text-nbicream/70 mt-0.5">{selectedHotspot.role}</p>
              </div>
              
              <p className="font-serif text-sm md:text-base leading-relaxed text-nbicream/90">
                {selectedHotspot.notes}
              </p>
            </div>

            <div className="relative my-3 rounded-2xl overflow-hidden h-40 border border-white/10 shadow-lg">
              <Image
                src={selectedHotspot.img}
                alt={selectedHotspot.name}
                fill
                className="object-cover transition-all duration-500"
                unoptimized
              />
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
              {mapHotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`press text-[10px] font-extrabold uppercase tracking-wider py-2 rounded-xl text-center cursor-pointer transition-colors ${
                    selectedHotspot.id === spot.id
                      ? "bg-nbired text-white"
                      : "bg-white/5 text-nbicream/70 hover:bg-white/10"
                  }`}
                >
                  {spot.id === "kadugannawa" ? "Kadugannawa" : spot.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============ FOOTER CTA ============ */}
      <section className="mx-auto max-w-5xl px-5">
        <div className="rounded-3xl bg-nbidark text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-nbigreen/25 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Partner with NBI HOLDING</h2>
            <p className="mt-3 font-serif text-lg text-nbicream/90">
              Discover our complete range of Sri Lankan spices, coconut products, teas, and FMCG solutions for Qatar and international markets.
            </p>
          </div>
          <Link
            href="/products"
            className="press shrink-0 inline-flex items-center gap-2 rounded-full bg-nbired px-7 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white relative z-10"
          >
            Explore Products
            <ArrowIcon />
          </Link>
        </div>
      </section>

    </div>
  );
}
