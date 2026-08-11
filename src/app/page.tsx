import { Aftercare } from "@/components/home/aftercare";
import { CtaBand } from "@/components/home/cta-band";
import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <Services />
      <Process />
      <Aftercare />
      <CtaBand />
    </>
  );
}
