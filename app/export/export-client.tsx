"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowIcon, CheckItem } from "../ui";

// ---------------- DATA STRUCTURES ----------------

const destinations = {
  qatar: {
    name: "Doha, Qatar",
    port: "Hamad Port",
    code: "QA-HMD",
    transitDays: 14,
    shippingLine: "Maersk / MSC Direct",
    customsNotes: "Requires Arabic-English bilingual labels, country of origin engraving/printing on bags, and Halal clearance certificates.",
    distributor: "ARCO Trading & Marketing Co WLL, Doha",
  },
  uae: {
    name: "Dubai, UAE",
    port: "Jebel Ali Port",
    code: "AE-JEA",
    transitDays: 10,
    shippingLine: "CMA CGM / Hapag-Lloyd",
    customsNotes: "Requires phytosanitary export certificate and certificate of origin. UAE Ministry of Climate Change compliance standards apply.",
    distributor: "Direct distributor partnership opportunities available",
  },
  ksa: {
    name: "Jeddah / Dammam, Saudi Arabia",
    port: "Jeddah Islamic Port",
    code: "SA-JED",
    transitDays: 18,
    shippingLine: "ONE Line / MSC",
    customsNotes: "Must comply with SFDA (Saudi Food & Drug Authority) labelling rules. Nutritional facts panels must include Arabic translations.",
    distributor: "Inquire for active region distributors",
  },
  europe: {
    name: "Rotterdam, Netherlands (Europe)",
    port: "Port of Rotterdam",
    code: "NL-RTM",
    transitDays: 26,
    shippingLine: "MSC / Cosco Shipping",
    customsNotes: "Strict compliance with EU maximum residue limits (MRLs) for pesticides. Full batch traceability reports required.",
    distributor: "Multi-market wholesale partners",
  },
  usa: {
    name: "New York, USA",
    port: "Port of New York & New Jersey",
    code: "US-NYC",
    transitDays: 32,
    shippingLine: "Maersk / CMA CGM",
    customsNotes: "Requires FDA prior notice filing, bioterrorism registration validation, and organic grade verification certificates where applicable.",
    distributor: "East coast grocery distributors",
  },
};


const volumes = {
  lcl: {
    name: "LCL (Less than Container Load)",
    desc: "Spices packed on standard sanitized ISPM-15 wooden pallets. Ideal for boutique importers or trial orders.",
    millingLead: "4-6 Days",
    packingFormat: "5kg - 25kg multi-layer kraft paper sacks or retail boxes.",
  },
  fcl20: {
    name: "20ft FCL (Full Container)",
    desc: "Full container load containing approximately 10 to 12 metric tons of mixed spices. Maximize volume value.",
    millingLead: "8-12 Days",
    packingFormat: "Bulk loading in woven sacks or master cartons on pallets.",
  },
  fcl40: {
    name: "40ft FCL (High-Cube Container)",
    desc: "Maximum export capacity containing up to 24 metric tons of spices. Economical shipping for major distributors.",
    millingLead: "14-18 Days",
    packingFormat: "Palletized master cartons with stretch wrapping & moisture absorbers.",
  },
};

type ExportStep = {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  detail: string;
  color: string;
  accent: string;
  metrics: { label: string; value: string }[];
  svg: React.ReactNode;
};

