"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Ambient backdrop: a static hairline grid, two slow colour blooms and a glow
 * that trails the cursor.
 *
 * The glow is a fixed-size circle moved with a transform rather than an
 * animated `background-position`, so the browser can keep it on the compositor
 * instead of repainting a full-screen gradient on every pointer move.
 */
export function GridBackdrop({ className }: { className?: string }) {
  const calm = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const gx = useSpring(px, { stiffness: 70, damping: 24, mass: 0.6 });
  const gy = useSpring(py, { stiffness: 70, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (calm) return;

    const node = ref.current;
    if (!node) return;

    // Cached so pointermove never forces a layout read.
    let rect = node.getBoundingClientRect();
    const measure = () => {
      rect = node.getBoundingClientRect();
    };

    const onMove = (event: PointerEvent) => {
      px.set(event.clientX - rect.left);
      py.set(event.clientY - rect.top);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [calm, px, py]);

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

      <div className="absolute -top-40 -left-32 size-[34rem] animate-float rounded-full bg-neon/12 blur-[120px]" />
      <div
        className="absolute -right-40 -bottom-24 size-[30rem] animate-float rounded-full bg-neon-alt/14 blur-[130px]"
        style={{ animationDelay: "-5s" }}
      />

      {calm ? null : (
        <motion.div
          className="absolute top-0 left-0 size-[900px] rounded-full will-change-transform"
          style={{
            x: gx,
            y: gy,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--neon) 14%, transparent) 0%, transparent 62%)",
          }}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
