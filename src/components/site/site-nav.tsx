"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LogoMark, Wordmark } from "@/components/site/logo";
import { useFx } from "@/components/site/fx-provider";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const { openTerminal } = useFx();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Never leave the mobile sheet open across a route change. Adjusting state
  // during render is React's recommended alternative to a reset effect.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[120] transition-all duration-500",
        // A blurred backdrop on a fixed bar has to be recomputed every scroll
        // frame, so the blur stays small and the background does the work.
        scrolled
          ? "border-b border-white/8 bg-background/88 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-neon/60"
          aria-label="Studio SMITE startpagina"
        >
          <LogoMark className="size-7 transition-transform duration-500 group-hover:rotate-[8deg]" />
          <Wordmark className="hidden text-[15px] sm:inline-block" />
        </Link>

        <nav aria-label="Hoofdnavigatie" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] p-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neon/60",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-neon/30 bg-neon/10 shadow-[0_0_20px_-6px_var(--neon)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <span className="relative font-mono text-[10px] text-neon/70">
                      {item.index}
                    </span>
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openTerminal}
            aria-label="Open de commandoterminal"
            className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-neon/30 hover:text-foreground lg:flex"
          >
            <span>⌘K</span>
          </button>

          <Link
            href="/contact"
            className="neon-edge group hidden items-center gap-1.5 rounded-full border border-neon/25 bg-neon/10 px-4 py-1.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-neon/20 hover:shadow-[0_0_28px_-6px_var(--neon)] focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:outline-none sm:flex"
          >
            Start een project
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
            className="flex size-10 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] text-foreground transition-colors hover:border-neon/30 md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            aria-label="Mobiele navigatie"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/8 bg-background/97 md:hidden"
          >
            <ul className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-5 py-4">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors",
                        active
                          ? "border border-neon/25 bg-neon/10 text-foreground"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                      )}
                    >
                      <span className="font-mono text-xs text-neon/70">
                        {item.index}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-neon/25 bg-neon/10 px-4 py-3 font-medium text-foreground"
                >
                  Start een project
                  <ArrowUpRight className="size-4" />
                </Link>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
