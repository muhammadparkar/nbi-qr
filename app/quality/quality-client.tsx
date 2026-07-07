"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "../ui";

// ---------------- DATA STRUCTURES ----------------

const qcSpices = {
  cinnamon: {
    name: "Ceylon Cinnamon (Alba)",
    moistureTarget: "< 12.0%",
    moistureResult: "10.4%",
    moisturePass: true,
    oilTarget: "> 4.0% v/w",
    oilResult: "4.7% v/w",
    oilPass: true,
    purityTarget: "> 99.5%",
    purityResult: "99.9%",
    purityPass: true,
    leadTime: "3-5 Days Milling",
    cert: "ISO 22000 & Halal Certified",
    color: "border-amber-700/30 text-amber-900 bg-amber-50/50",
  },
  pepper: {
    name: "Ceylon Black Pepper",
    moistureTarget: "< 12.5%",
    moistureResult: "11.1%",
    moisturePass: true,
    oilTarget: "> 2.5% v/w",
    oilResult: "3.2% v/w",
    oilPass: true,
    purityTarget: "> 99.0%",
    purityResult: "99.8%",
    purityPass: true,
    leadTime: "4-6 Days Grinding",
    cert: "HACCP Approved Quality",
    color: "border-slate-700/30 text-slate-900 bg-slate-50/50",
  },
  chilli: {
    name: "Roasted Chilli Powder",
    moistureTarget: "< 10.0%",
    moistureResult: "9.2%",
    moisturePass: true,
    oilTarget: "> 1.8% v/w",
    oilResult: "2.1% v/w",
    oilPass: true,
    purityTarget: "> 99.5%",
    purityResult: "99.8%",
    purityPass: true,
    leadTime: "2-4 Days Roasting",
    cert: "Certified Aflatoxin Free",
    color: "border-red-700/30 text-red-900 bg-red-50/50",
  },
  turmeric: {
    name: "Golden Turmeric Powder",
    moistureTarget: "< 11.0%",
    moistureResult: "9.8%",
    moisturePass: true,
    oilTarget: "> 5.5% Curcumin",
    oilResult: "6.1% Curcumin",
    oilPass: true,
    purityTarget: "> 99.5%",
    purityResult: "99.9%",
    purityPass: true,
    leadTime: "3-5 Days Grinding",
    cert: "FDA Registered Sourcing",
    color: "border-yellow-700/30 text-yellow-900 bg-yellow-50/50",
  },
};

const testingStages = [
  {
    id: "stage-1",
    title: "1. Farmer Selection",
    subtitle: "Soil & Crop Audits",
    desc: "NBI field officers perform pre-harvest checks on agricultural soil chemistry, pesticide usage, and moisture in the field. A crop is only contracted if it meets strict natural criteria.",
    details: ["Aflatoxin pre-screening", "Soil mineral profiling", "Fair-price farmer contracts"],
  },
  {
    id: "stage-2",
    title: "2. Intake QC",
    subtitle: "Optical sorting",
    desc: "Once spice bags enter Negama gates, they undergo manual sorting and laser optical grading to eliminate foreign materials like dust, twigs, or stones.",
    details: ["Optical sorting calibration", "Moisture verification test", "Traceability batch logging"],
  },
  {
    id: "stage-3",
    title: "3. Milling Profile",
    subtitle: "Cryogenic Cooling",
    desc: "Milling raises heat, which destroys spice essential oils. NBI uses chilled milling systems to maintain temperatures below 18°C, locking in flavor.",
    details: ["Milling under 18°C", "Aroma containment", "Vibration sieve size sorting"],
  },
  {
    id: "stage-4",
    title: "4. Sifting & Sieve",
    subtitle: "Laser Particle Checks",
    desc: "Ground powders are sifted through fine food-grade screens to ensure uniform density, smooth dissolving capability, and standard mesh sizes.",
    details: ["Mesh sizing audits", "Ferrous metal separators", "Bulk density test"],
  },
  {
    id: "stage-5",
    title: "5. Packaging & Seal",
    subtitle: "Nitrogen Flush",
    desc: "Finished products are packed in moisture-barrier bags with nitrogen flushing to replace oxygen, extending shelf freshness without preservatives.",
    details: ["Bilingual labelling check", "Heat-seal leak vacuum test", "Phytosanitary certificate request"],
  },
];

