"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const steps = [
  {
    index: "01",
    title: "We talk",
    body: "A short call or a few emails about what your business needs from the site, who has to find it, and what a good result would look like for you.",
  },
  {
    index: "02",
    title: "You see it early",
    body: "You get a link to the real design in your own browser, well before it goes live. Say what you like and what you do not, and it gets changed.",
  },
  {
    index: "03",
    title: "I build it",
    body: "The site gets built properly and checked on phones, tablets and computers, so it looks right and works wherever your customers open it.",
  },
  {
    index: "04",
    title: "We go live",
    body: "Your site goes online, I check that it loads quickly and fix anything that needs it. The website and everything in it belongs to you.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });

  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 1, 1]);

  return (
    <section className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="hairline-grid mask-fade-edges pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From first email to live website, in four steps."
          description="No long meetings and no confusing paperwork. You see progress every week, and you always deal with the same person."
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
          {/* progress rail */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-white/8 sm:left-[15px]"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-neon via-neon-alt to-transparent"
              style={{ scaleY: lineScale, opacity: glowOpacity }}
            />
          </div>

          <ol className="space-y-12 sm:space-y-14">
            {steps.map((step, i) => (
              <li key={step.index} className="relative">
                <span
                  aria-hidden
                  className="absolute top-2 -left-8 size-[15px] rounded-full border border-neon/40 bg-background sm:-left-12"
                >
                  <span className="absolute inset-[3px] rounded-full bg-neon shadow-[0_0_14px_2px_var(--neon)]" />
                </span>

                <Reveal delay={i * 0.05}>
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="font-mono text-xs tracking-[0.2em] text-neon">
                      {step.index}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
