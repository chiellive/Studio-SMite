"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

const steps = [
  {
    index: "01",
    title: "We praten",
    body: "Een kort gesprek of wat mails over wat jouw bedrijf nodig heeft van de site, wie hem moet vinden, en hoe een goed resultaat er voor jou uitziet.",
  },
  {
    index: "02",
    title: "Jij ziet het vroeg",
    body: "Je krijgt een link naar het echte ontwerp in je eigen browser, ruim voordat het live gaat. Zeg wat je wel en niet goed vindt, en het wordt aangepast.",
  },
  {
    index: "03",
    title: "Ik bouw het",
    body: "De site wordt netjes gebouwd en getest op telefoons, tablets en computers, zodat hij er overal goed uitziet en werkt.",
  },
  {
    index: "04",
    title: "We gaan live",
    body: "Je site komt online, ik controleer of alles snel laadt en los meteen op wat nodig is. De website en alles erin is van jou.",
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
          eyebrow="Hoe het werkt"
          title="Van eerste mail tot live website, in vier stappen."
          description="Geen lange vergaderingen en geen ingewikkelde papieren. Je ziet elke week vooruitgang, en je hebt steeds met dezelfde persoon te maken."
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