const promises = [
  { 
    title: "Premium Quality", 
    body: "Carefully selected ingredients in every batch.", 
    detail: "Spices undergo three separate grading steps. Only grade-A quills and premium high-density peppercorns make the cut." 
  },
  { 
    title: "Rich Aroma", 
    body: "Milled fresh so the fragrance stays in the pack.", 
    detail: "Milled at temperatures below 18°C to prevent evaporation of volatile essential oils. Packed immediately after milling." 
  },
  { 
    title: "Authentic Natural Taste", 
    body: "The real flavor of Sri Lankan spice — nothing artificial.", 
    detail: "No artificial colors, MSG, starch fillers, or anti-caking chemicals. 100% pure agricultural spice." 
  },
  { 
    title: "Food Safety", 
    body: "Strict hygienic processing at every stage.", 
    detail: "Facilities compliant with global standards. Equipment is fully stainless steel 304, washed and sterilized regularly." 
  },
  { 
    title: "Consistent Quality", 
    body: "The same standard, order after order.", 
    detail: "Standardized roasting and grinding recipes managed via digital profiles to guarantee matching flavor profiles across seasons." 
  },
  { 
    title: "Maximum Freshness", 
    body: "From mill to pack without delay.", 
    detail: "No warehouse backlogs. We mill specifically to fulfill confirmed orders, shipping within 72 hours of grinding." 
  },
  { 
    title: "Customer Satisfaction", 
    body: "Quality control that ends only when you're satisfied.", 
    detail: "Bespoke blending, flexible shipping container formats, and complete documentation provided for customs entry." 
  },
];

