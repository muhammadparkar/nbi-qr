"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../ui";

// ----------------- DATA DEFINITIONS -----------------

const valuesDetails = [
  {
    name: "Quality First",
    desc: "We accept nothing less than excellence. Every batch is milled, sifted, and graded under double-check quality metrics.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: "Customer Satisfaction",
    desc: "Customizing pack sizes, blending unique ratios, and accommodating strict shipping windows for importers worldwide.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Integrity & Trust",
    desc: "A farmer's handshake opens our seasons. We pay fair prices and maintain absolute transparency with our export partners.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: "Innovation",
    desc: "Combining low-temperature grinding technology that locks in volatile oils with modern bilingual packaging concepts.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    name: "Sustainability",
    desc: "Supporting rain-fed agriculture, minimizing electricity waste in milling, and prioritizing biodegradable packaging structures.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.5a1.5 1.5 0 001.5-1.5V9a2 2 0 00-2-2h-3a2 2 0 01-2-2V3.5m-9 14.5a9 9 0 1118 0 9 9 0 01-18 0z" />
      </svg>
    ),
  },
  {
    name: "Food Safety",
    desc: "Rigorous sorting processes eliminate physical impurities. Every clean batch undergoes microbiological and chemical testing.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

const mapHotspots = [
  {
    id: "anuradhapura",
    name: "Anuradhapura (Negama)",
    role: "NBI HQ & Processing Hub",
    x: 160,
    y: 135,
    spice: "Red Chilli & Curries",
    notes: "Our primary milling facilities are located in the dry zone of Negama. The intense local sun facilitates natural open-air pre-drying, while our climate-controlled roasters process raw spices within hours of arriving from the field.",
    img: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=800&q=70",
  },
  {
    id: "galle",
    name: "Galle & Southern Coast",
    role: "Ceylon Cinnamon Source",
    x: 145,
    y: 335,
    spice: "Ceylon Cinnamon (Alba/C5)",
    notes: "The unique coastal soil and humid atmosphere in Galle yield the world's highest grade Ceylon Cinnamon. Local family farmers painstakingly hand-peel thin inner bark quills, preserving the delicate sweet aroma NBI is known for.",
    img: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&q=70",
  },
  {
    id: "kandy",
    name: "Kandy (Central Hills)",
    role: "Black Pepper & Cloves",
    x: 175,
    y: 235,
    spice: "Black Pepper & Cardamom",
    notes: "Grown in biodiverse forest gardens alongside coffee and cocoa, Kandy's high-altitude black pepper possesses high piperine levels, giving it a bold heat and a sharp, citrus-pine finish that sets it apart from standard pepper.",
    img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=70",
  },
  {
    id: "matale",
    name: "Matale Valley",
    role: "Turmeric & Ginger Cultivation",
    x: 170,
    y: 195,
    spice: "Golden Turmeric",
    notes: "The volcanic-rich, iron-dense soils of the Matale valley produce turmeric roots with exceptional curcumin content. We source fresh rhizomes directly to ensure that our turmeric powder has deep gold coloration and potent medicinal quality.",
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
    notes: "Natural moisture evaporated under the Anuradhapura sun. Deep heat profile matures.",
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
    title: "Anuradhapura Dry-Zone Sourcing",
    notes: "High-iron content in dry-zone soil limits water absorption, triggering the rhizome to overproduce Curcumin. Deep aroma & rich golden color.",
    img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&q=75",
  }
};

export default function AboutClient() {
  const [journalOpen, setJournalOpen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(mapHotspots[0]);
  const [chilliRoast, setChilliRoast] = useState(2);
  const [cinnamonGrind, setCinnamonGrind] = useState(2);
  const [soilType, setSoilType] = useState("nbi"); // 'standard' or 'nbi'
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
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* ============ FOUNDER'S JOURNAL SECTION ============ */}
      <section className="relative mx-auto max-w-4xl px-5 py-12">
        <div className="text-center mb-8">
          <p className="font-serif italic text-nbired text-lg">A Letter from Anuradhapura</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-nbidark">The Founder&apos;s Story</h2>
        </div>

        {/* Interactive Envelope */}
        <div 
          className={`relative rounded-3xl bg-[#f5efe2] border border-nbisand/30 shadow-xl overflow-hidden transition-all duration-700 ease-in-out ${
            journalOpen ? "max-h-[1200px] p-8 md:p-12" : "max-h-[220px] p-6 hover:shadow-2xl hover:border-nbired/30 cursor-pointer"
          }`}
          onClick={() => !journalOpen && setJournalOpen(true)}
        >
          {/* Envelope Front Mockup */}
          {!journalOpen && (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
              <p className="text-xs font-bold tracking-[0.25em] text-nbisand uppercase">From the Desk of the Founder</p>
              <p className="font-serif italic text-nbicocoa/80 text-sm">“A spice mill is a promise made in aroma.”</p>
              
              {/* Wax Seal Button */}
              <button 
                type="button"
                className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-nbired text-white shadow-lg active:scale-95 transition-transform duration-200"
                aria-label="Break Wax Seal to Read Letter"
              >
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 group-hover:rotate-45 transition-transform duration-700" />
                {/* Wax Seal SVG */}
                <svg className="w-8 h-8 fill-current text-[#ffc5c0]/90" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                {/* Tooltip */}
                <span className="absolute -bottom-8 whitespace-nowrap text-[10px] font-bold tracking-widest text-nbired uppercase group-hover:scale-105 transition-transform">
                  Break Seal
                </span>
              </button>
            </div>
          )}

          {/* Opened Letter Content */}
          <div className={`transition-opacity duration-700 ${journalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div className="flex justify-between items-start border-b border-nbisand/20 pb-4 mb-6">
              <div>
                <p className="font-extrabold text-nbidark text-xl">NEW BADRIYA INDUSTRIES</p>
                <p className="text-xs font-semibold tracking-wider text-nbisand uppercase">Negama, Anuradhapura District</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setJournalOpen(false);
                }}
                className="press rounded-full bg-nbidark/5 hover:bg-nbidark/10 text-nbidark px-3 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Letter
              </button>
            </div>

            {/* Handwritten style message */}
            <div className="font-serif text-lg leading-relaxed text-nbicocoa space-y-6 max-w-2xl mx-auto italic">
              <p>Dear Friends and Partners,</p>
              <p>
                When I setup our first modest milling stone in Negama in 1987, Sri Lanka was undergoing immense changes. 
                But some things on this island remain eternal—the richness of our soil, the intensity of our sun, and the 
                pride we take in our cooking. 
              </p>
              <p>
                I founded New Badriya Industries (NBI) with a simple, uncompromising doctrine: 
                <strong className="font-semibold not-italic text-nbidark block my-2 pl-4 border-l-2 border-nbired">
                  “If it does not carry the true, unadulterated fragrance of our soil, it shall not leave our gates.”
                </strong>
                In those early days, wholesalers would wait outside the mill simply because they could smell the roasting 
                curry powder from a mile down the Negama road. They knew that smell meant purity. We did not use fillers, 
                we did not blend cheap dyes, and we ground in batches small enough to keep the temperature low and the oils intact.
              </p>
              <p>
                Today, my children help me carry this legacy to the global market, reaching dining tables in Doha, Muscat, 
                and far beyond. Yet, every single sack of spice is still inspected here, at the source. We still handshake 
                the same farming families. The technology has modernized, but the commitment remains identical to the day 
                the first mill turned.
              </p>
              <p>
                Thank you for trusting us with your kitchens, your businesses, and your meals. We promise to keep grinding 
                honestly.
              </p>
              
              <div className="pt-6 flex flex-col items-end text-right border-t border-nbisand/10">
                <p className="font-serif not-italic font-bold text-nbidark">Abdul Hameed Salahudeen</p>
                <p className="text-xs font-semibold text-nbisand uppercase tracking-wider">Founder, New Badriya Industries</p>
                <p className="text-[10px] text-nbisand mt-1">Est. 1987 · Negama, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTERACTIVE MAP SECTION ============ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-nbigreen">Spice Origin Map</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-nbidark">Sourced Across the Island</h2>
          <p className="mt-4 font-serif text-base md:text-lg leading-relaxed text-nbicocoa">
            Our premium spices are cultivated in micro-climates across Sri Lanka&apos;s historic spice districts, optimized for weather and soil chemistry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Column 1: Live Sourcing Map Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col justify-between h-[340px] md:h-[520px] relative overflow-hidden">
            {/* Grid Background Effect */}
            <div className="absolute inset-0 texture-dots rounded-3xl opacity-40 pointer-events-none" />
            
            {/* Interactive map prompt header */}
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

            {/* Embedded Live Leaflet Map Canvas */}
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
              Use tabs <span className="hidden md:inline">on the right</span><span className="inline md:hidden">below</span> to switch regions
            </p>
          </div>

          {/* Column 2: Hotspot Details Card */}
          <div className="bg-nbidark text-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl relative overflow-hidden h-auto md:h-[520px] flex flex-col justify-between transition-all duration-500 gap-6 md:gap-0">
            {/* Background gradient flare */}
            <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-nbigreen/20 blur-3xl" />
            
            <div key={selectedHotspot.id} className="relative z-10 space-y-3 min-h-0 overflow-y-auto animate-slide-up">
              <span className="inline-block rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-nbicream">
                {selectedHotspot.spice}
              </span>
              
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{selectedHotspot.name}</h3>
                <p className="text-xs text-nbicream/70 mt-0.5">{selectedHotspot.role}</p>
              </div>
              
              <p className="font-serif text-sm md:text-base leading-relaxed text-nbicream/90">
                {selectedHotspot.notes}
              </p>
            </div>

            {/* Dynamic region photo / detail */}
            <div className="relative my-3 rounded-2xl overflow-hidden h-40 border border-white/10 shadow-lg">
              <Image
                src={selectedHotspot.img}
                alt={selectedHotspot.name}
                fill
                className="object-cover transition-all duration-500"
                unoptimized
              />
            </div>

            {/* Region Selector Tabs */}
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
                  {spot.id === "anuradhapura" ? "Negama" : spot.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============ NBI SPICE LAB SECTION ============ */}
      <section className="relative bg-nbicream/40 border-y border-nbigreen/10 texture-dots py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Interactive Experience</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-nbidark">The NBI Spice Laboratory</h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
              Spices are living ingredients. Control the processing parameters below to see how our craftsman millers balance flavor, heat, and nutrition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            
            {/* CARD 1: CHILLI ROASTER */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-nbisand">Simulator 01</span>
                  <span className="px-2 py-0.5 rounded-full bg-nbired/10 text-nbired font-bold text-[10px] uppercase tracking-wider">
                    Roast Profile
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-nbidark">Chilli Roasting Profile</h3>
                <p className="mt-2 text-xs text-nbicocoa/80">
                  Heat changes chilli chemistry. Slide to heat the roasting drums and observe color maturity:
                </p>

                {/* Graphic Visual Representation */}
                <div className="my-4 h-36 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner bg-gray-50">
                  <Image
                    src={chilliRoastSteps[chilliRoast].img}
                    alt={chilliRoastSteps[chilliRoast].title}
                    fill
                    className="object-cover transition-opacity duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-extrabold text-white uppercase tracking-wider bg-nbired px-2 py-0.5 rounded">
                      {chilliRoastSteps[chilliRoast].title}
                    </span>
                  </div>
                </div>
                
                {/* Active step details */}
                <div className="space-y-1 min-h-[75px]">
                  <p className="font-extrabold text-nbidark text-sm">
                    {chilliRoastSteps[chilliRoast].title}
                  </p>
                  <p className="text-xs text-nbicocoa/90 leading-relaxed">
                    {chilliRoastSteps[chilliRoast].notes}
                  </p>
                </div>
              </div>

              {/* Slider Input */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={chilliRoast}
                  onChange={(e) => setChilliRoast(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-gray-200 appearance-none cursor-pointer accent-nbired"
                  aria-label="Roasting profile slider"
                />
                <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-wider text-nbisand mt-2">
                  <span>Raw</span>
                  <span>Dried</span>
                  <span>Light</span>
                  <span>Deep Roast</span>
                </div>
              </div>
            </div>

            {/* CARD 2: CINNAMON MILLING */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-nbisand">Simulator 02</span>
                  <span className="px-2 py-0.5 rounded-full bg-nbigreen/10 text-nbigreen font-bold text-[10px] uppercase tracking-wider">
                    Grind Grade
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-nbidark">Cinnamon Particle Grade</h3>
                <p className="mt-2 text-xs text-nbicocoa/80">
                  Granularity influences oil dispersion. Slide to grind Cinnamon bark to export grades:
                </p>

                {/* Graphic Visual Representation */}
                <div className="my-4 h-36 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner bg-gray-50">
                  <Image
                    src={cinnamonGrindSteps[cinnamonGrind].img}
                    alt={cinnamonGrindSteps[cinnamonGrind].title}
                    fill
                    className="object-cover transition-opacity duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-extrabold text-white uppercase tracking-wider bg-nbigreen px-2 py-0.5 rounded">
                      {cinnamonGrindSteps[cinnamonGrind].title}
                    </span>
                  </div>
                </div>
                
                {/* Active step details */}
                <div className="space-y-1 min-h-[75px]">
                  <p className="font-extrabold text-nbidark text-sm">
                    {cinnamonGrindSteps[cinnamonGrind].title}
                  </p>
                  <p className="text-xs text-nbicocoa/90 leading-relaxed">
                    {cinnamonGrindSteps[cinnamonGrind].desc}
                  </p>
                </div>
              </div>

              {/* Slider Input */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <input
                  type="range"
                  min="0"
                  max="3"
                  value={cinnamonGrind}
                  onChange={(e) => setCinnamonGrind(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-gray-200 appearance-none cursor-pointer accent-nbigreen"
                  aria-label="Cinnamon grinding intensity slider"
                />
                <div className="flex justify-between text-[9px] font-extrabold uppercase tracking-wider text-nbisand mt-2">
                  <span>Quills</span>
                  <span>Chips</span>
                  <span>Bakers</span>
                  <span>Superfine</span>
                </div>
              </div>
            </div>

            {/* CARD 3: TURMERIC SOIL CHEMISTRY */}
            <div className="rounded-3xl bg-white border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-nbisand">Simulator 03</span>
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-700 font-bold text-[10px] uppercase tracking-wider">
                    Soil Impact
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-nbidark">Soil chemistry &amp; Curcumin</h3>
                <p className="mt-2 text-xs text-nbicocoa/80">
                  Soil structure alters potency. Toggle cultivation location to compare the curcumin concentration:
                </p>

                {/* Graphic Visual Representation with Curcumin overlay */}
                <div className="my-4 h-36 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner bg-gray-50">
                  <Image
                    src={soilType === "nbi" ? turmericSoilDetails.nbi.img : turmericSoilDetails.standard.img}
                    alt={soilType === "nbi" ? "NBI Turmeric Sourcing" : "Standard Turmeric Sourcing"}
                    fill
                    className="object-cover transition-opacity duration-300"
                    unoptimized
                  />
                  {/* Curcumin Metric Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-3 z-10">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">
                        Curcumin Level
                      </span>
                      <span className="text-xs font-black text-yellow-400">
                        {soilType === "nbi" ? "5.8% — 6.2%" : "2.4% — 3.1%"}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden mt-1.5">
                      <div 
                        className="h-full bg-yellow-400 transition-all duration-500 ease-out" 
                        style={{ width: soilType === "nbi" ? "95%" : "45%" }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Active step details */}
                <div className="space-y-1 min-h-[75px]">
                  <p className="font-extrabold text-nbidark text-sm">
                    {soilType === "nbi" ? turmericSoilDetails.nbi.title : turmericSoilDetails.standard.title}
                  </p>
                  <p className="text-xs text-nbicocoa/90 leading-relaxed">
                    {soilType === "nbi" ? turmericSoilDetails.nbi.notes : turmericSoilDetails.standard.notes}
                  </p>
                </div>
              </div>

              {/* Selector Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setSoilType("standard")}
                    className={`press text-[10px] py-2 rounded-lg font-bold text-center cursor-pointer transition-colors ${
                      soilType === "standard" 
                        ? "bg-white text-nbidark shadow-sm" 
                        : "text-nbisand hover:text-nbidark"
                    }`}
                  >
                    Wet Zone Soil
                  </button>
                  <button
                    onClick={() => setSoilType("nbi")}
                    className={`press text-[10px] py-2 rounded-lg font-bold text-center cursor-pointer transition-colors ${
                      soilType === "nbi" 
                        ? "bg-nbigreen text-white shadow-sm" 
                        : "text-nbisand hover:text-nbidark"
                    }`}
                  >
                    NBI Sourced Soil
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ CORE VALUES INTERACTIVE SECTION ============ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-nbired">Our Core Principles</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-nbidark">Our Core Values</h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
            Nearly four decades of market trust is built on consistency. Click a pillar to see how NBI puts it into action.
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
                className={`group relative rounded-3xl border p-8 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  isHovered 
                    ? "bg-nbidark text-white border-nbidark shadow-lg scale-[1.02]" 
                    : "bg-white text-nbidark border-gray-200 hover:border-nbigreen/30 shadow-sm"
                }`}
              >
                {/* Visual Glow overlay inside card */}
                <div 
                  className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full blur-2xl transition-opacity duration-300 ${
                    isHovered ? "bg-nbigreen/20 opacity-100" : "bg-nbigreen/5 opacity-0"
                  }`} 
                />

                <div className="relative z-10 space-y-4">
                  {/* Icon with dynamic color */}
                  <div className={`transition-colors duration-300 ${isHovered ? "text-nbired" : "text-nbigreen"}`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {item.name}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    isHovered ? "text-nbicream/90" : "text-nbicocoa/95"
                  }`}>
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-current/10 relative z-10 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
                  <span>Verification Done</span>
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

      {/* ============ FOOTER CTA ============ */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="rounded-3xl bg-nbidark text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-nbigreen/25 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Immerse in Ceylon Flavor</h2>
            <p className="mt-3 font-serif text-lg text-nbicream/90">
              Browse our complete catalog of whole spices, ground spices, and signature masalas.
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
