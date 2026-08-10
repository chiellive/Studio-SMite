"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the reveal starts. */
  delay?: number;
  /** Travel distance in pixels for the fade-up. */
  y?: number;
  scale?: boolean;
};

/** Scroll-triggered fade-up. Fires once, and no-ops for reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  scale = false,
}: RevealProps) {
  const calm = useReducedMotion();

  if (calm) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Wraps a list so each <RevealItem> child comes in one after the other. */
export function RevealList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const calm = useReducedMotion();

  if (calm) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const calm = useReducedMotion();

  if (calm) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}
