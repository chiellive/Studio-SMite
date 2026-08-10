import { RevealItem, RevealList } from "@/components/site/reveal";
import { SpotlightCard } from "@/components/site/spotlight-card";

const stats = [
  {
    value: "100",
    unit: "/100",
    label: "Speed score",
    body: "Top marks on Google's own speed test. That is the target for every site before it goes live.",
  },
  {
    value: "0",
    label: "Templates used",
    body: "Every site is written from scratch for your business, never bought as a theme and reshaped to fit.",
  },
  {
    value: "24h",
    label: "Reply time",
    body: "You hear back within a day. No call centre, no ticket number, no waiting a week.",
  },
  {
    value: "1",
    label: "Person you deal with",
    body: "The person who plans your website is the person who builds it and answers the phone.",
  },
];

export function Stats() {
  return (
    <section className="relative py-6">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <h2 className="sr-only">What you can expect</h2>

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
