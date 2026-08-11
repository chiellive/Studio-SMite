import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { legal, site } from "@/lib/site";

/** Datum waarop de juridische teksten voor het laatst zijn aangepast. */
export const LEGAL_UPDATED = "12 augustus 2026";

export function LegalLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={intro} />

      <section className="relative pb-8">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <Reveal scale>
            <article className="glass-panel rounded-3xl p-7 sm:p-10">
              <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Laatst bijgewerkt op {LEGAL_UPDATED}
              </p>

              <div className="mt-8 space-y-10">{children}</div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold sm:text-xl">{title}</h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2.5">
          <span
            aria-hidden
            className="mt-2 size-1.5 shrink-0 rounded-full bg-neon"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Wie er achter de site zit, met de gegevens die al bekend zijn. Adres en
 * ondernemingsnummer verschijnen automatisch zodra ze in site.ts ingevuld zijn.
 */
export function Identity() {
  const known = [
    legal.address,
    legal.companyNumber ? `ondernemingsnummer ${legal.companyNumber}` : null,
    legal.vatNumber ? `btw-nummer ${legal.vatNumber}` : null,
  ].filter((part): part is string => Boolean(part));

  return (
    <>
      <p>
        {legal.legalName}, {legal.status}, handelend onder de naam{" "}
        {legal.tradeName}
        {known.length ? `, ${known.join(", ")}` : ""}, bereikbaar via{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-neon underline-offset-4 hover:underline"
        >
          {site.email}
        </a>
        .
      </p>

      {legal.companyNumber ? null : <p>{legal.pendingNote}</p>}
    </>
  );
}
