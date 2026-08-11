import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalLayout,
  LegalList,
  LegalSection,
} from "@/components/legal/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description:
    "Deze website plaatst geen cookies en houdt geen bezoekersstatistieken bij. Lees hier wat dat betekent en wat er zou veranderen als daar ooit iets bij komt.",
};

export default function CookiePage() {
  return (
    <LegalLayout
      eyebrow="Cookies"
      title={
        <>
          Deze site plaatst{" "}
          <span className="text-gradient-neon">geen cookies</span>.
        </>
      }
      intro="Geen banner die je moet wegklikken, want er valt niets te aanvaarden. Hieronder staat precies wat dat inhoudt."
    >
      <LegalSection title="Wat zijn cookies?">
        <p>
          Cookies zijn kleine bestandjes die een website op je toestel bewaart.
          Sommige zijn nodig om een site te laten werken, bijvoorbeeld om je
          aangemeld te houden. Andere volgen je surfgedrag op om statistieken bij
          te houden of reclame te tonen.
        </p>
      </LegalSection>

      <LegalSection title="Wat gebruikt deze website?">
        <p>
          Niets van dat alles. Deze website plaatst geen enkele cookie, ook geen
          noodzakelijke, en bewaart niets op je toestel.
        </p>
        <LegalList
          items={[
            "Geen bezoekersstatistieken zoals Google Analytics.",
            "Geen advertentie- of volgpixels.",
            "Geen knoppen of insluitingen van sociale media die je gedrag doorgeven.",
            "De lettertypes worden vanaf deze website zelf geladen, niet bij een externe partij.",
          ]}
        />
        <p>
          Daarom zie je bij je eerste bezoek ook geen cookiebanner. Die is
          wettelijk pas verplicht zodra een site meer plaatst dan strikt
          noodzakelijk, en dat is hier niet het geval.
        </p>
      </LegalSection>

      <LegalSection title="Wat wordt er dan wel bijgehouden?">
        <p>
          Enkel wat je zelf invult op het contactformulier. De hostingprovider
          houdt daarnaast technische serverlogs bij, zoals elke website. Die
          dienen om storingen en misbruik op te sporen en worden niet gebruikt om
          bezoekers te volgen of te profileren.
        </p>
      </LegalSection>

      <LegalSection title="En als dat verandert?">
        <p>
          Komt er later toch een meetsysteem bij, dan verschijnt er eerst een
          banner die je toestemming vraagt, en wordt er niets geplaatst voor je
          die geeft. Deze pagina wordt dan meteen aangepast, met de datum
          bovenaan als bewijs.
        </p>
      </LegalSection>

      <LegalSection title="Vragen?">
        <p>
          Stuur gerust een bericht naar{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-neon underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          . Wat er met je persoonsgegevens gebeurt, staat in de{" "}
          <Link
            href="/privacybeleid"
            className="text-neon underline-offset-4 hover:underline"
          >
            privacyverklaring
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
