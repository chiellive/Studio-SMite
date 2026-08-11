import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { GridBackdrop } from "@/components/site/grid-backdrop";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-24">
      <GridBackdrop />

      <div className="relative mx-auto w-full max-w-7xl px-5 text-center sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] text-neon uppercase">
          Fout 404
        </p>

        <h1 className="text-gradient-neon text-shadow-neon mt-6 font-display text-[clamp(4rem,18vw,11rem)] leading-none font-bold tracking-tight">
          404
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
          Deze pagina bestaat niet. Er is niets stuk, het adres verwijst gewoon
          nergens naartoe.
        </p>

        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon/10 px-6 py-3 font-medium text-foreground transition-all duration-300 hover:bg-neon/20 hover:shadow-[0_0_32px_-8px_var(--neon)]"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Terug naar de startpagina
        </Link>
      </div>
    </section>
  );
}
