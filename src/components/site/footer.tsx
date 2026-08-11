"use client";

import { ChevronRight, Mail, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import { LogoMark, Wordmark } from "@/components/site/logo";
import { useFx } from "@/components/site/fx-provider";
import { navItems, site } from "@/lib/site";

function subscribeToClock(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

// A formatted string, not a Date: identical values within the same second
// compare equal, which is what useSyncExternalStore needs from a snapshot.
function readClock() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function LiveClock() {
  // The server has no idea what the visitor's local time or timezone is, so
  // it renders a placeholder and the real clock takes over after hydration.
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
      aria-label="Current local time"
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
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <Wordmark className="text-lg" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Fast, good-looking websites for small businesses. Built from
              scratch, and looked after all year.
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground/70">
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[...navItems, { href: "/#care", label: "Care package" }].map(
                (item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-neon"
                    >
                      <ChevronRight className="size-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
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
                  className="text-sm text-muted-foreground transition-colors hover:text-neon"
                >
                  Start a project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground/70">
            © {year} {site.name}. Built by {site.founder.name}.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-led rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]" />
              </span>
              <span className="font-mono text-xs tracking-wide text-emerald-400/90">
                System Online
              </span>
            </span>

            <span aria-hidden className="hidden h-3 w-px bg-white/10 sm:block" />

            <LiveClock />

            <button
              type="button"
              onClick={openTerminal}
              title="Open command terminal (⌘K / Ctrl+K)"
              aria-label="Open command terminal"
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
