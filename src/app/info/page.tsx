import type { Metadata } from "next";

import { Founder } from "@/components/about/founder";
import { Principles } from "@/components/about/principles";
import { Stats } from "@/components/about/stats";
import { CtaBand } from "@/components/home/cta-band";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Info",
  description:
    "Studio SMITE is a one-person web studio founded by Chiel Smets. Websites built from scratch for small businesses, with clear prices and no jargon.",
};

export default function InfoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Info"
        title={
          <>
            A small studio with{" "}
            <span className="text-gradient-neon">high standards</span>.
          </>
        }
        description="Studio SMITE builds websites for small businesses that want the job done properly instead of pulled off a shelf. Here is exactly who you are working with, and how it works."
      />

      <Stats />
      <Founder />
      <Principles />
      <CtaBand />
    </>
  );
}
