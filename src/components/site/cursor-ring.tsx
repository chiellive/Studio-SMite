"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor="grow"]';

/**
 * Trailing ring + precise dot that replaces the native cursor on
 * fine-pointer devices. Coarse pointers and reduced-motion users keep
 * their normal cursor.
 */
export function CursorRing() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Spiegels van `visible` en `hot`, zodat de muisafhandelaar kan zien wat de
  // huidige waarde is zonder zichzelf opnieuw te moeten opbouwen.
  const visibleRef = useRef(false);
  const hotRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !calm.matches);

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    // De positie gaat rechtstreeks naar motion values, buiten React om. De
    // dure `closest()` draait hoogstens een keer per frame, en de status wordt
    // alleen in React gezet als ze echt verandert. Anders zou elke muisbeweging
    // een boomdoorloop plus twee state-updates kosten, en dat maakt de
    // hoofdthread traag net wanneer iemand ergens op klikt.
    let frame = 0;
    let latestTarget: EventTarget | null = null;

    const readHover = () => {
      frame = 0;
      const next =
        latestTarget instanceof Element
          ? Boolean(latestTarget.closest(INTERACTIVE_SELECTOR))
          : false;
      if (next !== hotRef.current) {
        hotRef.current = next;
        setHot(next);
      }
    };

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      latestTarget = event.target;
      if (!frame) frame = requestAnimationFrame(readHover);
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onUp);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/*
        Alleen schaal en doorzichtigheid worden geanimeerd, want die twee kan
        de grafische kaart alleen afhandelen. Eerder groeide de ring via
        breedte en hoogte, en dan moet de browser bij elk frame de opmaak van
        de pagina opnieuw doorrekenen. Dat gebeurde telkens als je met de muis
        over een link ging, dus bijna doorlopend.
      */}
      <motion.div
        aria-hidden
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[200] hidden size-[30px] rounded-full border border-neon/70 transition-[background-color,box-shadow] duration-300 md:block",
          hot &&
            "bg-neon/10 shadow-[0_0_28px_-4px_var(--neon),inset_0_0_18px_-8px_var(--neon)]",
        )}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? (hot ? 1 : 0.65) : 0,
          scale: (hot ? 1.93 : 1) * (pressed ? 0.82 : 1),
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden size-1.5 rounded-full bg-neon md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !hot ? 1 : 0, scale: pressed ? 1.6 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
