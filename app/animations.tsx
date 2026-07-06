"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero entrance timeline
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-item", { y: 40, opacity: 0, duration: 0.8, stagger: 0.12 });

      // Parallax hero background (scaled up so the shift never exposes edges)
      gsap.fromTo(
        ".hero-bg",
        { scale: 1.08, yPercent: 0 },
        {
          yPercent: 8,
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: 1 },
        }
      );

      // Stat counters
      gsap.utils.toArray<HTMLElement>(".stat").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          delay: 0.6,
          onUpdate: () => {
            el.textContent = Math.round(obj.n) + suffix;
          },
        });
      });

      // Marquee (two identical tracks rendered; shift half the strip for a seamless loop)
      gsap.to("#marquee", { xPercent: -50, duration: 26, ease: "none", repeat: -1 });

      // Scroll reveals (staggered per section batch)
      ScrollTrigger.batch(".reveal", {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.12 }
          ),
      });
      gsap.set(".reveal", { opacity: 0 });
      ScrollTrigger.refresh();

      // Journey timeline spine draws in as the story scrolls
      gsap.fromTo(
        ".journey-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: { trigger: "#journey", start: "top 60%", end: "bottom 85%", scrub: 1 },
        }
      );

      // Section headline drift
      gsap.utils.toArray<Element>("section h2").forEach((h) => {
        gsap.from(h, {
          x: -24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: h, start: "top 88%", once: true },
        });
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".reveal, .hero-item, .hero-badge, section h2", { clearProps: "all", opacity: 1 });
    });

    return () => mm.revert();
  }, []);

  return null;
}
