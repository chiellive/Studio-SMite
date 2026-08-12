"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { rainbowBlast } from "@/lib/confetti";

/*
 * Allebei pas ophalen wanneer ze nodig zijn.
 *
 * De terminal verschijnt alleen na Ctrl+K en de cursorring alleen bij een
 * echte muis, maar hun code werd wel op elke pagina meteen meegeladen en
 * uitgevoerd. Dat werk viel precies samen met het moment waarop de bezoeker
 * op de titel zit te wachten.
 */
const CommandTerminal = dynamic(
  () =>
    import("@/components/site/command-terminal").then((m) => m.CommandTerminal),
  { ssr: false },
);

const CursorRing = dynamic(
  () => import("@/components/site/cursor-ring").then((m) => m.CursorRing),
  { ssr: false },
);

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type FxContextValue = {
  openTerminal: () => void;
  terminalOpen: boolean;
  rainbow: boolean;
  toggleRainbow: () => void;
};

const FxContext = createContext<FxContextValue | null>(null);

export function useFx() {
  const value = useContext(FxContext);
  if (!value) throw new Error("useFx must be used inside <FxProvider>");
  return value;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

export function FxProvider({ children }: { children: React.ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  // Blijft aan zodra de terminal een eerste keer opende: dan pas wordt zijn
  // code opgehaald, en daarna blijft hij staan zodat sluiten en heropenen
  // vloeiend gaat.
  const [terminalUsed, setTerminalUsed] = useState(false);
  const [rainbow, setRainbow] = useState(false);
  const [flash, setFlash] = useState(false);
  const progress = useRef(0);

  const openTerminal = useCallback(() => {
    setTerminalUsed(true);
    setTerminalOpen(true);
  }, []);

  const enableRainbow = useCallback(() => {
    setRainbow(true);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 900);
    void rainbowBlast();
  }, []);

  const toggleRainbow = useCallback(() => {
    setRainbow((current) => {
      if (current) return false;
      setFlash(true);
      window.setTimeout(() => setFlash(false), 900);
      void rainbowBlast();
      return true;
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("rainbow", rainbow);
  }, [rainbow]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K toggles the shell from anywhere.
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTerminalUsed(true);
        setTerminalOpen((current) => !current);
        return;
      }

      if (event.key === "Escape" && terminalOpen) {
        event.preventDefault();
        setTerminalOpen(false);
        return;
      }

      // Konami stays out of the way while someone is typing.
      if (terminalOpen || isTypingTarget(event.target)) {
        progress.current = 0;
        return;
      }

      const expected = KONAMI[progress.current];
      const pressed = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (pressed === expected) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          enableRainbow();
        }
        return;
      }

      // A wrong key restarts the sequence, unless it is a fresh first key.
      progress.current = pressed === KONAMI[0] ? 1 : 0;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enableRainbow, terminalOpen]);

  return (
    <FxContext.Provider
      value={{ openTerminal, terminalOpen, rainbow, toggleRainbow }}
    >
      {children}

      <CursorRing />
      {terminalUsed ? (
        <CommandTerminal
          open={terminalOpen}
          onOpenChange={setTerminalOpen}
          onRainbow={toggleRainbow}
        />
      ) : null}

      <AnimatePresence>
        {flash ? (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[180]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, times: [0, 0.15, 1] }}
            style={{
              background:
                "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--neon) 55%, transparent), transparent 65%)",
            }}
          />
        ) : null}
      </AnimatePresence>

      <div aria-live="polite" className="sr-only">
        {rainbow ? "Spectrummodus ingeschakeld" : ""}
      </div>
    </FxContext.Provider>
  );
}
