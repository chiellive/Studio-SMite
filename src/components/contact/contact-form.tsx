"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import Link from "next/link";
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
import {
  buildBudgets,
  plans,
  projectTypes,
  site,
  web3formsKey,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type AftercareOption = {
  id: string;
  name: string;
  price: string | null;
  standardPrice: string | null;
  summary: string;
};

const aftercareOptions: AftercareOption[] = [
  ...plans.map((plan) => ({
    id: plan.id as string,
    name: plan.name as string,
    price: `${plan.price} ${plan.period}`,
    standardPrice: plan.standardPrice as string | null,
    summary: plan.summary as string,
  })),
  {
    id: "unsure",
    name: "Weet ik nog niet",
    price: null,
    standardPrice: null,
    summary: "Leg het me uit en ik zeg je welke van de twee bij jou past.",
  },
];

function aftercareLabel(id: string) {
  if (!id) return "Niet gevraagd";
  const option = aftercareOptions.find((entry) => entry.id === id);
  if (!option) return "Niet gevraagd";
  return option.price ? `${option.name} (${option.price})` : option.name;
}

/** Web3Forms bezorgt het bericht per e-mail, zonder eigen server. */
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "sent";

type Fields = {
  name: string;
  email: string;
  projectType: string;
  aftercare: string;
  buildBudget: string;
  message: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  projectType: "",
  aftercare: "",
  buildBudget: "",
  message: "",
};

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};

  if (!fields.name.trim()) errors.name = "Laat weten wie je bent.";
  if (!fields.email.trim()) {
    errors.email = "Een e-mailadres is nodig.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
    errors.email = "Dat adres lijkt niet te kloppen.";
  }
  if (!fields.projectType) errors.projectType = "Kies wat er het dichtst bij komt.";

  // Zonder zorgpakket is de bouw de hele opdracht, dus dat budget is het enige
  // dat nodig is om er zinnig op te kunnen antwoorden.
  if (fields.aftercare === "hosting" && !fields.buildBudget) {
    errors.buildBudget = "Kies een vork zodat ik deftig kan antwoorden.";
  }

  if (fields.message.trim().length < 12) {
    errors.message = "Een zin of twee over wat je nodig hebt, graag.";
  }

  return errors;
}

