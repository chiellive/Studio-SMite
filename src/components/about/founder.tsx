import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { site } from "@/lib/site";

const focus = [
  "Websites that feel quick and smooth",
  "Designs that work on any size of screen",
  "The small details that make a site feel expensive",
  "Keeping pages light so they open fast",
];

export function Founder() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Founder"
          title={
            <>
              Meet{" "}
              <span className="text-gradient-neon">{site.founder.name}</span>.
            </>
          }
          description="One person, on purpose. Nothing gets passed between departments, and nothing gets lost between what you asked for and what you get."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Portrait plate */}
          <Reveal scale>
            <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-3xl">
              <div aria-hidden className="absolute inset-0">
                <div className="absolute -top-16 -left-10 size-72 animate-float rounded-full bg-neon/20 blur-[90px]" />
                <div
                  className="absolute -right-12 -bottom-16 size-72 animate-float rounded-full bg-neon-alt/25 blur-[90px]"
                  style={{ animationDelay: "-4s" }}
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
                <span>Age {site.founder.age}</span>
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 animate-led rounded-full bg-emerald-400" />
                  Building
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/90 text-pretty">
                I am {site.founder.name}, {site.founder.age}, and I build
                websites the way I wish more of them worked: quick, clear and
                pleasant to use.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground text-pretty">
                <p>
                  Studio SMITE started from a simple frustration. Far too many
                  small business websites are slow, look like every other one,
                  and were clearly put together from a template somebody
                  outgrew years ago. Being young in this line of work is the
                  advantage: I learned on the tools the web is moving toward,
                  not the ones it is leaving behind.
                </p>
                <p>
                  So your site is written from scratch, checked line by line,
                  and timed for speed before it goes anywhere near the public.
                  Small studio, high standards, and a very short distance
                  between an idea and a working website.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <h3 className="mt-10 font-mono text-[11px] tracking-[0.2em] text-neon uppercase">
                What I focus on
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
                  Work with me
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
