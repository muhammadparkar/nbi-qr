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

const exportSteps = [
  {
    title: "1. Specification Align",
    desc: "Review mesh sizes, moisture parameters, and color values matching destination imports.",
  },
  {
    title: "2. Custom Milling",
    desc: "Spices ground to order under temperature controls to preserve essential volatile oils.",
  },
  {
    title: "3. Packaging & Flushes",
    desc: "Sealed in high-barrier bags with nitrogen gas replacement to extend freshness.",
  },
  {
    title: "4. Colombo Customs",
    desc: "Transit from Negama mill to Colombo Port. File all phytosanitary and origin papers.",
  },
  {
    title: "5. Sea Freight",
    desc: "Sailed in climate-monitored dry cargo containers with moisture traps.",
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
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-nbired">From Agreement to Shipment</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-nbidark">The NBI Export Protocol</h2>
          <p className="mt-4 font-serif text-lg leading-relaxed text-nbicocoa">
            How we ensure batch qualities and import alignment at every step of the logistics pipeline:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {exportSteps.map((step, idx) => (
            <div
              key={step.title}
              onClick={() => setActiveStep(idx)}
              className={`press p-6 rounded-2xl border transition-all min-h-[160px] flex flex-col justify-between cursor-pointer ${
                activeStep === idx
                  ? "bg-nbidark text-white border-nbidark shadow-md"
                  : "bg-white border-gray-200 text-nbidark hover:bg-gray-50"
              }`}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-nbisand block">Step 0{idx + 1}</span>
                <h4 className="text-sm font-extrabold">{step.title}</h4>
              </div>
              <p className={`text-xs leading-relaxed transition-colors ${
                activeStep === idx ? "text-nbicream/80" : "text-nbicocoa/80"
              }`}>
                {step.desc}
              </p>
            </div>
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
                NBI offers robust packaging configurations for import buyers—ranging from retail pouches, jars, and kraft bags with custom bilingual artwork to standard 25kg bulk woven export sacks.
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