const exportSteps: ExportStep[] = [
  {
    step: "01",
    title: "Specification Align",
    subtitle: "Quality Benchmarking",
    desc: "Review mesh sizes, moisture parameters, and color values matching destination imports.",
    detail: "Our trade team reviews buyer specification sheets (EU Reg 2023/915, FDA GRAS, SFDA 1516), cross-referencing mesh grade (40–120 mesh), moisture caps (≤11%), and SHU/ASTA color values before any production slot is confirmed.",
    color: "#0a3920",
    accent: "#007a3e",
    metrics: [{ label: "Mesh Range", value: "40–120 mesh" }, { label: "Moisture Cap", value: "≤ 11%" }, { label: "SLA", value: "24 hrs" }],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="10" y="20" width="100" height="80" rx="8" fill="#deeede" />
        <rect x="20" y="30" width="80" height="10" rx="3" fill="#007a3e" opacity="0.3"/>
        <rect x="20" y="46" width="55" height="7" rx="3" fill="#0a3920" opacity="0.2"/>
        <rect x="20" y="58" width="70" height="7" rx="3" fill="#0a3920" opacity="0.15"/>
        <rect x="20" y="70" width="45" height="7" rx="3" fill="#0a3920" opacity="0.12"/>
        <circle cx="92" cy="72" r="20" fill="white" stroke="#007a3e" strokeWidth="3"/>
        <path d="M84 72 L90 78 L100 66" stroke="#007a3e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="92" cy="72" r="14" fill="none" stroke="#007a3e" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5"/>
        <line x1="108" y1="88" x2="116" y2="96" stroke="#007a3e" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: "02",
    title: "Custom Milling",
    subtitle: "Precision Processing",
    desc: "Spices ground to order under temperature controls to preserve essential volatile oils.",
    detail: "NBI's in-house impact mill and hammer-mill lines run at controlled sub-60°C temperatures. Real-time thermocouples log batch temperatures every 15 seconds. Each grinding run is batch-ID tagged with milling timestamp, RPM setting, and moisture post-grind readings.",
    color: "#5e887e",
    accent: "#d9291c",
    metrics: [{ label: "Mill Temp", value: "< 60 °C" }, { label: "Log Interval", value: "15 sec" }, { label: "Traceability", value: "Batch ID" }],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="60" r="34" fill="#f5f0eb" stroke="#d9291c" strokeWidth="2"/>
        <circle cx="60" cy="60" r="22" fill="none" stroke="#d9291c" strokeWidth="2" strokeDasharray="4 3" opacity="0.5"/>
        <circle cx="60" cy="60" r="8" fill="#d9291c" opacity="0.85"/>
        <line x1="60" y1="26" x2="60" y2="38" stroke="#0a3920" strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="82" x2="60" y2="94" stroke="#0a3920" strokeWidth="3" strokeLinecap="round"/>
        <line x1="26" y1="60" x2="38" y2="60" stroke="#0a3920" strokeWidth="3" strokeLinecap="round"/>
        <line x1="82" y1="60" x2="94" y2="60" stroke="#0a3920" strokeWidth="3" strokeLinecap="round"/>
        <line x1="36.3" y1="36.3" x2="44.5" y2="44.5" stroke="#0a3920" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="75.5" y1="75.5" x2="83.7" y2="83.7" stroke="#0a3920" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="83.7" y1="36.3" x2="75.5" y2="44.5" stroke="#0a3920" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="44.5" y1="75.5" x2="36.3" y2="83.7" stroke="#0a3920" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="52" y="12" width="16" height="10" rx="3" fill="#0a3920"/>
        <rect x="54" y="10" width="12" height="4" rx="2" fill="#5e887e"/>
      </svg>
    ),
  },
  {
    step: "03",
    title: "Packaging & Flush",
    subtitle: "Freshness Seal",
    desc: "Sealed in high-barrier bags with nitrogen gas replacement to extend freshness.",
    detail: "Filled in nitrogen-flushed 3-layer laminate pouches (BOPP/ALU/PE) under ≤5% residual O₂ atmosphere. Heat-sealed with inline seal-check sensors. Each pallet wrapped in stretch film with desiccant sachets, providing a moisture barrier rated ≥ 1.5 g/m²/day.",
    color: "#403638",
    accent: "#007a3e",
    metrics: [{ label: "O₂ Residual", value: "≤ 5%" }, { label: "Barrier", value: "1.5 g/m²/day" }, { label: "Layers", value: "3-ply laminate" }],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M30 35 Q30 25 40 25 L80 25 Q90 25 90 35 L90 95 Q90 105 80 105 L40 105 Q30 105 30 95 Z" fill="#deeede" stroke="#007a3e" strokeWidth="2"/>
        <path d="M30 35 L90 35" stroke="#007a3e" strokeWidth="2"/>
        <path d="M40 45 L80 45" stroke="#007a3e" strokeWidth="1.5" opacity="0.4"/>
        <path d="M40 55 L80 55" stroke="#007a3e" strokeWidth="1.5" opacity="0.3"/>
        <path d="M40 65 L80 65" stroke="#007a3e" strokeWidth="1.5" opacity="0.2"/>
        <rect x="44" y="75" width="32" height="16" rx="4" fill="#007a3e" opacity="0.85"/>
        <text x="60" y="87" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">NBI EXPORT</text>
        <circle cx="92" cy="38" r="10" fill="#007a3e"/>
        <path d="M88 38 Q92 32 96 38 Q92 44 88 38Z" fill="white" opacity="0.7"/>
        <line x1="92" y1="28" x2="92" y2="22" stroke="#007a3e" strokeWidth="2"/>
        <circle cx="92" cy="20" r="3" fill="#d9291c"/>
      </svg>
    ),
  },
  {
    step: "04",
    title: "Colombo Customs",
    subtitle: "Regulatory Clearance",
    desc: "Transit from Negama mill to Colombo Port. File all phytosanitary and origin papers.",
    detail: "NBI's licensed clearing agent files EX1 export declaration, Certificate of Origin (GSP Form A or EUR.1), phytosanitary certificate (NPPO-LK), and HACCP attestation at Colombo Port. Average customs dwell time: 18–24 hours.",
    color: "#0a3920",
    accent: "#d9291c",
    metrics: [{ label: "Port", value: "Colombo CMB" }, { label: "Dwell Time", value: "18–24 hrs" }, { label: "Cert", value: "GSP Form A" }],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="15" y="55" width="90" height="40" rx="6" fill="#deeede" stroke="#0a3920" strokeWidth="2"/>
        <rect x="15" y="55" width="90" height="14" rx="6" fill="#0a3920"/>
        <path d="M15 62 L105 62" stroke="#0a3920" strokeWidth="0"/>
        <rect x="25" y="72" width="18" height="14" rx="3" fill="white" stroke="#d9291c" strokeWidth="1.5"/>
        <rect x="50" y="72" width="18" height="14" rx="3" fill="white" stroke="#d9291c" strokeWidth="1.5"/>
        <rect x="75" y="72" width="18" height="14" rx="3" fill="white" stroke="#d9291c" strokeWidth="1.5"/>
        <circle cx="34" cy="45" r="12" fill="none" stroke="#d9291c" strokeWidth="2"/>
        <path d="M30 45 L33 48 L40 41" stroke="#d9291c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M34 33 L34 30" stroke="#d9291c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M34 60 L34 57" stroke="#d9291c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M46 45 L49 45" stroke="#d9291c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 45 L19 45" stroke="#d9291c" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="34" cy="45" r="4" fill="#d9291c" opacity="0.15"/>
        <rect x="72" y="20" width="28" height="30" rx="4" fill="white" stroke="#0a3920" strokeWidth="1.5"/>
        <rect x="76" y="25" width="20" height="3" rx="1.5" fill="#0a3920" opacity="0.3"/>
        <rect x="76" y="31" width="14" height="3" rx="1.5" fill="#0a3920" opacity="0.2"/>
        <rect x="76" y="37" width="17" height="3" rx="1.5" fill="#0a3920" opacity="0.2"/>
        <path d="M76 44 L80 47 L86 41" stroke="#007a3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: "05",
    title: "Sea Freight",
    subtitle: "Global Delivery",
    desc: "Sailed in climate-monitored dry cargo containers with moisture traps.",
    detail: "20′ and 40′ ISO dry containers fitted with Escortis IoT dataloggers track temperature (−2 to +38°C), humidity (40–70% RH), and shock events. NBI coordinates with Evergreen, MSC, and CMA CGM feeder services from Colombo to gateway ports in Jebel Ali, Hamburg, and Los Angeles.",
    color: "#5e887e",
    accent: "#007a3e",
    metrics: [{ label: "Humidity", value: "40–70% RH" }, { label: "Carriers", value: "MSC / Evergreen" }, { label: "Routes", value: "UAE · EU · USA" }],
    svg: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M10 75 Q30 65 50 70 Q70 75 90 65 Q105 58 115 65 L115 90 Q105 85 90 90 Q70 97 50 92 Q30 87 10 95 Z" fill="#deeede" opacity="0.6"/>
        <path d="M10 80 Q30 70 50 75 Q70 80 90 70 Q105 63 115 70" stroke="#007a3e" strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity="0.5"/>
        <rect x="22" y="50" width="50" height="25" rx="4" fill="#0a3920"/>
        <rect x="26" y="54" width="14" height="17" rx="2" fill="#007a3e" opacity="0.6"/>
        <rect x="43" y="54" width="14" height="17" rx="2" fill="#007a3e" opacity="0.6"/>
        <rect x="60" y="54" width="8" height="17" rx="2" fill="#007a3e" opacity="0.4"/>
        <rect x="18" y="74" width="60" height="5" rx="2" fill="#5e887e"/>
        <path d="M78 70 L90 58 L90 74 Z" fill="#d9291c" opacity="0.8"/>
        <circle cx="28" cy="80" r="5" fill="#0a3920" stroke="#deeede" strokeWidth="1.5"/>
        <circle cx="68" cy="80" r="5" fill="#0a3920" stroke="#deeede" strokeWidth="1.5"/>
        <line x1="10" y1="90" x2="115" y2="90" stroke="#007a3e" strokeWidth="2" opacity="0.3"/>
      </svg>
    ),
  },
];

