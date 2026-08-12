import type { Metadata } from "next";
import Link from "next/link";

import {
  Identity,
  LegalLayout,
  LegalSection,
} from "@/components/legal/legal-layout";
import { legal, plans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van Studio SMITE: offertes, levering, prijzen en betaling, eigendom van de website, nazorg, aansprakelijkheid en toepasselijk recht.",
};

const [care, hosting] = plans;

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Voorwaarden"
      title={
        <>
          De afspraken,{" "}
          <span className="text-gradient-neon">op voorhand duidelijk</span>.
        </>
      }
      intro="Geen kleine lettertjes die je pas achteraf tegenkomt. Dit is wat er geldt van zodra je een offerte aanvaardt."
    >
      <LegalSection title="1. Wie ik ben">
        <Identity />
      </LegalSection>

      <LegalSection title="2. Waarop deze voorwaarden van toepassing zijn">
        <p>
          Deze voorwaarden gelden voor elke offerte, overeenkomst en dienst van{" "}
          {legal.tradeName} aan een klant, tenzij we schriftelijk iets anders
          afspreken.
        </p>
      </LegalSection>

      <LegalSection title="3. Offerte en overeenkomst">
        <p>
          Een offerte blijft 30 dagen geldig, tenzij er iets anders op vermeld
          staat. De overeenkomst komt tot stand zodra je de offerte schriftelijk
          aanvaardt. Een bevestiging per e-mail volstaat daarvoor.
        </p>
      </LegalSection>

      <LegalSection title="4. Levering en medewerking">
        <p>
          Om de afgesproken datum te halen heb ik tijdig je teksten, foto&apos;s,
          toegangen en feedback nodig. Loopt dat vertraging op langs jouw kant,
          dan schuift de opleverdatum mee op, zonder dat {legal.tradeName}{" "}
          daarvoor aansprakelijk is.
        </p>
      </LegalSection>

      <LegalSection title="5. Prijs en betaling">
        <p>
          Alle prijzen staan in euro. {legal.vatNote} Facturen zijn betaalbaar
          binnen 14 dagen na factuurdatum.
        </p>
        <p>
          Bij laattijdige betaling is van rechtswege en zonder ingebrekestelling
          de wettelijke intrestvoet verschuldigd, samen met een forfaitaire
          schadevergoeding van 10% van het openstaande bedrag, met een minimum
          van 40 euro.
        </p>
      </LegalSection>

      <LegalSection title="6. Eigendom en oplevering">
        <p>
          Zodra de factuur volledig betaald is, is de opgeleverde website van
          jou, inclusief de broncode voor zover die van toepassing is. Tot dan
          blijft het geleverde werk eigendom van {legal.tradeName}.
        </p>
      </LegalSection>

      <LegalSection title="7. Nazorg en hosting">
        <p>
          Kies je voor het {care.name.toLowerCase()} ({care.price}{" "}
          {care.period}) of voor {hosting.name.toLowerCase()} ({hosting.price}{" "}
          {hosting.period}), dan gelden de voorwaarden zoals ze op de{" "}
          <Link
            href="/#aftercare"
            className="text-neon underline-offset-4 hover:underline"
          >
            nazorgsectie
          </Link>{" "}
          van deze website beschreven staan. Die formules lopen per jaar en
          worden stilzwijgend verlengd, tenzij je minstens een maand voor de
          vervaldag laat weten dat je stopt.
        </p>
        <p>
          Wijzigingen aan de tarieven of de inhoud van deze formules worden
          minstens 30 dagen op voorhand gemeld.
        </p>
      </LegalSection>

      <LegalSection title="8. Aansprakelijkheid">
        <p>
          De dienst wordt met de nodige zorgvuldigheid geleverd.{" "}
          {legal.tradeName} is niet aansprakelijk voor onrechtstreekse schade,
          gederfde winst of gegevensverlies, behalve bij opzet of een grove
          fout. De aansprakelijkheid blijft in elk geval beperkt tot het bedrag
          van de betrokken factuur.
        </p>
      </LegalSection>

      <LegalSection title="9. Herroepingsrecht">
        <p>
          Sluit je als consument een overeenkomst op afstand, dan geldt in
          principe een bedenktijd van 14 dagen. Omdat maatwerk vaak al begint
          voor die termijn voorbij is, wordt je gevraagd om uitdrukkelijk te
          bevestigen dat je dat recht verliest zodra het werk start, zoals
          voorzien in artikel VI.53, 3° van het Wetboek economisch recht.
        </p>
      </LegalSection>

      <LegalSection title="10. Toepasselijk recht en geschillen">
        <p>
          Op alle overeenkomsten is het Belgisch recht van toepassing. Bij een
          geschil zijn de rechtbanken bevoegd van het gerechtelijk
          arrondissement waar {legal.tradeName} haar zetel heeft
          {legal.jurisdiction ? `, ${legal.jurisdiction}` : ""}.
        </p>
        <p>
          Loopt er iets mis, laat het dan eerst gewoon weten. In de praktijk
          raakt zowat alles opgelost met één telefoongesprek.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
