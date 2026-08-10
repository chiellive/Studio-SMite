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
  "Business websites that turn visitors into customers",
  "Online tools, forms and booking systems",
  "Webshops and product pages",
  "Rescues for sites that are slow or look dated",
];

const capabilities = [
  {
    icon: Gauge,
    title: "Quick to open",
    body: "Most people give up on a slow page. Yours will not give them the chance.",
  },
  {
    icon: MousePointerClick,
    title: "Easy to use",
    body: "Clear buttons and obvious next steps, so visitors never have to stop and work it out.",
  },
  {
    icon: Users,
    title: "Works for everyone",
    body: "Readable text, proper contrast and full keyboard use, so nobody gets shut out.",
  },
  {
    icon: Search,
    title: "Easy to find on Google",
    body: "Set up correctly behind the scenes, so search engines can read your pages and show them.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="What I do"
          title={
            <>
              One thing, done{" "}
              <span className="text-gradient-neon">properly</span>.
            </>
          }
          description="I build websites. That is it. All of the attention goes into one job, which is why the result beats a bit of everything done at once."
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
                    Available now
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl leading-tight font-semibold text-balance sm:text-[1.75rem]">
                  Websites built from scratch, for your business
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Your site gets built around what your company actually needs,
                  instead of squeezing you into a template someone else designed.
                  Nothing is bolted on, so nothing slows it down.
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
                    Get a price
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
                    Coming soon
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl leading-tight font-semibold text-balance">
                  Logo and brand design
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Your logo, colours, fonts and the way your business sounds in
                  writing. In the works right now, and it opens to clients once
                  it is as good as the websites.
                </p>

                <div className="mt-auto pt-9">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                    Expanding scope
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