export default function ExportClient() {
  const [selectedDest, setSelectedDest] = useState<keyof typeof destinations>("qatar");
  const [selectedVol, setSelectedVol] = useState<keyof typeof volumes>("lcl");
  const [activeStep, setActiveStep] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const handleLoad = () => {
        iframe.contentWindow?.postMessage({ action: "setRoute", destination: selectedDest }, "*");
      };
      iframe.addEventListener("load", handleLoad);
      iframe.contentWindow?.postMessage({ action: "setRoute", destination: selectedDest }, "*");
      return () => {
        iframe.removeEventListener("load", handleLoad);
      };
    }
  }, [selectedDest]);

  const transitDays = destinations[selectedDest].transitDays;
  const millingLead = volumes[selectedVol].millingLead;
  const docsList = [
    "Bill of Lading (B/L)",
    "Commercial Invoice",
    "Packing List (Palletized details)",
    "Phytosanitary Certificate (Govt. of Sri Lanka)",
    "Certificate of Sourcing Origin (Form A)",
    "Laboratory Analysis Report (Moisture/Purity)",
    selectedDest === "ksa" || selectedDest === "qatar" ? "Halal Compliance Seal" : "Traceability Batch Log"
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* ============ SHIPPING LEAD-TIME CALCULATOR ============ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid md:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Selector Controls */}
          <div className="md:col-span-5 flex flex-col justify-between bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Logistics Engine</span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-nbidark mt-1">Export Calculator</h2>
                <p className="text-sm text-nbicocoa/80 leading-relaxed mt-2">
                  Select your port destination and expected shipment volume to review logistics lead times and required documentation.
                </p>
              </div>

              {/* Destination Dropdown */}
              <div className="space-y-2">
                <label htmlFor="destination-select" className="text-xs font-bold uppercase tracking-wider text-nbisand block">
                  1. Port of Destination
                </label>
                <select
                  id="destination-select"
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value as keyof typeof destinations)}
                  className="press w-full p-4 rounded-xl border border-gray-200 bg-gray-50 text-sm font-bold text-nbidark focus:outline-none focus:ring-2 focus:ring-nbigreen cursor-pointer"
                >
                  {Object.entries(destinations).map(([key, dest]) => (
                    <option key={key} value={key}>
                      {dest.name} ({dest.port.split(" ")[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Volume Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-nbisand block">
                  2. Order Volume
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(volumes).map(([key, vol]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedVol(key as keyof typeof volumes)}
                      className={`press text-left p-4 rounded-xl border font-bold text-xs flex justify-between items-center transition-all ${
                        selectedVol === key
                          ? "bg-nbidark text-white border-nbidark shadow-md"
                          : "bg-gray-50 border-gray-200 text-nbidark hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      <span>{vol.name}</span>
                      <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded ${
                        selectedVol === key ? "bg-white/20 text-white" : "bg-gray-200 text-nbisand"
                      }`}>
                        {vol.millingLead} Lead
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-nbisand mt-8 border-t border-gray-100 pt-4 font-semibold">
              * Note: Milling lead represents processing time in Negama prior to Colombo port loading.
            </p>
          </div>

          {/* Column 2: Interactive Display Dashboard */}
          <div className="md:col-span-7">
            <div className="bg-nbidark text-white rounded-3xl p-6 md:p-8 shadow-xl h-full flex flex-col justify-between relative overflow-hidden min-h-[480px]">
              
              {/* Background gradient flare */}
              <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-nbigreen/25 blur-3xl pointer-events-none" />
              
              {/* Header metrics */}
              <div className="relative z-10 grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-nbigreen">Ocean Transit Time</p>
                  <p className="text-3xl font-black text-white mt-1">
                    {transitDays} <span className="text-lg font-bold">Days</span>
                  </p>
                  <p className="text-xs text-nbicream/70 mt-1">{destinations[selectedDest].shippingLine}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-nbired">Milling &amp; Packing</p>
                  <p className="text-3xl font-black text-white mt-1">
                    {millingLead}
                  </p>
                  <p className="text-xs text-nbicream/70 mt-1">Negama Spiceworks</p>
                </div>
              </div>

              {/* Dynamic Details Output */}
              <div className="relative z-10 my-6 space-y-5">
                <div>
                  <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-nbigreen" />
                    {destinations[selectedDest].port}
                  </h3>
                  <p className="text-xs text-nbicream/90 mt-1 font-serif leading-relaxed">
                    {destinations[selectedDest].customsNotes}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <h4 className="text-xs font-bold text-nbigreen uppercase tracking-widest mb-2">Volume details</h4>
                  <p className="text-xs text-nbicream/90 leading-relaxed font-sans">{volumes[selectedVol].desc}</p>
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-[10px] font-semibold text-nbicream/70">
                    <p>Format: <span className="text-white font-bold">{volumes[selectedVol].packingFormat}</span></p>
                    <p className="text-right">FOB Point: <span className="text-white font-bold">Colombo Port</span></p>
                  </div>
                </div>
              </div>

              {/* Documentation Checklist */}
              <div className="relative z-10 border-t border-white/10 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-nbisand mb-3">Required Documents Folder</p>
                <div className="flex flex-wrap gap-2">
                  {docsList.map((doc) => (
                    <span
                      key={doc}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-bold text-nbicream"
                    >
                      <svg className="w-3 h-3 text-nbigreen" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============ MAP SHIPPING PATHS ============ */}
      <section className="bg-nbicream/40 border-y border-nbigreen/10 texture-dots py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nbigreen">Ocean Freight Connectivity</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-nbidark">Sea Routes from Colombo Port</h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
              Sri Lanka is positioned at the intersection of main East-West sea lanes. We ship via premium shipping lines for maximum route speed and humidity controls.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl bg-white rounded-3xl border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col md:flex-row gap-8 items-stretch min-h-[320px] md:min-h-[380px]">
            
            {/* Embedded Live Leaflet Map Canvas */}
            <div className="w-full md:w-3/5 aspect-[16/10] relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 h-[300px] md:h-auto min-h-[250px] shadow-inner">
              <iframe
                ref={iframeRef}
                title="Global Shipping Destination Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="/export-map.html"
              />
            </div>

            {/* Quick Port Guide */}
            <div key={selectedDest} className="w-full md:w-2/5 flex flex-col justify-between space-y-6 gap-6 md:gap-0 animate-slide-up">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-nbired bg-nbired/10 px-2.5 py-1 rounded-full inline-block">
                    Live Port Mapping
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-nbidark">{destinations[selectedDest].name}</h3>
                </div>

                {/* Micro Logistics Dashboard */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                    <span className="text-[10px] font-bold text-nbisand uppercase tracking-wider block">Port Code</span>
                    <span className="text-xs font-extrabold text-nbidark mt-0.5 block truncate">{destinations[selectedDest].code}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                    <span className="text-[10px] font-bold text-nbisand uppercase tracking-wider block">Ocean Route</span>
                    <span className="text-xs font-extrabold text-nbidark mt-0.5 block truncate">{destinations[selectedDest].shippingLine}</span>
                  </div>
                </div>

                {/* Local Logistics Banner */}
                <div className="bg-nbigreen/5 border border-nbigreen/15 rounded-xl p-3.5 flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-nbigreen shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l6-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-nbigreen uppercase tracking-wider block">Logistics Handshake</span>
                    <p className="text-xs font-serif leading-relaxed text-nbicocoa">
                      {selectedDest === "qatar"
                        ? "Hamad Port deliveries are managed locally by our exclusive distribution partner, ARCO Trading."
                        : destinations[selectedDest].customsNotes}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Segmented Tabs Selector */}
              <div className="space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-nbisand block">
                  Select Destination Region
                </span>
                <div className="flex flex-wrap gap-1 bg-gray-100/70 border border-gray-200/50 p-1 rounded-xl">
                  {Object.entries(destinations).map(([key]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedDest(key as keyof typeof destinations)}
                      className={`press flex-1 min-w-[70px] text-[10px] font-bold uppercase py-2 px-1 rounded-lg text-center cursor-pointer transition-all duration-200 ${
                        selectedDest === key
                          ? "bg-nbidark text-white shadow-sm"
                          : "text-nbisand hover:text-nbidark hover:bg-gray-200/30"
                      }`}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ EXPORT WORKFLOW STEPS ============ */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-nbired">From Agreement to Shipment</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-nbidark mt-2">The NBI Export Protocol</h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
            Five precision stages, spanning from specification alignment to container sealing, ensuring your import arrives compliant, fresh, and on-spec.
          </p>
        </div>

        {/* Step Selector Row with Connector Line */}
        <div className="relative mb-10">
          {/* Horizontal connector */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />
          <div
            className="hidden lg:block absolute top-[52px] h-0.5 bg-nbigreen z-0 transition-all duration-500 ease-out"
            style={{ left: "10%", width: `${(activeStep / (exportSteps.length - 1)) * 80}%` }}
          />

          <div className="grid grid-cols-5 gap-2 relative z-10">
            {exportSteps.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`press flex flex-col items-center gap-2 group cursor-pointer`}
              >
                {/* Icon bubble */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 border-2 ${
                    activeStep === idx
                      ? "scale-110 border-nbigreen shadow-nbigreen/30 shadow-lg"
                      : "border-gray-200 bg-white hover:border-nbigreen/40 hover:scale-105"
                  }`}
                  style={{ background: activeStep === idx ? step.color : "white" }}
                >
                  <div className={`w-9 h-9 transition-all duration-300 ${activeStep === idx ? "opacity-100" : "opacity-70"}`}>
                    {step.svg}
                  </div>
                </div>
                {/* Step label */}
                <div className="text-center">
                  <span className={`block text-[9px] font-bold uppercase tracking-widest transition-colors ${activeStep === idx ? "text-nbigreen" : "text-nbisand"}`}>
                    Step {step.step}
                  </span>
                  <span className={`block text-[11px] font-extrabold leading-tight transition-colors ${activeStep === idx ? "text-nbidark" : "text-nbicocoa/70"}`}>
                    {step.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Expanded Detail Panel */}
        <div
          key={activeStep}
          className="animate-fade-in rounded-3xl overflow-hidden shadow-xl border border-gray-100 grid md:grid-cols-2"
        >
          {/* Left: SVG Illustration */}
          <div
            className="relative flex items-center justify-center p-10 min-h-[280px]"
            style={{ background: `${exportSteps[activeStep].color}` }}
          >
            {/* Subtle grid lines */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(255,255,255,.2) 30px,rgba(255,255,255,.2) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(255,255,255,.2) 30px,rgba(255,255,255,.2) 31px)" }}
            />
            <div className="relative w-44 h-44 drop-shadow-2xl">
              {exportSteps[activeStep].svg}
            </div>
            {/* Step badge */}
            <div className="absolute top-5 left-5 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 backdrop-blur-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Step {exportSteps[activeStep].step}</span>
            </div>
            {/* Metrics row at bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex">
              {exportSteps[activeStep].metrics.map((m) => (
                <div key={m.label} className="flex-1 border-t border-r last:border-r-0 border-white/10 bg-black/20 backdrop-blur-sm px-3 py-2 text-center">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/50">{m.label}</p>
                  <p className="text-sm font-extrabold text-white mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text Detail */}
          <div className="bg-white p-8 md:p-10 flex flex-col justify-between">
            <div>
              <span
                className="inline-block text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full mb-4"
                style={{ background: `${exportSteps[activeStep].accent}18`, color: exportSteps[activeStep].accent }}
              >
                {exportSteps[activeStep].subtitle}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-nbidark">
                {exportSteps[activeStep].title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-nbisand">{exportSteps[activeStep].desc}</p>
              <p className="mt-4 text-sm leading-relaxed text-nbicocoa font-serif">
                {exportSteps[activeStep].detail}
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="press flex items-center gap-2 text-xs font-bold text-nbisand hover:text-nbidark disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Previous
              </button>
              <div className="flex gap-1.5">
                {exportSteps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`press w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === activeStep ? "bg-nbigreen w-5" : "bg-gray-300 hover:bg-gray-400"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveStep(Math.min(exportSteps.length - 1, activeStep + 1))}
                disabled={activeStep === exportSteps.length - 1}
                className="press flex items-center gap-2 text-xs font-bold text-nbisand hover:text-nbidark disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                Next
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile step pills */}
        <div className="flex lg:hidden flex-wrap gap-2 mt-6 justify-center">
          {exportSteps.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`press px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                activeStep === idx ? "bg-nbidark text-white border-nbidark" : "bg-white text-nbicocoa border-gray-200 hover:border-nbigreen/40"
              }`}
            >
              {step.step}. {step.title}
            </button>
          ))}
        </div>
      </section>

      {/* ============ SERVICE CHANNELS CARD BOARD ============ */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="rounded-3xl bg-nbidark text-white p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-nbigreen/25 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#7BC9A0" }}>Partnerships</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-2">Customized Packing &amp; Private Label</h2>
              <p className="mt-6 font-serif text-lg leading-relaxed text-nbicream/90">
                NBI offers robust packaging configurations for import buyers, ranging from retail pouches, jars, and kraft bags with custom bilingual artwork to standard 25kg bulk woven export sacks.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                <CheckItem iconClass="text-[#7BC9A0]">FDA, SFDA &amp; EU specification matching</CheckItem>
                <CheckItem iconClass="text-[#7BC9A0]">English-Arabic label layouts and nutritional values</CheckItem>
                <CheckItem iconClass="text-[#7BC9A0]">Private label packaging formats and barcodes</CheckItem>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-5">
              <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Initiate Export Inquiry</h3>
              <p className="text-xs text-nbicream/80 leading-relaxed">
                Connect with our trade desk to request specifications, quotes, and sample packs delivered directly to your logistics office.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="press w-full inline-flex items-center justify-center gap-2 rounded-xl bg-nbired py-3.5 text-sm font-bold text-white hover:bg-[#b82217]"
                >
                  Contact Trade Desk
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
