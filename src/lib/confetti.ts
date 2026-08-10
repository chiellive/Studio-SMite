const NEON = ["#00f0ff", "#8b5cf6", "#a78bfa", "#22d3ee", "#ffffff"];
const SPECTRUM = [
  "#ff5a6e",
  "#ffd23f",
  "#7cff5a",
  "#00f0ff",
  "#8b5cf6",
  "#ff5ad2",
];

function prefersCalm() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** canvas-confetti is loaded on demand so it stays out of the initial bundle. */
async function load() {
  const mod = await import("canvas-confetti");
  return mod.default;
}

/** Short cyan/violet burst, used when the contact form is submitted. */
export async function neonBurst(origin?: { x: number; y: number }) {
  if (prefersCalm()) return;
  const confetti = await load();
  const from = origin ?? { x: 0.5, y: 0.6 };

  confetti({
    particleCount: 70,
    spread: 68,
    startVelocity: 42,
    scalar: 0.9,
    ticks: 200,
    colors: NEON,
    origin: from,
    disableForReducedMotion: true,
  });

  window.setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 110,
      startVelocity: 26,
      decay: 0.92,
      scalar: 0.7,
      ticks: 160,
      colors: NEON,
      origin: from,
      disableForReducedMotion: true,
    });
  }, 130);
}

/** Wide, longer celebration for the Konami easter egg. */
export async function rainbowBlast() {
  if (prefersCalm()) return;
  const confetti = await load();
  const end = Date.now() + 1400;

  confetti({
    particleCount: 140,
    spread: 130,
    startVelocity: 48,
    ticks: 260,
    colors: SPECTRUM,
    origin: { x: 0.5, y: 0.4 },
    disableForReducedMotion: true,
  });

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.75 },
      colors: SPECTRUM,
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.75 },
      colors: SPECTRUM,
      disableForReducedMotion: true,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}
