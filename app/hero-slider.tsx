"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export type Slide = { src: StaticImageData | string; alt: string };

const INTERVAL = 2500;

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((v) => (v + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="hero-bg absolute inset-0">
      {slides.map((s, i) => (
        <Image
          key={typeof s.src === "string" ? s.src : s.src.src}
          src={s.src}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
          placeholder={typeof s.src === "string" ? undefined : "blur"}
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
