import type { Metadata } from "next";

import { Founder } from "@/components/about/founder";
import { Principles } from "@/components/about/principles";
import { Stats } from "@/components/about/stats";
import { CtaBand } from "@/components/home/cta-band";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Info",
  description:
    "Studio SMITE is de eenmansstudio van Chiel Smets, student-zelfstandige uit België. Websites van nul gebouwd voor kleine bedrijven, met duidelijke prijzen en zonder jargon.",
};

export default function InfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Info"
        title={
          <>
            Klein studio,{" "}
            <span className="text-gradient-neon">hoge lat</span>.
          </>
        }
        description={
          <>
            Studio SMITE bouwt websites op maat voor kleine bedrijven, van de
            eerste schets tot het onderhoud erna.
            <br />
            Hier lees je precies met wie je werkt en hoe het loopt.
          </>
        }
      />

      <Stats />
      <Founder />
      <Principles />
      <CtaBand />
    </>
  );
}
