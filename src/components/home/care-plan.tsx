import { ArrowUpRight, Check, RefreshCw, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";

const included = [
  {
    icon: Server,
    title: "Hosting, sorted",
    body: "Getting your site online and keeping it there is handled for you. Nothing to set up, and no renewals to remember.",
  },
  {
    icon: RefreshCw,
    title: "Updates and small changes",
    body: "Security updates, plus the small text and photo changes that come up during the year. Just send them over.",
  },
  {
    icon: ShieldCheck,
    title: "Kept working",
    body: "If something breaks, I fix it. Your site stays online, quick and doing its job all year round.",
  },
];

export function CarePlan() {
  return (
    <section id="care" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Aftercare"
          title={
            <>
              Built once, looked after{" "}
              <span className="text-gradient-neon">every year</span>.
            </>
          }
          description="A website that is online still needs somewhere to live, the odd update, and someone to call when something goes wrong. One yearly fee covers all of it, so you never have to think about it."
        />

        <Reveal className="mt-14" scale>
          <SpotlightCard lift={false}>
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
              <div className="flex flex-col">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neon/30 bg-neon/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-neon uppercase">
                  Care plan
                </span>

                <div className="mt-6 flex items-end gap-3">
                  <span className="font-display text-6xl leading-none font-bold tracking-tight sm:text-7xl">
                    <span className="text-gradient-neon">€475</span>
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">
                    / year
                  </span>
                </div>

                <p className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
                  <span className="text-muted-foreground line-through decoration-muted-foreground/50">
                    €650 per year
                  </span>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-emerald-400 uppercase">
                    Discounted rate
                  </span>
                </p>

                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  One invoice a year, covering everything listed here. No hourly
                  billing, no surprise extras, and no charge for small changes.
                </p>

                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:bg-neon/20 hover:shadow-[0_0_32px_-8px_var(--neon)]"
                  >
                    Ask about the care plan
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:border-l lg:border-white/8 lg:pl-14">
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  What it covers
                </h3>

                <ul className="mt-6 space-y-6">
                  {included.map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-neon/20 bg-neon/10 text-neon">
                        <item.icon className="size-[18px]" />
                      </span>
                      <div>
                        <h4 className="flex items-center gap-2 font-display text-base font-medium">
                          <Check
                            aria-hidden
                            className="size-4 text-emerald-400"
                            strokeWidth={2.5}
                          />
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
