"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { careBuildDiscount, plans, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Line = {
  kind: "prompt" | "out" | "dim" | "warn" | "ok";
  text: string;
};

const BANNER: Line[] = [
  { kind: "ok", text: "SMITE//OS v1.0.0 interactieve terminal" },
  { kind: "dim", text: `Typ "help" voor de commando's. ESC om te sluiten.` },
];

type CommandResult = {
  lines?: Line[];
  clear?: boolean;
  close?: boolean;
  navigate?: string;
  rainbow?: boolean;
};

type CommandSpec = {
  summary: string;
  hidden?: boolean;
  run: () => CommandResult;
};

export function CommandTerminal({
  open,
  onOpenChange,
  onRainbow,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRainbow: () => void;
}) {
  const router = useRouter();
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, CommandSpec> = {
    help: {
      summary: "Toon alle commando's",
      run: () => ({
        lines: [
          { kind: "dim", text: "BESCHIKBARE COMMANDO'S" },
          ...Object.entries(commands)
            .filter(([, spec]) => !spec.hidden)
            .map(([name, spec]) => ({
              kind: "out" as const,
              text: `  ${name.padEnd(10)} ${spec.summary}`,
            })),
          { kind: "dim", text: "  …en een paar die er niet bij staan. Zoek maar." },
        ],
      }),
    },
    about: {
      summary: "Wie er achter Studio SMITE zit",
      run: () => ({
        lines: [
          { kind: "ok", text: `${site.name}: ${site.tagline}` },
          {
            kind: "out",
            text: `Opgericht door ${site.founder.name} (${site.founder.age}), ${site.founder.role.toLowerCase()}.`,
          },
          {
            kind: "out",
            text: "Snelle, mooie websites voor kleine bedrijven, van nul gebouwd.",
          },
          { kind: "dim", text: `Typ "info" voor het hele verhaal.` },
        ],
      }),
    },
    info: {
      summary: "Open de Info-pagina",
      run: () => ({
        lines: [{ kind: "ok", text: "→ op weg naar /info" }],
        navigate: "/info",
      }),
    },
    contact: {
      summary: "Open het contactformulier",
      run: () => ({
        lines: [{ kind: "ok", text: "→ op weg naar /contact" }],
        navigate: "/contact",
      }),
    },
    home: {
      summary: "Terug naar de startpagina",
      run: () => ({
        lines: [{ kind: "ok", text: "→ op weg naar /" }],
        navigate: "/",
      }),
    },
    diensten: {
      summary: "Wat de studio maakt",
      run: () => ({
        lines: [
          {
            kind: "out",
            text: "[NU]      Websites op maat gebouwd, voor jouw bedrijf",
          },
          { kind: "dim", text: "[BINNENKORT] Logo- en huisstijlontwerp" },
          { kind: "dim", text: `Typ "prijzen" voor de jaarlijkse nazorgtarieven.` },
        ],
      }),
    },
    prijzen: {
      summary: "Jaarlijkse nazorgtarieven",
      run: () => {
        const [care, hosting] = plans;
        return {
          lines: [
            {
              kind: "ok",
              text: `${care.name.toUpperCase()}: ${care.price} ${care.period}`,
            },
            {
              kind: "dim",
              text: `Standaardtarief ${care.standardPrice}. Jij betaalt ${care.price}.`,
            },
            { kind: "out", text: `  · ${careBuildDiscount} korting op de websitebouw` },
            { kind: "out", text: "  · Hosting geregeld en beheerd" },
            { kind: "out", text: "  · Onderhoud en updates" },
            { kind: "out", text: "  · Blijft werken, hersteld als er iets stukgaat" },
            { kind: "dim", text: "" },
            {
              kind: "ok",
              text: `${hosting.name.toUpperCase()}: ${hosting.price} ${hosting.period}`,
            },
            { kind: "dim", text: hosting.note },
            { kind: "out", text: "  · Enkel hosting, de site blijft online" },
            {
              kind: "out",
              text: "  · Herstellingen en aanpassingen apart gefactureerd",
            },
            { kind: "out", text: "  · Geen korting op de websitebouw" },
          ],
        };
      },
    },
    email: {
      summary: "Kopieer het e-mailadres",
      run: () => {
        void navigator.clipboard?.writeText(site.email).catch(() => {});
        return {
          lines: [
            { kind: "ok", text: `${site.email} gekopieerd naar het klembord.` },
          ],
        };
      },
    },
    clear: {
      summary: "Maak het scherm leeg",
      run: () => ({ clear: true }),
    },
    exit: {
      summary: "Sluit deze terminal",
      run: () => ({ close: true }),
    },
    stack: {
      summary: "…",
      hidden: true,
      run: () => ({
        lines: [
          {
            kind: "out",
            text: "Next.js · React · TypeScript · Tailwind CSS · Framer Motion",
          },
          { kind: "dim", text: "Op de edge gezet. Gemeten in milliseconden." },
        ],
      }),
    },
    rainbow: {
      summary: "…",
      hidden: true,
      run: () => ({
        lines: [
          { kind: "warn", text: "OVERRIDE AANVAARD. Spectrummodus ingeschakeld." },
        ],
        rainbow: true,
      }),
    },
    konami: {
      summary: "…",
      hidden: true,
      run: () => ({
        lines: [
          { kind: "dim", text: "↑ ↑ ↓ ↓ ← → ← → B A" },
          { kind: "warn", text: "Probeer het ergens op de site." },
        ],
      }),
    },
    whoami: {
      summary: "…",
      hidden: true,
      run: () => ({
        lines: [
          { kind: "out", text: "gast@smite, iemand met uitstekende smaak." },
        ],
      }),
    },
    sudo: {
      summary: "…",
      hidden: true,
      run: () => ({
        lines: [
          { kind: "warn", text: "gast staat niet in het sudoers-bestand." },
          { kind: "dim", text: "Dit incident is gemeld. (Niet waar.)" },
        ],
      }),
    },
    ls: {
      summary: "…",
      hidden: true,
      run: () => ({
        lines: [
          { kind: "out", text: "home/  info/  contact/  .geheimen/" },
          { kind: "dim", text: "toegang geweigerd: .geheimen/" },
        ],
      }),
    },
  };

  const push = useCallback((next: Line[]) => {
    setLines((current) => [...current, ...next]);
  }, []);

  const submit = useCallback(
    (raw: string) => {
      const input = raw.trim();
      push([{ kind: "prompt", text: input }]);

      if (input) {
        setHistory((current) => [input, ...current].slice(0, 40));
      }
      setHistoryIndex(-1);
      setValue("");

      if (!input) return;

      const name = input.split(/\s+/)[0].toLowerCase();
      const spec = commands[name];

      if (!spec) {
        push([
          { kind: "warn", text: `commando niet gevonden: ${name}` },
          { kind: "dim", text: `Probeer "help".` },
        ]);
        return;
      }

      const result = spec.run();

      if (result.clear) {
        setLines(BANNER);
        return;
      }
      if (result.lines) push(result.lines);
      if (result.rainbow) onRainbow();
      if (result.navigate) {
        router.push(result.navigate);
        window.setTimeout(() => onOpenChange(false), 380);
      }
      if (result.close) onOpenChange(false);
    },
    // `commands` is rebuilt every render but is stable in behaviour.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onOpenChange, onRainbow, push, router],
  );

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines, open]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit(value);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }
      setHistoryIndex(next);
      setValue(history[next]);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-[12vh] pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Terminal sluiten"
            tabIndex={-1}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Studio SMITE commandoterminal"
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={() => inputRef.current?.focus()}
            className="glass-panel relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl"
          >
            {/* scanline sweep */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
            >
              <div className="h-8 w-full animate-scan bg-gradient-to-b from-transparent via-neon/12 to-transparent" />
            </div>

            <header className="relative flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
              <TerminalSquare className="size-4 text-neon" aria-hidden />
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                smite@studio:/bin/sh
              </span>

              <div className="ml-auto flex items-center gap-2">
                <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
                  ESC
                </kbd>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Terminal sluiten"
                  className="rounded p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="relative max-h-[45vh] min-h-[240px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((line, index) => (
                <p
                  key={index}
                  className={cn(
                    "break-words whitespace-pre-wrap",
                    line.kind === "prompt" && "text-foreground",
                    line.kind === "out" && "text-foreground/85",
                    line.kind === "dim" && "text-muted-foreground",
                    line.kind === "warn" && "text-amber-400",
                    line.kind === "ok" && "text-neon",
                  )}
                >
                  {line.kind === "prompt" ? (
                    <>
                      <span className="text-neon-alt">gast@smite</span>
                      <span className="text-muted-foreground">:~$ </span>
                      {line.text}
                    </>
                  ) : (
                    line.text
                  )}
                </p>
              ))}
            </div>

            <div className="relative flex items-center gap-2 border-t border-white/10 bg-black/30 px-4 py-3 font-mono text-[13px]">
              <span aria-hidden className="text-neon-alt">
                gast@smite
              </span>
              <span aria-hidden className="-ml-1.5 text-muted-foreground">
                :~$
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Commandoregel van de terminal"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                className="flex-1 bg-transparent text-foreground caret-neon outline-none placeholder:text-muted-foreground/60"
                placeholder="help"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
