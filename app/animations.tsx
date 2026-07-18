"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRELOADER_REVEAL } from "./preloader";

export default function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero entrance — timed to start as the preloader wipe reveals the page.
      // Content is never pre-hidden: if the intro doesn't run, the hero is simply visible.
      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: PRELOADER_REVEAL })
        .fromTo(".hero-item", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 });

      // Stat counters
      gsap.utils.toArray<HTMLElement>(".stat").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          delay: PRELOADER_REVEAL + 0.6,
          onUpdate: () => {
            el.textContent = Math.round(obj.n) + suffix;
          },
        });
      });

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

      // Marquees (two identical tracks rendered; shift half the strip for a seamless loop)
      gsap.to("#marquee", { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
      // Second row drifts the opposite way
      gsap.fromTo("#marquee-alt", { xPercent: -50 }, { xPercent: 0, duration: 30, ease: "none", repeat: -1 });

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

    // Pinned horizontal storyline — desktop + motion-OK only.
    // Below md (or with reduced motion) the chapters simply stack vertically via the default CSS.
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      if (panels.length < 2) return;
      const scrollLen = () => window.innerHeight * (panels.length - 1);
      gsap.to(".story-track", {
        xPercent: (-100 * (panels.length - 1)) / panels.length,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: () => "+=" + scrollLen(),
          // Pin the inner stage, not the section: GSAP's pin-spacer must not
          // re-parent a node React removes directly on route change.
          pin: ".story-stage",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.to(".story-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: () => "+=" + scrollLen(),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".reveal, .hero-item, section h2", { clearProps: "all", opacity: 1 });
      // Storyline falls back to a vertical stack — drop the horizontal layout classes
      document.querySelector(".story-track")?.classList.remove("md:flex-row", "md:w-max", "md:flex-1");
      document.querySelector(".story-stage")?.classList.remove("md:h-screen");
      gsap.utils
        .toArray<HTMLElement>(".story-panel")
        .forEach((p) => p.classList.remove("md:w-screen", "md:shrink-0", "md:flex", "md:items-center"));
    });

    return () => mm.revert();
  }, []);

  return null;
}
