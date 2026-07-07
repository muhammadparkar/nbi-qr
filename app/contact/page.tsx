import type { Metadata } from "next";
import ContactForm from "../contact-form";
import { DotsMark, PageHero } from "../ui";

export const metadata: Metadata = {
  title: "Contact | NBI (PVT) LTD — New Badriya Industries",
  description:
    "Contact NBI (PVT) LTD — New Badriya Industries, Negama, Anuradhapura District, Sri Lanka. Email info@nbiholding.com.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Let's trade in authentic flavor"
        title="Contact"
        sub="Wholesale orders, export inquiries, or custom spice blends — our team responds promptly."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">NBI (PVT) LTD — New Badriya Industries</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-nbisand">Address</dt>
                <dd className="mt-1 font-semibold text-nbidark">Negama, Anuradhapura District, Sri Lanka</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-nbisand">Founder</dt>
                <dd className="mt-1 font-semibold text-nbidark">Abdul Hameed Salahudeen</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-nbisand">Email</dt>
                <dd className="mt-1">
                  <a
                    href="mailto:info@nbiholding.com"
                    className="font-semibold text-nbigreen hover:text-nbidark underline underline-offset-4 decoration-nbigreen/40 transition-colors duration-200 cursor-pointer"
                  >
                    info@nbiholding.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-nbisand">Website</dt>
                <dd className="mt-1">
                  <a
                    href="https://www.nbiholding.com"
                    target="_blank"
                    rel="noopener"
                    className="font-semibold text-nbigreen hover:text-nbidark underline underline-offset-4 decoration-nbigreen/40 transition-colors duration-200 cursor-pointer"
                  >
                    www.nbiholding.com
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 rounded-3xl bg-nbidark text-white p-8">
              <div className="flex items-center gap-3">
                <DotsMark className="w-6 h-6 text-nbigreen" />
                <h3 className="font-extrabold tracking-tight">Our Promise</h3>
              </div>
              <p className="mt-4 font-serif italic text-lg text-nbicream leading-relaxed">
                Authentic Sri Lankan Spices Since 1987
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-nbicream/70">
                Pure Quality · Authentic Flavour · Trusted Worldwide
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-nbired p-2 sm:p-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
