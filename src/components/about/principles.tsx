import { Eye, Feather, KeyRound, Timer } from "lucide-react";

import { RevealItem, RevealList } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";

const principles = [
  {
    icon: Timer,
    title: "Snelheid komt eerst",
    body: "Elke foto en elke extra moet zijn plaats verdienen, zodat je site ook op een telefoon met slecht bereik meteen opent.",
  },
  {
    icon: Eye,
    title: "Je weet altijd waar je staat",
    body: "Een duidelijk plan, een vaste prijs voor er iets begint, en een link die je op elk moment kan openen om te zien hoever het staat.",
  },
  {
    icon: KeyRound,
    title: "Alles is van jou",
    body: "De website, het domein en alle bestanden zijn van jou. Je zit nergens aan vast en kan er altijd mee naar iemand anders.",
  },
  {
    icon: Feather,
    title: "Niets dat je niet nodig hebt",
    body: "Geen uitbreidingen bovenop uitbreidingen. Minder dat stuk kan gaan, minder om bij te werken, en een site die over drie jaar nog prima werkt.",
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
          eyebrow="Hoe ik werk"
          title="Bewust rechttoe rechtaan."
          description="Een eenmansstudio werkt alleen als je kan vertrouwen hoe het loopt. Daarom hieronder de regels waar ik mezelf aan hou."
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
