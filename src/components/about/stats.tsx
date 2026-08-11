import { RevealItem, RevealList } from "@/components/site/reveal";
import { SpotlightCard } from "@/components/site/spotlight-card";

const stats = [
  {
    value: "100",
    unit: "/100",
    label: "Snelheidsscore",
    body: "De topscore op de snelheidstest van Google zelf. Dat is het doel voor elke site voor hij live gaat.",
  },
  {
    value: "0",
    label: "Sjablonen gebruikt",
    body: "Elke site wordt van nul geschreven voor jouw bedrijf, nooit als kant-en-klaar thema gekocht en bijgeschaafd.",
  },
  {
    value: "24u",
    label: "Antwoordtijd",
    body: "Je hoort binnen een dag iets. Geen callcenter, geen ticketnummer, geen week wachten.",
  },
  {
    value: "1",
    label: "Persoon die je spreekt",
    body: "Wie jouw website plant, is ook wie hem bouwt en wie je aan de lijn krijgt.",
  },
];

export function Stats() {
  return (
    <section className="relative py-6">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <h2 className="sr-only">Wat je mag verwachten</h2>

        <RevealList className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <SpotlightCard className="h-full" lift={false}>
                <div className="p-6 sm:p-7">
                  <p className="font-display text-4xl leading-none font-bold tracking-tight sm:text-[2.75rem]">
                    <span className="text-gradient-neon">{stat.value}</span>
                    {stat.unit ? (
                      <span className="ml-0.5 text-xl text-muted-foreground/60">
                        {stat.unit}
                      </span>
                    ) : null}
                  </p>
                  <h3 className="mt-4 font-mono text-[11px] tracking-[0.2em] text-neon uppercase">
                    {stat.label}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {stat.body}
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
