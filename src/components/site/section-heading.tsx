import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-neon uppercase",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="h-px w-6 bg-neon/50" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 className="mt-4 font-display text-3xl leading-[1.1] font-semibold text-balance sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
