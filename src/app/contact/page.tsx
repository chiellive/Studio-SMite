import type { Metadata } from "next";
import { Clock, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/site/reveal";
import { GridBackdrop } from "@/components/site/grid-backdrop";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Studio SMITE. Vertel me over je bedrijf en krijg een duidelijk antwoord over wat je website nodig heeft en wat het kost, meestal binnen een dag.",
};

const steps = [
  {
    title: "Ik lees het zelf",
    body: "Je bericht komt rechtstreeks bij mij terecht. Er zit geen verkoopsteam en geen callcenter tussen.",
  },
  {
    title: "Je krijgt een eerlijk antwoord",
    body: "Meestal binnen een dag: of ik de juiste ben, wat ik zou voorstellen, en ongeveer wat het kost.",
  },
  {
    title: "We leggen de prijs vast",
    body: "Een vaste prijs en een duidelijke einddatum, allebei afgesproken voor er werk begint.",
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <GridBackdrop className="opacity-80" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <Reveal y={16}>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-neon uppercase">
                <span aria-hidden className="h-px w-6 bg-neon/50" />
                Contact
              </span>
            </Reveal>

            <Reveal delay={0.06} y={20}>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl md:text-6xl">
                Laten we iets{" "}
                <span className="text-gradient-neon">straf</span> bouwen.
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={20}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
                Vertel me wat je in gedachten hebt. Je hoeft niets van de
                technische kant te weten, alleen wat jouw bedrijf nodig heeft.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ol className="mt-10 space-y-6">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-neon/30 bg-neon/10 font-mono text-[11px] text-neon">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="font-display text-base font-medium">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-10 space-y-3 border-t border-white/8 pt-8">
                <div className="flex items-center gap-3 text-sm">
                  <dt className="sr-only">E-mail</dt>
                  <Mail className="size-4 shrink-0 text-neon" />
                  <dd>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-muted-foreground transition-colors hover:text-neon"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <dt className="sr-only">Locatie</dt>
                  <MapPin className="size-4 shrink-0 text-neon" />
                  <dd className="text-muted-foreground">{site.location}</dd>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <dt className="sr-only">Antwoordtijd</dt>
                  <Clock className="size-4 shrink-0 text-neon" />
                  <dd className="text-muted-foreground">
                    Meestal antwoord binnen 24 uur
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.1} scale>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
