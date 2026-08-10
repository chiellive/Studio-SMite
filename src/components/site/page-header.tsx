import { Reveal } from "@/components/site/reveal";
import { GridBackdrop } from "@/components/site/grid-backdrop";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <GridBackdrop className="opacity-80" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal y={16}>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-neon uppercase">
            <span aria-hidden className="h-px w-6 bg-neon/50" />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.06} y={20}>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>

        {description ? (
          <Reveal delay={0.14} y={20}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
