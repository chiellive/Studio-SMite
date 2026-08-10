import { Search, ShieldCheck, Smartphone, Zap } from "lucide-react";

import { RevealItem, RevealList } from "@/components/site/reveal";

const highlights = [
  { icon: Zap, label: "Opens in about a second" },
  { icon: Smartphone, label: "Looks right on every phone" },
  { icon: Search, label: "Easy to find on Google" },
  { icon: ShieldCheck, label: "Looked after all year" },
];

/**
 * Static strip, deliberately not animated on a loop: it states the four
 * things a small business actually cares about, and costs nothing to run.
 */
export function Highlights() {
  return (
    <section className="border-y border-white/8 bg-carbon/40">
      <h2 className="sr-only">What you get</h2>

      <RevealList className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-8 gap-y-5 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {highlights.map((item) => (
          <RevealItem key={item.label}>
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-neon/20 bg-neon/10 text-neon">
                <item.icon className="size-4" />
              </span>
              {item.label}
            </p>
          </RevealItem>
        ))}
      </RevealList>
    </section>
  );
}
