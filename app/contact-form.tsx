"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="reveal rounded-2xl bg-white p-6 md:p-8 text-nbidark"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        e.currentTarget.reset();
      }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="f-name" className="block text-sm font-bold">
            Name
          </label>
          <input
            id="f-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nbigreen focus:border-nbigreen"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="f-email" className="block text-sm font-bold">
            Email
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nbigreen focus:border-nbigreen"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="f-msg" className="block text-sm font-bold">
            Inquiry
          </label>
          <textarea
            id="f-msg"
            name="message"
            rows={3}
            required
            className="mt-1.5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-nbigreen focus:border-nbigreen"
            placeholder="Products, quantities, destination market…"
          />
        </div>
        <button
          type="submit"
          className="press w-full rounded-xl bg-nbigreen px-6 py-3 font-bold text-white hover:bg-[#00602f] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-nbigreen focus-visible:ring-offset-2"
        >
          Send Inquiry
        </button>
        {sent && (
          <p className="text-sm font-semibold text-nbigreen" role="status">
            Thank you — your inquiry has been noted. We&apos;ll be in touch.
          </p>
        )}
      </div>
    </form>
  );
}
