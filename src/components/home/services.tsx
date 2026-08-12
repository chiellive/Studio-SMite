import {
  ArrowUpRight,
  Code2,
  Gauge,
  MousePointerClick,
  Palette,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Reveal, RevealItem, RevealList } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";

const deliverables = [
  "Zakelijke websites die bezoekers omzetten in klanten",
  "Online tools, formulieren en boekingssystemen",
  "Webshops en productpagina's",
  "Reddingsacties voor sites die traag zijn of er verouderd uitzien",
];

const capabilities = [
  {
    icon: Gauge,
    title: "Snel geladen",
    body: "De meeste mensen haken af bij een trage pagina. Die kans krijgen ze bij jou niet.",
  },
  {
    icon: MousePointerClick,
    title: "Makkelijk in gebruik",
    body: "Duidelijke knoppen en logische vervolgstappen, zodat bezoekers nooit hoeven na te denken.",
  },
  {
    icon: Users,
    title: "Voor iedereen toegankelijk",
    body: "Leesbare tekst, goed contrast en volledig bruikbaar met het toetsenbord, zodat niemand wordt buitengesloten.",
  },
  {
    icon: Search,
    title: "Makkelijk vindbaar op Google",
    body: "Correct opgezet achter de schermen, zodat zoekmachines je pagina's kunnen lezen en tonen.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Wat ik doe"
          title={
            <>
              Eén ding, <span className="text-gradient-neon">goed gedaan</span>.
            </>
          }
          description="Op dit moment ligt mijn focus volledig op websites. Zodra ik er de ruimte voor vind, komt daar meer bij, zoals design en branding."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2" scale>
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-neon/25 bg-neon/10 text-neon shadow-[0_0_28px_-10px_var(--neon)]">
                    <Code2 className="size-5" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-emerald-400 uppercase">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    Beschikbaar nu
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl leading-tight font-semibold text-balance sm:text-[1.75rem]">
                  Websites op maat gebouwd, voor jouw bedrijf
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Je website wordt gebouwd rond wat jouw bedrijf echt nodig
                  heeft, in plaats van je in een sjabloon te persen dat iemand
                  anders ontworpen heeft. Alles wat erop staat, staat er omdat
                  jij het nodig hebt.
                </p>

                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_10px_1px_var(--neon)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neon transition-all hover:gap-2.5"
                  >
                    Vraag een prijs
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} scale>
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-neon-alt/25 bg-neon-alt/10 text-neon-alt">
                    <Palette className="size-5" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-alt/30 bg-neon-alt/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-neon-alt uppercase">
                    <Sparkles className="size-3" />
                    Binnenkort
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl leading-tight font-semibold text-balance">
                  Logo- en huisstijlontwerp
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Je logo, kleuren, lettertypes en de manier waarop jouw bedrijf
                  schrijft. Hier wordt nu aan gewerkt, en het wordt beschikbaar
                  zodra het net zo goed is als de websites.
                </p>

                <div className="mt-auto pt-9">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                    Uitbreidend aanbod
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        <RevealList className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <RevealItem key={item.title}>
              <SpotlightCard className="h-full" lift={false}>
                <div className="p-6">
                  <item.icon className="size-5 text-neon" />
                  <h3 className="mt-4 font-display text-base font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
