"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";

export type FloatingItem = {
  src: StaticImageData;
  alt: string;
  /** Higher depth = stronger drift toward the cursor */
  depth: number;
  /** Positioning classes for the wrapper (absolute coords, visibility) */
  className: string;
  /** Card look: size, rotation */
  cardClassName: string;
};

const EASING = 0.05;

export default function FloatingProducts({ items }: { items: FloatingItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = containerRef.current;
    if (!container) return;

    const mouse = { x: 0, y: 0 };
    const positions = items.map(() => ({ x: 0, y: 0 }));

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      mouse.x = e.clientX - (r.left + r.width / 2);
      mouse.y = e.clientY - (r.top + r.height / 2);
    };
    window.addEventListener("pointermove", onMove);

    let raf = 0;
    const tick = () => {
      elRefs.current.forEach((el, i) => {
        if (!el) return;
        const strength = items[i].depth / 20;
        const pos = positions[i];
        pos.x += (mouse.x * strength - pos.x) * EASING;
        pos.y += (mouse.y * strength - pos.y) * EASING;
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={item.alt}
          ref={(el) => {
            elRefs.current[i] = el;
          }}
          className={`absolute will-change-transform ${item.className}`}
        >
          <div className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl ${item.cardClassName}`}>
            <Image src={item.src} alt="" fill sizes="16rem" placeholder="blur" className="object-cover object-center" />
          </div>
        </div>
      ))}
    </div>
  );
}
