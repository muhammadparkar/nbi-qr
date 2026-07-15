"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PhoneLink } from "./ui";

type NavLink = { href: string; label: string };

export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="press flex items-center justify-center w-11 h-11 -mr-1 rounded-xl text-nbidark hover:bg-gray-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbigreen"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      <div
        className={`absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg p-2 origin-top transition-[transform,opacity] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          open
            ? "duration-200 opacity-100 scale-100"
            : "duration-150 pointer-events-none opacity-0 scale-[0.97]"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="block rounded-xl px-4 py-3 font-semibold text-nbidark hover:bg-nbicream/50 transition-colors duration-200 cursor-pointer"
          >
            {l.label}
          </Link>
        ))}
        <PhoneLink className="justify-center rounded-xl px-4 py-3 hover:bg-nbicream/50" />
      </div>
    </div>
  );
}
