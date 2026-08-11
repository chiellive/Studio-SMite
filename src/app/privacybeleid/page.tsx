import type { Metadata } from "next";
import Link from "next/link";

import {
  Identity,
  LegalLayout,
  LegalList,
  LegalSection,
} from "@/components/legal/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Studio SMITE omgaat met je persoonsgegevens: wat er verzameld wordt via het contactformulier, waarom, hoelang het bewaard blijft en welke rechten je hebt.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Privacy"
      title={
        <>
          Wat er met{" "}
          <span className="text-gradient-neon">jouw gegevens</span> gebeurt.
        </>
      }
      intro="Kort samengevat: ik verzamel alleen wat je zelf invult op het contactformulier, ik gebruik het enkel om je te antwoorden, en ik geef het aan niemand door."
    >
      <LegalSection title="Wie is verantwoordelijk?">
        <Identity />
      </LegalSection>

      <LegalSection title="Welke gegevens verzamel ik?">
        <p>
          Alleen wat je zelf doorgeeft via het contactformulier of via e-mail:
        </p>
        <LegalList
          items={[
            "Je naam",
            "Je e-mailadres",
            "Wat voor website je zoekt en of je nazorg wil",
            "Het budget dat je aanduidt, als je dat invult",
            "De inhoud van je bericht",
          ]}
        />
        <p>
          Deze website plaatst geen cookies en gebruikt geen bezoekersstatistieken.
          Er wordt dus niets over je surfgedrag bijgehouden. Meer daarover in het{" "}
          <Link
            href="/cookiebeleid"
            className="text-neon underline-offset-4 hover:underline"
          >
            cookiebeleid
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Waarom verwerk ik die gegevens?">
        <LegalList
          items={[
            "Om te antwoorden op je vraag of je prijsaanvraag. Dat is de reden waarom je het formulier invult, en de verwerking gebeurt op basis van die precontractuele relatie.",
            "Om, als we samenwerken, de opdracht en de facturatie op te volgen. Dat volgt uit de overeenkomst zelf en uit de wettelijke boekhoudverplichtingen.",
          ]}
        />
        <p>
          Ik gebruik je gegevens nooit voor een nieuwsbrief, reclame of
          verkooptelefoontjes.
        </p>
      </LegalSection>

      <LegalSection title="Hoelang blijven ze bewaard?">
        <LegalList
          items={[
            "Aanvragen die niet tot een samenwerking leiden: maximaal 12 maanden.",
            "Klantgegevens: zolang de boekhoudwetgeving dat vraagt, in België doorgaans 7 jaar.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Deel ik gegevens met anderen?">
        <p>
          Enkel met de partijen die nodig zijn om de website en de e-mail te
          laten werken, zoals de hostingprovider en de e-mailprovider. Dat
          gebeurt binnen de Europese Unie of met passende waarborgen. Je
          gegevens worden nooit verkocht of doorgegeven voor reclame.
        </p>
      </LegalSection>

      <LegalSection title="Jouw rechten">
        <p>
          Je hebt het recht om je gegevens in te kijken, te laten verbeteren of
          te laten wissen. Je kan de verwerking ook laten beperken, er bezwaar
          tegen maken, of je gegevens laten overdragen.
        </p>
        <p>
          Stuur daarvoor een bericht naar{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-neon underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          . Je krijgt binnen een maand antwoord. Ben je niet tevreden met hoe je
          vraag behandeld wordt, dan kan je klacht indienen bij de Belgische
          Gegevensbeschermingsautoriteit via gegevensbeschermingsautoriteit.be.
        </p>
      </LegalSection>

      <LegalSection title="Beveiliging">
        <p>
          De website werkt volledig over een beveiligde verbinding en de
          gegevens uit het contactformulier komen rechtstreeks in mijn mailbox
          terecht. Er staat geen klantendatabank op deze website.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
