import { ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative pb-8">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal scale>
          <div className="glass-panel relative overflow-hidden rounded-3xl px-7 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
            >
              <div
                className="absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 animate-float rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--neon) 14%, transparent) 0%, transparent 68%)",
                }}
              />
              <div className="hairline-grid mask-fade-edges absolute inset-0 opacity-40" />
            </div>

            <div className="relative">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-neon uppercase">
                <span aria-hidden className="h-px w-6 bg-neon/50" />
                Time to make dreams turn into reality
              </span>

              <h2 className="mx-auto mt-5 max-w-3xl font-display text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl md:text-5xl">
                Heb je iets dat het verdient om{" "}
                <span className="text-gradient-neon">goed gebouwd</span> te
                worden?
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
                Vertel me wat je in gedachten hebt. Je krijgt een duidelijk
                antwoord over wat er nodig is, hoelang het duurt en wat het
                kost, meestal binnen een dag.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-neon px-7 py-3.5 font-medium text-[#04141a] transition-all duration-300 hover:shadow-[0_0_46px_-6px_var(--neon)] focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                  <Zap className="relative size-4 fill-current" />
                  <span className="relative">Start een project</span>
                </Link>

                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-7 py-3.5 font-medium text-foreground transition-colors duration-300 hover:bg-white/[0.07]"
                >
                  {site.email}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
