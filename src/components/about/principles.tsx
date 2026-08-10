import { Eye, Feather, KeyRound, Timer } from "lucide-react";

import { RevealItem, RevealList } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";

const principles = [
  {
    icon: Timer,
    title: "Speed comes first",
    body: "Every image and extra feature has to earn its place, so your site still opens quickly on a phone with a weak signal.",
  },
  {
    icon: Eye,
    title: "You always know where you stand",
    body: "A clear plan, a fixed price before anything starts, and a link you can open any time to see how it is coming along.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    body: "The website, the domain and all the files are yours. You are never locked in, and you can take it elsewhere whenever you like.",
  },
  {
    icon: Feather,
    title: "Nothing you do not need",
    body: "No add-ons piled on top of add-ons. Less to go wrong, less to update, and a site that still works fine in three years.",
  },
];

export function Principles() {
  return (
    <section className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="hairline-grid mask-fade-edges pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How I work"
          title="Straightforward, on purpose."
          description="A one-person studio only works if you can trust how it runs. So here are the rules I hold myself to."
        />

        <RevealList className="mt-14 grid gap-5 sm:grid-cols-2">
          {principles.map((item) => (
            <RevealItem key={item.title}>
              <SpotlightCard className="h-full">
                <div className="flex gap-5 p-7">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-neon/20 bg-neon/10 text-neon">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
