import { ArrowUpRight, Check, Euro, Gift, Server } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { plans, prepayOffer } from "@/lib/site";

const [care, hosting] = plans;

const careIncludes = [
  "30% off the price of building your website",
  "Hosting and domain arranged and managed for you",
  "Security updates, plus the small text and photo changes that come up",
  "If something breaks, I fix it, at no extra cost",
];

const hostingIncludes = ["Your website is hosted and stays online"];
const hostingExtras = [
  "Something breaks and needs fixing",
  "Changes to text, photos or pages",
];

/** The two rows that make the trade-off between the options readable at a glance. */
function CostSplit({
  upfront,
  yearly,
  tone,
}: {
  upfront: string;
  yearly: string;
  tone: "care" | "hosting";
}) {
  return (
    <dl className="mt-6 overflow-hidden rounded-xl border border-white/8 bg-black/25">
      <div className="flex items-baseline justify-between gap-4 border-b border-white/8 px-4 py-3">
        <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          To build it
        </dt>
        <dd
          className={
            tone === "care"
              ? "text-sm font-medium text-emerald-400"
              : "text-sm font-medium text-foreground"
          }
        >
          {upfront}
        </dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 px-4 py-3">
        <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Every year after
        </dt>
        <dd
          className={
            tone === "hosting"
              ? "text-sm font-medium text-emerald-400"
              : "text-sm font-medium text-foreground"
          }
        >
          {yearly}
        </dd>
      </div>
    </dl>
  );
}

export function Aftercare() {
  return (
    <section id="aftercare" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Aftercare"
          title={
            <>
              Built once, then{" "}
              <span className="text-gradient-neon">kept running</span>.
            </>
          }
          description="Two ways to do this, and the difference is simply when you pay. Take the care package and building the site costs less, but you pay a bit more each year. Take hosting only and the build costs full price, but the years after are as cheap as they get."
        />

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-2">
          {/* Care package */}
          <Reveal scale>
            <SpotlightCard className="h-full border-neon/25" lift={false}>
              <div className="flex h-full flex-col p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-neon/30 bg-neon/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-neon uppercase">
                    {care.name}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-emerald-400 uppercase">
                    Most chosen
                  </span>
                </div>

                <p className="mt-6 font-display text-lg font-medium">
                  Cheapest way to get started.
                </p>

                <div className="mt-4 flex items-end gap-3">
                  <span className="font-display text-5xl leading-none font-bold tracking-tight sm:text-6xl">
                    <span className="text-gradient-neon">{care.price}</span>
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">
                    {care.period}
                  </span>
                </div>

                <p className="mt-3 flex flex-wrap items-center gap-2.5 text-sm">
                  <span className="text-muted-foreground line-through decoration-muted-foreground/50">
                    {care.standardPrice} {care.period}
                  </span>
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] text-emerald-400 uppercase">
                    Discounted rate
                  </span>
                </p>

                <CostSplit
                  tone="care"
                  upfront={care.upfront}
                  yearly={`${care.price} ${care.period}`}
                />

                <ul className="mt-7 space-y-3.5">
                  {careIncludes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-emerald-400"
                        strokeWidth={2.5}
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex gap-3.5 rounded-xl border border-neon/25 bg-neon/[0.07] p-4">
                  <Gift
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-neon"
                  />
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium">{prepayOffer.headline}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {prepayOffer.years} years at {care.price} comes to{" "}
                      {prepayOffer.total}, and building the website costs you
                      nothing on top of that.
                    </span>
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:bg-neon/20 hover:shadow-[0_0_32px_-8px_var(--neon)]"
                  >
                    Ask about the care package
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Hosting only */}
          <Reveal delay={0.1} scale>
            <SpotlightCard className="h-full" lift={false}>
              <div className="flex h-full flex-col p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    <Server className="size-3" />
                    {hosting.name}
                  </span>
                </div>

                <p className="mt-6 font-display text-lg font-medium">
                  Cheapest to keep running.
                </p>

                <div className="mt-4 flex items-end gap-3">
                  <span className="font-display text-5xl leading-none font-bold tracking-tight text-foreground sm:text-6xl">
                    {hosting.price}
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">
                    {hosting.period}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {hosting.note}
                </p>

                <CostSplit
                  tone="hosting"
                  upfront={hosting.upfront}
                  yearly={`${hosting.price} ${hosting.period}`}
                />

                <ul className="mt-7 space-y-3.5">
                  {hostingIncludes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Check
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-emerald-400"
                        strokeWidth={2.5}
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}

                  {hostingExtras.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Euro
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-amber-400/80"
                        strokeWidth={2.5}
                      />
                      <span className="text-muted-foreground">
                        {item}
                        <span className="block text-xs text-muted-foreground/70">
                          Charged separately
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 rounded-xl border border-white/8 bg-black/25 p-4">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    No discount on the build with this option, so it is the
                    pricier way to start. It works out well if your site rarely
                    changes and you would rather pay only when you actually need
                    me.
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 font-medium text-foreground transition-colors duration-300 hover:bg-white/[0.07]"
                  >
                    Ask about hosting only
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