function buildMailto(fields: Fields) {
  const subject = `Website-aanvraag van ${fields.name}`;
  const body = [
    `Naam: ${fields.name}`,
    `E-mail: ${fields.email}`,
    `Op zoek naar: ${fields.projectType}`,
    `Nazorg: ${aftercareLabel(fields.aftercare)}`,
    fields.aftercare === "hosting"
      ? `Budget voor de bouw: ${fields.buildBudget}`
      : null,
    "",
    fields.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

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
  const [sendFailed, setSendFailed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  // Van optie wisselen wist het budget weer, zodat een oud bedrag nooit kan
  // meeliften in de e-mail.
  const chooseAftercare = (id: string) => {
    setFields((current) => ({
      ...current,
      aftercare: id,
      buildBudget: id === "hosting" ? current.buildBudget : "",
    }));
    setErrors((current) => ({ ...current, buildBudget: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;

    const found = validate(fields);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }

    // Verborgen veld dat alleen een bot invult. Web3Forms weigert het bericht
    // zodra hier iets in staat.
    const honeypot =
      (event.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)
        ?.value ?? "";

    setStatus("sending");
    setSendFailed(false);
    setMailtoHref(buildMailto(fields));

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Website-aanvraag van ${fields.name}`,
          from_name: "Studio SMITE",
          replyto: fields.email,
          botcheck: honeypot,
          Naam: fields.name,
          "E-mail": fields.email,
          "Op zoek naar": fields.projectType,
          Nazorg: aftercareLabel(fields.aftercare),
          "Budget voor de bouw":
            fields.aftercare === "hosting"
              ? fields.buildBudget
              : "Niet van toepassing",
          Bericht: fields.message,
        }),
      });

      const result: unknown = await response.json().catch(() => null);
      const ok =
        response.ok &&
        typeof result === "object" &&
        result !== null &&
        (result as { success?: boolean }).success === true;

      if (!ok) throw new Error("Web3Forms weigerde het bericht");
    } catch {
      // Niet doen alsof het gelukt is: toon de fout en bied de mailterugval aan.
      setStatus("idle");
      setSendFailed(true);
      return;
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
    setSendFailed(false);
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
              Bericht verzonden.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Bedankt {fields.name.split(" ")[0]}, het is goed aangekomen. Je
              krijgt antwoord van {site.email}, meestal binnen een dag.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Nog een bericht sturen
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
            {/* Lokaas voor bots. Mensen zien dit veld nooit, invulprogramma's wel. */}
            <input
              type="text"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              defaultValue=""
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                id="name"
                label="Je naam"
                error={errors.name}
                hint="Hoe mag ik je noemen?"
              >
                <Input
                  id="name"
                  name="name"
                  value={fields.name}
                  onChange={(event) => set("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  placeholder="Jan Peeters"
                  autoComplete="name"
                  className="h-11 bg-black/25 px-3.5"
                />
              </Field>

              <Field
                id="email"
                label="Je e-mailadres"
                error={errors.email}
                hint="Daar stuur ik het antwoord naartoe."
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={(event) => set("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  placeholder="jan@bedrijf.be"
                  autoComplete="email"
                  className="h-11 bg-black/25 px-3.5"
                />
              </Field>
            </div>

            <Field
              id="projectType"
              label="Wat heb je nodig?"
              error={errors.projectType}
              hint="Wat er het dichtst bij komt volstaat."
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
                  <SelectValue placeholder="Kies een optie" />
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
              <legend className="text-sm leading-none font-medium">
                Nadien online houden
              </legend>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Optioneel. Je kan dit ook later nog beslissen.
              </p>

              <div className="mt-3 grid gap-2.5">
                {aftercareOptions.map((option) => {
                  const active = fields.aftercare === option.id;
                  const inputId = `aftercare-${option.id}`;

                  return (
                    <label
                      key={option.id}
                      htmlFor={inputId}
                      className={cn(
                        "flex cursor-pointer items-start gap-3.5 rounded-2xl border px-4 py-3.5 transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-neon/60",
                        active
                          ? "border-neon/45 bg-neon/12 shadow-[0_0_28px_-10px_var(--neon)]"
                          : "border-white/10 bg-black/25 hover:border-white/25",
                      )}
                    >
                      <input
                        id={inputId}
                        type="radio"
                        name="aftercare"
                        value={option.id}
                        checked={active}
                        onChange={() => chooseAftercare(option.id)}
                        className="sr-only"
                      />

                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                          active
                            ? "border-neon bg-neon"
                            : "border-white/25 bg-transparent",
                        )}
                      >
                        {active ? (
                          <span className="size-2 rounded-full bg-[#04141a]" />
                        ) : null}
                      </span>

                      <span className="min-w-0">
                        <span className="flex flex-wrap items-baseline gap-x-2 text-sm font-medium">
                          {option.name}
                          {option.price ? (
                            <span className="text-neon">{option.price}</span>
                          ) : null}
                          {option.standardPrice ? (
                            <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
                              {option.standardPrice}
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {option.summary}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              <AnimatePresence initial={false} mode="wait">
                {fields.aftercare === "hosting" ? (
                  <motion.div
                    key="budget"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p
                        id="build-budget-label"
                        className="text-sm font-medium"
                      >
                        Budget om de website te bouwen
                      </p>
                      {errors.buildBudget ? (
                        <span role="alert" className="text-xs text-destructive">
                          {errors.buildBudget}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      Zonder zorgpakket is er geen korting op de bouw, dus dit
                      is het stuk dat bepaalt wat er mogelijk is.
                    </p>

                    <div
                      role="radiogroup"
                      aria-labelledby="build-budget-label"
                      className="mt-3 flex flex-wrap gap-2"
                    >
                      {buildBudgets.map((tier) => {
                        const picked = fields.buildBudget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            role="radio"
                            aria-checked={picked}
                            onClick={() => set("buildBudget", tier)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neon/60",
                              picked
                                ? "border-neon/45 bg-neon/15 text-foreground shadow-[0_0_24px_-8px_var(--neon)]"
                                : "border-white/10 bg-black/30 text-muted-foreground hover:border-white/25 hover:text-foreground",
                            )}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : null}

              </AnimatePresence>
            </fieldset>

            <Field
              id="message"
              label="Vertel er iets over"
              error={errors.message}
              hint="In je eigen woorden. Technische details hoeven niet."
            >
              <Textarea
                id="message"
                name="message"
                value={fields.message}
                onChange={(event) => set("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                placeholder="We hebben een kleine bakkerij en onze website is oud en traag. We zouden graag iets hebben dat onze producten, onze openingsuren en waar we te vinden zijn duidelijk toont."
                rows={5}
                className="min-h-32 resize-y bg-black/25 px-3.5 py-3"
              />
            </Field>

            {sendFailed ? (
              <div
                role="alert"
                className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm leading-relaxed"
              >
                <p className="font-medium text-destructive">
                  Het versturen is niet gelukt.
                </p>
                <p className="mt-1 text-muted-foreground">
                  Waarschijnlijk hapert de verbinding. Probeer het zo nog eens,
                  of{" "}
                  <a
                    href={mailtoHref}
                    className="text-neon underline-offset-4 hover:underline"
                  >
                    stuur het als gewone e-mail
                  </a>
                  , dan is alles al voor je ingevuld.
                </p>
              </div>
            ) : null}

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
                      Verstuur bericht
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
                      Bezig met verzenden
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

              <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                Je gegevens gebruik ik enkel om op je vraag te antwoorden. Geen
                nieuwsbrief, geen spam, geen verkooptelefoontjes. Lees hoe ik
                ermee omga in de{" "}
                <Link
                  href="/privacybeleid"
                  className="text-neon underline-offset-4 hover:underline"
                >
                  privacyverklaring
                </Link>
                .
              </p>
            </div>

            <p aria-live="polite" className="sr-only">
              {status === "sending" ? "Je bericht wordt verzonden" : ""}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Label boven het veld, uitleg eronder.
 *
 * Label en uitleg stonden eerst naast elkaar, maar in de kolom van 183 pixels
 * die naam en e-mail bij 1024 breed krijgen past dat niet, waardoor de ene
 * regel wel en de andere niet omsloeg en de velden scheef kwamen te staan.
 * Onder het veld past de uitleg op elke breedte op één regel, en een foutmelding
 * neemt diezelfde plek in zonder de rest te verschuiven.
 */
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
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p role="alert" className="text-xs leading-relaxed text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs leading-relaxed text-muted-foreground/70">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
