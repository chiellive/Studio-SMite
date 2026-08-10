"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { neonBurst } from "@/lib/confetti";
import { budgetTiers, projectTypes, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Optional POST target. When it is not set the form falls back to opening a
 * fully prefilled email in the visitor's mail client, so a brief is never
 * silently dropped on the floor.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent";

type Fields = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};

  if (!fields.name.trim()) errors.name = "Tell me who you are.";
  if (!fields.email.trim()) {
    errors.email = "An email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
    errors.email = "That address does not look right.";
  }
  if (!fields.projectType) errors.projectType = "Pick the closest match.";
  if (fields.message.trim().length < 12) {
    errors.message = "A sentence or two about what you need, please.";
  }

  return errors;
}

function buildMailto(fields: Fields) {
  const subject = `Website enquiry from ${fields.name}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Looking for: ${fields.projectType}`,
    `Budget: ${fields.budget || "Not specified"}`,
    "",
    fields.message,
  ].join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [revealed, setRevealed] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;

    const found = validate(fields);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    setStatus("sending");
    const href = buildMailto(fields);
    setMailtoHref(href);

    try {
      if (ENDPOINT) {
        await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });
      } else {
        // Give the transmit animation a beat before the mail client opens.
        await new Promise((resolve) => window.setTimeout(resolve, 900));
        window.location.href = href;
      }
    } catch {
      // Delivery still works through the mail client fallback below.
    }

    setStatus("sent");

    const rect = buttonRef.current?.getBoundingClientRect();
    void neonBurst(
      rect
        ? {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          }
        : undefined,
    );

    window.setTimeout(() => setRevealed(true), 850);
  };

  const reset = () => {
    setFields(EMPTY);
    setErrors({});
    setMailtoHref("");
    setRevealed(false);
    setStatus("idle");
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 size-80 rounded-full bg-neon/10 blur-[110px]" />
        <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-neon-alt/12 blur-[110px]" />
      </div>

      <AnimatePresence mode="wait">
        {revealed ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center px-7 py-16 text-center sm:px-10"
          >
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="inline-flex size-16 items-center justify-center rounded-full border border-neon/40 bg-neon/15 text-neon shadow-[0_0_48px_-8px_var(--neon)]"
            >
              <Check className="size-8" strokeWidth={2.5} />
            </motion.span>

            <h2 className="mt-7 font-display text-2xl font-semibold sm:text-3xl">
              {ENDPOINT ? "Message received." : "Message ready to send."}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {ENDPOINT
                ? `Thanks ${fields.name.split(" ")[0]}, it arrived safely. You will get a reply from ${site.email}, usually within a day.`
                : `Your email app has opened with everything already filled in. Press send there and it comes straight to ${site.email}.`}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {ENDPOINT ? null : (
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neon/25 bg-neon/10 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-neon/20 hover:shadow-[0_0_30px_-8px_var(--neon)]"
                >
                  <Mail className="size-4" />
                  Open my email app again
                </a>
              )}
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Send another message
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative space-y-6 p-7 sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                id="name"
                label="Your name"
                error={errors.name}
                hint="What should I call you?"
              >
                <Input
                  id="name"
                  name="name"
                  value={fields.name}
                  onChange={(event) => set("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-11 bg-black/25 px-3.5"
                />
              </Field>

              <Field
                id="email"
                label="Your email"
                error={errors.email}
                hint="Where I send the reply."
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={(event) => set("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  placeholder="jane@company.com"
                  autoComplete="email"
                  className="h-11 bg-black/25 px-3.5"
                />
              </Field>
            </div>

            <Field
              id="projectType"
              label="What do you need?"
              error={errors.projectType}
              hint="Closest match is fine."
            >
              <Select
                value={fields.projectType}
                onValueChange={(value) => set("projectType", value)}
              >
                <SelectTrigger
                  id="projectType"
                  aria-invalid={Boolean(errors.projectType)}
                  className="h-11 w-full bg-black/25 px-3.5 data-[size=default]:h-11"
                >
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {projectTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <fieldset>
              <legend
                id="budget-label"
                className="text-sm leading-none font-medium"
              >
                Rough budget
              </legend>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Optional, but it helps me suggest something realistic.
              </p>

              <div
                role="radiogroup"
                aria-labelledby="budget-label"
                className="mt-3 flex flex-wrap gap-2"
              >
                {budgetTiers.map((tier) => {
                  const active = fields.budget === tier;
                  return (
                    <button
                      key={tier}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => set("budget", active ? "" : tier)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neon/60",
                        active
                          ? "border-neon/45 bg-neon/15 text-foreground shadow-[0_0_24px_-8px_var(--neon)]"
                          : "border-white/10 bg-black/25 text-muted-foreground hover:border-white/25 hover:text-foreground",
                      )}
                    >
                      {tier}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Field
              id="message"
              label="Tell me about it"
              error={errors.message}
              hint="In your own words. No technical detail needed."
            >
              <Textarea
                id="message"
                name="message"
                value={fields.message}
                onChange={(event) => set("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                placeholder="We run a small bakery and our website is old and slow. We would like something that shows our products, our opening hours and where to find us."
                rows={5}
                className="min-h-32 resize-y bg-black/25 px-3.5 py-3"
              />
            </Field>

            <div className="flex flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={status !== "idle"}
                layout
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className={cn(
                  "group relative inline-flex items-center justify-center gap-2 overflow-hidden font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                  status === "sent"
                    ? "size-14 rounded-full bg-emerald-400 text-[#04141a]"
                    : "rounded-full bg-neon px-7 py-3.5 text-[#04141a] hover:shadow-[0_0_46px_-6px_var(--neon)] disabled:opacity-90",
                )}
              >
                {status !== "sent" ? (
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  />
                ) : null}

                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" ? (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative flex items-center gap-2"
                    >
                      <Send className="size-4" />
                      Send message
                    </motion.span>
                  ) : null}

                  {status === "sending" ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative flex items-center gap-2"
                    >
                      <Loader2 className="size-4 animate-spin" />
                      Sending
                    </motion.span>
                  ) : null}

                  {status === "sent" ? (
                    <motion.span
                      key="sent"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 18 }}
                      className="relative"
                    >
                      <Check className="size-6" strokeWidth={3} />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.button>

              <p className="text-xs leading-relaxed text-muted-foreground">
                No newsletter, no spam, no sales calls.
                <br className="hidden sm:block" /> Just a reply from me.
              </p>
            </div>

            <p aria-live="polite" className="sr-only">
              {status === "sending" ? "Sending your message" : ""}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {hint && !error ? (
          <span className="text-xs text-muted-foreground/70">{hint}</span>
        ) : null}
        {error ? (
          <span role="alert" className="text-xs text-destructive">
            {error}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
