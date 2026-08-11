"use client";

import { ChevronRight, Mail, MessageSquare, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { LogoMark, Wordmark } from "@/components/site/logo";
import { useFx } from "@/components/site/fx-provider";
import { legal, legalPages, navItems, site } from "@/lib/site";

function subscribeToClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

// Een opgemaakte tekst, geen Date: identieke waarden binnen dezelfde seconde
// zijn gelijk, en dat is wat useSyncExternalStore van een snapshot verwacht.
function readClock() {
  return new Date().toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function LiveClock() {
  // De server weet niet in welke tijdzone de bezoeker zit, dus die toont een
  // plaatshouder en de echte klok neemt het over zodra de pagina geladen is.
  const time = useSyncExternalStore(subscribeToClock, readClock, () => null);

  const zone = time
    ? Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split("/")
        .pop()
        ?.replace(/_/g, " ")
    : null;

  return (
    <span
      className="font-mono text-xs tabular-nums text-muted-foreground"
      aria-label="Huidige lokale tijd"
    >
      {time ? (
        <>
          {time}
          <span className="ml-1.5 text-muted-foreground/60">{zone}</span>
        </>
      ) : (
        <span className="opacity-0">00:00:00</span>
      )}
    </span>
  );
}

/** Wettelijk verplichte ondernemingsgegevens, met punten als scheidingsteken. */
function CompanyDetails() {
  const parts = [
    `${legal.tradeName}, ${legal.legalName}`,
    legal.status,
    legal.address,
    legal.companyNumber ? `Ondernemingsnummer ${legal.companyNumber}` : null,
    legal.vatNumber ? `BTW ${legal.vatNumber}` : legal.vatNote,
  ].filter((part): part is string => Boolean(part));

  return (
    <div className="space-y-2">
      <p className="text-xs leading-relaxed text-muted-foreground/80">
        {parts.map((part, index) => (
          <span key={part}>
            {index > 0 ? (
              <span aria-hidden className="mx-1.5 text-muted-foreground/40">
                ·
              </span>
            ) : null}
            {part}
          </span>
        ))}
      </p>

      {legal.companyNumber ? null : (
        <p className="text-xs leading-relaxed text-muted-foreground/60">
          {legal.pendingNote}
        </p>
      )}
    </div>
  );
}

export function Footer() {
  const { openTerminal } = useFx();
  const year = 2026;

  return (
    <footer className="relative mt-24 border-t border-white/8 bg-carbon/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Snelle, mooie websites voor kleine bedrijven. Volledig op maat
              gebouwd, en het hele jaar door onderhouden.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground/70">
              {site.location}
            </p>
          </div>

          <nav aria-label="Voettekstnavigatie">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Navigeren
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[
                ...navItems,
                { href: "/#aftercare", label: "Hosting & nazorg" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-neon"
                  >
                    <ChevronRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-neon"
                >
                  <Mail className="size-3.5" />
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-neon"
                >
                  <MessageSquare className="size-3.5" />
                  Start een project
                </Link>
              </li>
            </ul>
          </div>

          <nav aria-label="Juridische informatie">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Juridisch
            </h2>
            <ul className="mt-4 space-y-2.5">
              {legalPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-neon"
                  >
                    <ChevronRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6">
          <CompanyDetails />
        </div>

        <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground/70">
            © {year} {site.name}. Gebouwd door {site.founder.name}.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-led rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]" />
              </span>
              <span className="font-mono text-xs tracking-wide text-emerald-400/90">
                Systeem online
              </span>
            </span>

            <span aria-hidden className="hidden h-3 w-px bg-white/10 sm:block" />

            <LiveClock />

            <button
              type="button"
              onClick={openTerminal}
              title="Open de commandoterminal (Ctrl+K)"
              aria-label="Open de commandoterminal"
              className="group rounded-md border border-white/8 bg-white/[0.03] p-1.5 text-muted-foreground transition-all hover:border-neon/40 hover:text-neon hover:shadow-[0_0_18px_-6px_var(--neon)]"
            >
              <TerminalSquare className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