export default function QualityClient() {
  const [selectedSpice, setSelectedSpice] = useState<keyof typeof qcSpices>("cinnamon");
  const [scanningState, setScanningState] = useState<"idle" | "calibrating" | "oil-check" | "completed">("idle");
  const [activeStage, setActiveStage] = useState(0);
  const [activePromise, setActivePromise] = useState<number | null>(null);

  const runQCAnalysis = () => {
    setScanningState("calibrating");
    setTimeout(() => {
      setScanningState("oil-check");
      setTimeout(() => {
        setScanningState("completed");
      }, 900);
    }, 900);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* ============ QC SIMULATOR SECTION ============ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid md:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Simulator Inputs & Control */}
          <div className="md:col-span-5 flex flex-col justify-between bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Interactive Laboratory</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-nbidark">Verify Spice Integrity</h2>
              <p className="text-sm text-nbicocoa/80 leading-relaxed">
                Choose a product and trigger our simulated quality analysis to inspect how NBI matches rigorous parameters.
              </p>

              {/* Selector Buttons */}
              <div className="space-y-2 pt-2">
                {Object.entries(qcSpices).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedSpice(key as keyof typeof qcSpices);
                      setScanningState("idle");
                    }}
                    className={`press w-full text-left p-4 rounded-2xl border font-bold flex items-center justify-between transition-all ${
                      selectedSpice === key 
                        ? "bg-nbidark text-white border-nbidark shadow-md" 
                        : "bg-gray-50 border-gray-200 text-nbidark hover:bg-gray-100 cursor-pointer"
                    }`}
                  >
                    <span className="text-sm">{data.name}</span>
                    <svg className={`w-4 h-4 transition-transform ${selectedSpice === key ? "translate-x-1" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Test Trigger Button */}
            <div className="mt-8 pt-4 border-t border-gray-100">
              <button
                onClick={runQCAnalysis}
                disabled={scanningState !== "idle"}
                className={`press w-full py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-widest text-center cursor-pointer transition-colors ${
                  scanningState !== "idle"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-nbired text-white hover:bg-[#b82217]"
                }`}
              >
                {scanningState === "idle" && "Run Quality Scan"}
                {scanningState === "calibrating" && "Calibrating Sensors..."}
                {scanningState === "oil-check" && "Analyzing Volatile Oils..."}
                {scanningState === "completed" && "Scan Completed"}
              </button>
            </div>
          </div>

          {/* Column 2: Digital QC Report Display */}
          <div className="md:col-span-7">
            <div className="bg-nbidark text-white rounded-3xl p-5 md:p-8 shadow-xl h-full flex flex-col justify-between relative overflow-hidden min-h-[380px] md:min-h-[460px]">
              
              {/* Background glowing rings */}
              <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-nbigreen/25 blur-3xl pointer-events-none" />
              
              {/* Scanner Screen Header */}
              <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-nbigreen bg-nbigreen/20 px-2 py-0.5 rounded">
                    Spectroscopy Node #4
                  </span>
                  <h3 className="text-xl font-bold mt-1">Digital Testing Lab</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${scanningState === "completed" ? "bg-nbigreen" : "bg-yellow-400 animate-ping"}`} />
                  <span className="text-xs font-semibold text-nbicream/70 uppercase tracking-widest">
                    {scanningState === "idle" && "Lab Idle"}
                    {scanningState === "calibrating" && "Calibrating..."}
                    {scanningState === "oil-check" && "Testing..."}
                    {scanningState === "completed" && "Approved"}
                  </span>
                </div>
              </div>

              {/* Lab Visual Screen */}
              <div className="flex-1 my-6 flex flex-col justify-center items-center min-h-[220px]">
                {scanningState === "idle" && (
                  <div className="text-center space-y-3">
                    <svg className="w-16 h-16 text-nbicream/40 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7C4.547 9.547 4.5 10.768 4.5 12s.047 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.092-1.209.138-2.43.138-3.662z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5" />
                    </svg>
                    <p className="text-sm font-medium text-nbicream/60">Press &apos;Run Quality Scan&apos; to load sample certificate</p>
                  </div>
                )}

                {scanningState === "calibrating" && (
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-dashed border-nbigreen rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-mono text-nbicream">Adjusting optical sensor spectrums...</p>
                  </div>
                )}

                {scanningState === "oil-check" && (
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-solid border-white border-t-nbired rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-mono text-nbicream">Calculating volatile organic essential oil content...</p>
                  </div>
                )}

                {scanningState === "completed" && (
                  <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 relative overflow-hidden animate-scale-in">
                    {/* Laser scanning line effect */}
                    <div className="absolute left-0 right-0 h-0.5 bg-nbigreen shadow-[0_0_10px_#007a3e,0_0_20px_#007a3e] z-10 animate-laser-sweep" />
                    
                    <div className="absolute right-4 top-4 border-2 border-nbigreen text-nbigreen text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded rotate-12 select-none">
                      Passed - Export Grade
                    </div>
                    
                    <p className="text-xs font-bold text-nbigreen uppercase tracking-widest">
                      QC Specifications Analysis
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-nbicream/70">Parameter tested:</span>
                        <span className="font-bold text-white">{qcSpices[selectedSpice].name}</span>
                      </div>
                      
                      <div className="h-px bg-white/10 w-full" />
                      
                      <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                        <div>
                          <p className="text-nbicream/60">Metric</p>
                          <p className="font-bold text-white mt-1">Moisture</p>
                          <p className="font-bold text-white mt-0.5">Volatile Oils</p>
                          <p className="font-bold text-white mt-0.5">Purity</p>
                        </div>
                        <div>
                          <p className="text-nbicream/60">Target Limit</p>
                          <p className="text-nbicream/80 mt-1">{qcSpices[selectedSpice].moistureTarget}</p>
                          <p className="text-nbicream/80 mt-0.5">{qcSpices[selectedSpice].oilTarget}</p>
                          <p className="text-nbicream/80 mt-0.5">{qcSpices[selectedSpice].purityTarget}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-nbicream/60 text-right">Result</p>
                          <p className="text-nbigreen font-extrabold mt-1">{qcSpices[selectedSpice].moistureResult} ✓</p>
                          <p className="text-nbigreen font-extrabold mt-0.5">{qcSpices[selectedSpice].oilResult} ✓</p>
                          <p className="text-nbigreen font-extrabold mt-0.5">{qcSpices[selectedSpice].purityResult} ✓</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer specs details */}
              <div className="relative z-10 border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-nbicream/60">Batch Certification</p>
                  <p className="font-bold text-white mt-0.5">{qcSpices[selectedSpice].cert}</p>
                </div>
                <div className="text-right">
                  <p className="text-nbicream/60 text-right">QC Processing Lead</p>
                  <p className="font-bold text-white mt-0.5">{qcSpices[selectedSpice].leadTime}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============ TESTING STAGES TIMELINE ============ */}
      <section className="bg-nbicream/40 border-y border-nbigreen/10 texture-dots py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Five Steps of Vigilance</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-nbidark">Quality Sourcing Lifecycle</h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
              Our quality assurance is not an after-thought. It defines NBI operations from local soil checks to export customs clearing.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Timeline selector tabs */}
            <div className="md:col-span-5 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-3 md:pb-0 scrollbar-none shrink-0">
              {testingStages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`press text-left p-3.5 md:p-4 rounded-xl md:rounded-2xl border transition-all text-nbidark shrink-0 min-w-[180px] md:min-w-0 ${
                    activeStage === idx 
                      ? "bg-white border-nbigreen shadow-sm pl-5 md:pl-6 border-l-4 border-l-nbigreen" 
                      : "bg-white/40 md:bg-transparent border-transparent hover:bg-white/30 cursor-pointer"
                  }`}
                >
                  <p className="text-[10px] font-bold text-nbisand uppercase tracking-wider">{stage.subtitle}</p>
                  <h4 className="text-sm md:text-base font-extrabold mt-0.5">{stage.title}</h4>
                </button>
              ))}
            </div>

            {/* Timeline details output card */}
            <div className="md:col-span-7">
              <div key={activeStage} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm h-full flex flex-col justify-between animate-slide-up">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-nbigreen bg-nbigreen/10 px-2.5 py-1 rounded">
                    Stage {activeStage + 1} Audits
                  </span>
                  
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-nbidark">{testingStages[activeStage].title}</h3>
                    <p className="text-sm font-semibold text-nbisand uppercase tracking-wider mt-0.5">{testingStages[activeStage].subtitle}</p>
                  </div>
                  
                  <p className="font-serif text-base md:text-lg leading-relaxed text-nbicocoa pt-2">
                    {testingStages[activeStage].desc}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-nbisand mb-3">Critical Audited Checkpoints</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {testingStages[activeStage].details.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-semibold text-nbidark bg-gray-50 border border-gray-100 p-2.5 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-nbigreen shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROMISES GRILL BOARD ============ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-nbired">Our Standards</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-nbidark">The NBI Quality Code</h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
            We operate on a zero-shortcut philosophy. Click any standard below to inspect the compliance details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {promises.map((promise, index) => {
            const isHovered = activePromise === index;
            return (
              <div
                key={promise.title}
                onClick={() => setActivePromise(activePromise === index ? null : index)}
                onMouseEnter={() => setActivePromise(index)}
                onMouseLeave={() => setActivePromise(null)}
                className={`group relative rounded-3xl border p-6 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  isHovered 
                    ? "bg-nbidark text-white border-nbidark shadow-lg scale-[1.02]" 
                    : "bg-white text-nbidark border-gray-200 hover:border-nbigreen/30 shadow-sm"
                }`}
              >
                {/* Visual Glass Overlay Glow */}
                <div 
                  className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full blur-2xl transition-opacity duration-300 ${
                    isHovered ? "bg-nbigreen/20 opacity-100" : "bg-nbigreen/5 opacity-0"
                  }`} 
                />

                <div className="relative z-10 space-y-4">
                  <div className={`transition-colors duration-300 ${isHovered ? "text-nbired" : "text-nbigreen"}`}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-lg font-extrabold tracking-tight">
                    {promise.title}
                  </h3>
                  
                  <p className={`text-xs leading-relaxed transition-colors duration-300 ${
                    isHovered ? "text-nbicream/90" : "text-nbicocoa/80"
                  }`}>
                    {isHovered ? promise.detail : promise.body}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-current/10 relative z-10 flex items-center justify-between text-[9px] font-bold tracking-widest uppercase">
                  <span>{isHovered ? "Close details" : "Inspect specification"}</span>
                  <svg 
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
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
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Explore Our Certified Range</h2>
            <p className="mt-3 font-serif text-lg text-nbicream/90">
              Read how we mill our products to retain analytical values and aroma parameters.
            </p>
          </div>
          <Link
            href="/products"
            className="press shrink-0 inline-flex items-center gap-2 rounded-full bg-nbired px-7 py-3.5 font-bold text-white hover:bg-[#b82217] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white relative z-10"
          >
            See Our Spices
            <ArrowIcon />
          </Link>
        </div>
      </section>

    </div>
  );
}
