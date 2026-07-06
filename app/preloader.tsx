"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** When the wipe starts revealing the page (seconds) — hero intro is timed against this. */
export const PRELOADER_REVEAL = 2.1;

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => setDone(true),
        })
        .from(".pl-dot", {
          scale: 0.3,
          opacity: 0,
          transformOrigin: "center center",
          duration: 0.5,
          ease: "back.out(2)",
          stagger: 0.12,
        })
        .to(".pl-mark", { rotation: 90, duration: 0.6, ease: "power2.inOut" }, "-=0.1")
        .from(".pl-text", { y: 16, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.3")
        .to(".pl-logo", { scale: 0.94, opacity: 0.9, duration: 0.35, ease: "power2.in" }, "+=0.45")
        .to(ref.current, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "<");
    }, ref);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[100] bg-nbidark flex items-center justify-center" aria-hidden="true">
      <div className="pl-logo flex flex-col items-center gap-5">
        <svg viewBox="0 0 24 24" className="pl-mark w-20 h-20">
          <circle className="pl-dot" cx="12" cy="5.5" r="4" fill="#007A3E" />
          <circle className="pl-dot" cx="18.5" cy="12" r="4" fill="#007A3E" />
          <circle className="pl-dot" cx="12" cy="18.5" r="4" fill="#007A3E" />
          <circle className="pl-dot" cx="5.5" cy="12" r="4" fill="#007A3E" />
        </svg>
        <div className="pl-text text-center leading-none">
          <p className="font-extrabold tracking-tight text-3xl text-white">NBI</p>
          <p className="mt-2 text-[10px] tracking-[0.35em] uppercase text-nbicream/70">Since 1987</p>
        </div>
      </div>
    </div>
  );
}
