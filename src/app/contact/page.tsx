import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/site/reveal";
import { GridBackdrop } from "@/components/site/grid-backdrop";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Studio SMITE. Tell me about your business and get a straight answer on what your website needs and what it costs, usually within a day.",
};

const steps = [
  {
    title: "I read it myself",
    body: "Your message comes straight to me. There is no sales team and no call centre in between.",
  },
  {
    title: "You get an honest answer",
    body: "Usually within a day: whether I am the right fit, what I would suggest, and roughly what it costs.",
  },
  {
    title: "We agree the price",
    body: "A fixed price and a clear finish date, both settled before any work starts.",
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <GridBackdrop className="opacity-80" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Reveal y={16}>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-neon uppercase">
                <span aria-hidden className="h-px w-6 bg-neon/50" />
                Contact
              </span>
            </Reveal>

            <Reveal delay={0.06} y={20}>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl md:text-6xl">
                Let&apos;s build{" "}
                <span className="text-gradient-neon">something sharp</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={20}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                Tell me what you have in mind. You do not need to know any of
                the technical side, just what your business needs.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ol className="mt-10 space-y-6">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-neon/30 bg-neon/10 font-mono text-[11px] text-neon">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="font-display text-base font-medium">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-10 space-y-3 border-t border-white/8 pt-8">
                <div className="flex items-center gap-3 text-sm">
                  <dt className="sr-only">Email</dt>
                  <Mail className="size-4 shrink-0 text-neon" />
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-muted-foreground transition-colors hover:text-neon"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <dt className="sr-only">Location</dt>
                  <MapPin className="size-4 shrink-0 text-neon" />
                  <dd className="text-muted-foreground">{site.location}</dd>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <dt className="sr-only">Response time</dt>
                  <Clock className="size-4 shrink-0 text-neon" />
                  <dd className="text-muted-foreground">
                    Typical reply time: under 24 hours
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} scale>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
