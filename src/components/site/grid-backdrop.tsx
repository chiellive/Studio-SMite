"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Ambient backdrop: a static hairline grid, two slow colour blooms and a glow
 * that trails the cursor.
 *
 * Two deliberate choices keep scrolling smooth:
 *
 * 1. The glow is a fixed-size circle moved with a transform, not an animated
 *    `background-position` on a full-screen gradient.
 * 2. Pointer positions are converted using the container's *document* offset,
 *    which only changes on layout. Measuring against the viewport would mean a
 *    `getBoundingClientRect()` on every scroll frame, and that read is exactly
 *    what makes a parallax hero stutter.
 */
export function GridBackdrop({ className }: { className?: string }) {
  const calm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Op een aanraakscherm is er geen muisaanwijzer om te volgen. Zonder deze
  // controle luisterde de gloed daar toch mee, en dan verstookt elke veeg
  // rekenkracht op precies de toestellen die het minst te missen hebben.
  const [pointerFine, setPointerFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setPointerFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const glowActive = pointerFine && !calm;

  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const gx = useSpring(px, { stiffness: 70, damping: 24, mass: 0.6 });
  const gy = useSpring(py, { stiffness: 70, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!glowActive) return;

    const node = ref.current;
    if (!node) return;

    let left = 0;
    let top = 0;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      left = rect.left + window.scrollX;
      top = rect.top + window.scrollY;
    };

    const onMove = (event: PointerEvent) => {
      px.set(event.pageX - left);
      py.set(event.pageY - top);
    };

    measure();

    // Fires on layout changes (fonts settling, orientation, resize), never on scroll.
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);

    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [glowActive, px, py]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="hairline-grid mask-fade-edges absolute inset-0 opacity-60" />

      {/*
        Zachte kleurvlekken als verloop in plaats van een vervaagde cirkel.
        Een blur van 100 pixels over een vlak van deze grootte moet de browser
        echt uitrekenen, en dat kostte op een telefoon bijna 600 ms aan opmaak.
        Een radiaal verloop ziet er hetzelfde uit en is zo goed als gratis.
      */}
      <div
        className="absolute -top-[15rem] -left-[13rem] size-[40rem] animate-float rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--neon) 14%, transparent) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute -right-[14rem] -bottom-[10rem] size-[34rem] animate-float rounded-full"
        style={{
          animationDelay: "-5s",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--neon-alt) 16%, transparent) 0%, transparent 68%)",
        }}
      />

      {glowActive ? (
        <motion.div
          className="absolute top-0 left-0 size-[720px] rounded-full will-change-transform"
          style={{
            x: gx,
            y: gy,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--neon) 14%, transparent) 0%, transparent 62%)",
          }}
        />
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
