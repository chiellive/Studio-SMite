"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Card shell that lifts on hover, lights a neon hairline border and tracks a
 * soft spotlight under the pointer.
 *
 * Like the page backdrop, the spotlight is a transform-moved circle rather
 * than an animated gradient, so hovering never repaints the whole card.
 */
export function SpotlightCard({
  children,
  className,
  lift = true,
}: {
  children: React.ReactNode;
  className?: string;
  lift?: boolean;
}) {
  const calm = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      whileHover={calm || !lift ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "neon-edge group relative overflow-hidden rounded-2xl border border-white/8 bg-carbon/70 transition-shadow duration-500 hover:shadow-[0_30px_70px_-45px_var(--neon)]",
        className,
      )}
    >
      {calm ? null : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 size-[480px] rounded-full transition-opacity duration-300 will-change-transform"
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            opacity: hovered ? 1 : 0,
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--neon) 12%, transparent) 0%, transparent 65%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
