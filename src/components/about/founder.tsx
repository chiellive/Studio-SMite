import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { site } from "@/lib/site";

const focus = [
  "Websites die snel en soepel aanvoelen",
  "Ontwerpen die op elk schermformaat werken",
  "De kleine details die een site duur doen lijken",
  "Pagina's licht houden zodat ze meteen openen",
];

export function Founder() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Wie ik ben"
          title={
            <>
              <span className="text-gradient-neon">{site.founder.name}</span>.
            </>
          }
          description="Eén persoon, niets wordt doorgegeven tussen afdelingen, en dus gaat er ook niets verloren tussen wat je vraagt en wat je krijgt."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Portrait plate */}
          <Reveal scale>
            {/* Zonder maximumbreedte wordt dit vlak op een tablet ruim 800 pixels
                hoog en overheerst het de hele pagina. */}
            <div className="glass-panel relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl lg:max-w-none">
              <div aria-hidden className="absolute inset-0">
                <div
                  className="absolute -top-40 -left-32 size-[26rem] animate-float rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--neon) 22%, transparent) 0%, transparent 68%)",
                  }}
                />
                <div
                  className="absolute -right-36 -bottom-40 size-[26rem] animate-float rounded-full"
                  style={{
                    animationDelay: "-4s",
                    background:
                      "radial-gradient(circle, color-mix(in oklab, var(--neon-alt) 26%, transparent) 0%, transparent 68%)",
                  }}
                />
                <div className="hairline-grid absolute inset-0 opacity-40" />
              </div>

              {/* corner brackets */}
              <div aria-hidden className="absolute inset-5">
                <span className="absolute top-0 left-0 size-6 border-t border-l border-neon/50" />
                <span className="absolute top-0 right-0 size-6 border-t border-r border-neon/50" />
                <span className="absolute bottom-0 left-0 size-6 border-b border-l border-neon/50" />
                <span className="absolute right-0 bottom-0 size-6 border-r border-b border-neon/50" />
              </div>

              <div className="relative flex h-full flex-col items-center justify-center p-8">
                <span
                  aria-hidden
                  className="text-gradient-neon text-shadow-neon font-display text-[7rem] leading-none font-bold tracking-tight sm:text-[8.5rem]"
                >
                  CS
                </span>
                <p className="mt-4 font-display text-xl font-semibold">
                  {site.founder.name}
                </p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-neon uppercase">
                  {site.founder.role}
                </p>
              </div>

              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                <span>{site.founder.age} jaar</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 animate-led rounded-full bg-emerald-400" />
                  Aan het bouwen
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/90 text-pretty">
                Ik ben {site.founder.name}, {site.founder.age} jaar,
                student-zelfstandige uit België. Ik bouw websites zoals ik zou
                willen dat er meer werkten: snel, duidelijk en aangenaam in
                gebruik.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
                <p>
                  Studio SMITE begon uit een simpele ergernis. Veel te veel
                  websites van kleine bedrijven zijn traag, lijken op elkaar, en
                  komen duidelijk uit een sjabloon waar iemand jaren geleden al
                  op uitgekeken was. Dat ik jong ben, is in dit vak net het
                  voordeel: ik heb leren werken met wat het web nu wordt, niet
                  met wat het achter zich laat.
                </p>
                <p>
                  Daarom wordt jouw site van nul geschreven, regel per regel
                  nagekeken, en op snelheid getest voor hij ook maar in de buurt
                  van je klanten komt. Klein studio, hoge lat, en een heel korte
                  weg tussen een idee en een werkende website.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <h3 className="mt-10 font-mono text-[11px] tracking-[0.2em] text-neon uppercase">
                Waar ik op focus
              </h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {focus.map((item) => (
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
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:bg-neon/20 hover:shadow-[0_0_32px_-8px_var(--neon)]"
                >
                  Werk met mij
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" />
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
