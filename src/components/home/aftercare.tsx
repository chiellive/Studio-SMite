import { ArrowUpRight, Check, Euro, Server } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { careBuildDiscount, plans } from "@/lib/site";

const [care, hosting] = plans;

const careIncludes = [
  `${careBuildDiscount} korting op de prijs om je website te bouwen`,
  "Hosting en domein geregeld en beheerd voor jou",
  "Beveiligingsupdates, plus de kleine tekst- en foto-aanpassingen die opduiken",
  "Gaat er iets stuk, dan los ik het op, zonder extra kosten",
];

const hostingIncludes = ["Je website wordt gehost en blijft online"];
const hostingExtras = [
  "Iets gaat stuk en moet hersteld worden",
  "Aanpassingen aan tekst, foto's of pagina's",
];

/** De twee regels die het verschil tussen beide opties in één oogopslag leesbaar maken. */
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
      {/* Op smalle schermen onder elkaar, want naast elkaar breekt de waarde
          over twee regels en gaan de twee kaarten uit de pas lopen. */}
      <div className="flex flex-col gap-1 border-b border-white/8 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Om te bouwen
        </dt>
        <dd
          className={
            tone === "care"
              ? "text-sm font-medium text-emerald-400 sm:text-right"
              : "text-sm font-medium text-foreground sm:text-right"
          }
        >
          {upfront}
        </dd>
      </div>
      <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <dt className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Elk jaar erna
        </dt>
        <dd
          className={
            tone === "hosting"
              ? "text-sm font-medium text-emerald-400 sm:text-right"
              : "text-sm font-medium text-foreground sm:text-right"
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
          eyebrow="Nazorg"
          title={
            <>
              Eén keer gebouwd, daarna{" "}
              <span className="text-gradient-neon">bijgehouden</span>.
            </>
          }
          description="Twee manieren om dit aan te pakken, het verschil zit in wanneer je betaalt. Kies je voor het zorgpakket, dan kost de bouw minder maar betaal je jaarlijks iets meer. Kies je voor enkel hosting, dan betaal je de volle prijs voor de bouw, maar zijn de jaren erna zo goedkoop mogelijk."
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
                    Meest gekozen
                  </span>
                </div>

                <p className="mt-6 font-display text-lg font-medium">
                  Goedkoopste manier om te starten.
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
                    Afgeprijsd tarief
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

                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:bg-neon/20 hover:shadow-[0_0_32px_-8px_var(--neon)]"
                  >
                    Vraag naar het zorgpakket
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
                  Goedkoopst om draaiende te houden.
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
                          Apart gefactureerd
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 rounded-xl border border-white/8 bg-black/25 p-4">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Geen korting op de bouw bij deze optie, dus het is de
                    duurdere manier om te starten. Werkt goed als je site zelden
                    verandert en je liever alleen betaalt wanneer je me echt
                    nodig hebt.
                  </p>
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 font-medium text-foreground transition-colors duration-300 hover:bg-white/[0.07]"
                  >
                    Vraag naar enkel hosting
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
