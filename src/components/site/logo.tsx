import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
    >
      <defs>
        <linearGradient id="smite-mark" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="var(--neon)" />
          <stop offset="100%" stopColor="var(--neon-alt)" />
        </linearGradient>
      </defs>
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="9"
        stroke="url(#smite-mark)"
        strokeWidth="1.5"
        className="opacity-70"
      />
      <path
        d="M18.4 5.5 8.6 17.2h5.6L13 26.5l9.8-11.7h-5.6l1.2-9.3Z"
        fill="url(#smite-mark)"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display leading-none font-semibold tracking-tight",
        className,
      )}
    >
      <span className="text-muted-foreground">STUDIO</span>{" "}
      <span className="text-foreground">SMITE</span>
    </span>
  );
}
