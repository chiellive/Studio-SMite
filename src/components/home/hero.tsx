"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { GridBackdrop } from "@/components/site/grid-backdrop";
import { site } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const calm = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Content drifts up slightly faster than the page for a depth effect. The
  // backdrop deliberately does not move: translating a layer that holds two
  // 120px blurs forces the browser to re-rasterise them on every frame.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20"
    >
      <GridBackdrop />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 will-change-transform"
        style={calm ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="hero-rise inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-4 pl-2.5 backdrop-blur-md">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-led rounded-full bg-emerald-400" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            Beschikbaar voor nieuwe projecten
          </span>
        </div>

        <h1 className="mt-8">
          <span
            style={{ animationDelay: "0.08s" }}
            className="hero-rise-word text-gradient-neon text-shadow-neon block font-display text-[clamp(1.1rem,3.6vw,2.1rem)] leading-none font-medium tracking-[0.5em]"
          >
            STUDIO
          </span>

          <span
            style={{ animationDelay: "0.14s" }}
            className="hero-rise-word text-gradient-neon text-shadow-neon mt-2 block font-display text-[clamp(4rem,16.5vw,13rem)] leading-[0.86] font-bold tracking-[-0.03em]"
          >
            SMITE
          </span>
        </h1>

        <p
          style={{ animationDelay: "0.34s" }}
          className="hero-rise mt-8 font-display text-2xl leading-tight font-medium text-balance sm:text-3xl md:text-4xl"
        >
          {site.tagline}
        </p>

        <p
          style={{ animationDelay: "0.42s" }}
          className="hero-rise mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
        >
          Ik ben Chiel Smets, 23, student-zelfstandige uit België. Ik bouw
          websites voor kleine bedrijven die een blijvende indruk achterlaten:
          op maat gemaakt, snel, en zonder sjabloon.
        </p>

        <div
          style={{ animationDelay: "0.5s" }}
          className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-neon px-7 py-3.5 font-medium text-[#04141a] transition-all duration-300 hover:shadow-[0_0_46px_-6px_var(--neon)] focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <Zap className="relative size-4 fill-current" />
            <span className="relative">Start een project</span>
          </Link>

          <a
            href="#services"
            className="neon-edge group inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-7 py-3.5 font-medium text-foreground backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-neon/60 focus-visible:outline-none"
          >
            Wat ik bouw
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>

      <a
        href="#services"
        aria-label="Scroll naar wat ik bouw"
        style={{ animationDelay: "1.1s", animationDuration: "0.8s" }}
        className="hero-rise absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-neon"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase">
          Scroll
        </span>
        <motion.span
          animate={calm ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </a>
    </section>
  );
}
