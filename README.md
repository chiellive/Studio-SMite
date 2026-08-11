# Studio SMITE

The website for Studio SMITE, a web development and design studio founded by
Chiel Smets. Dark, fast and built from scratch on a modern stack.

Live sections: a high impact home page, an info page telling the studio story,
and an interactive contact page.

## Stack

| Layer      | Choice                                     |
| ---------- | ------------------------------------------ |
| Framework  | Next.js 16 (App Router, TypeScript)        |
| Styling    | Tailwind CSS v4                            |
| Components | shadcn/ui on Radix primitives              |
| Icons      | lucide-react                               |
| Motion     | Framer Motion                              |
| Confetti   | canvas-confetti                            |

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The dev server runs on http://localhost:3000.

Other scripts:

```bash
npm run build
```

```bash
npx eslint .
```

## Project structure

```
src/
  app/                 routes: / , /info , /contact , plus robots and sitemap
  components/
    home/              hero, highlights, services, process, aftercare, CTA
    about/             stats, founder, principles
    contact/           the contact form
    site/              nav, footer, cursor ring, terminal, reveal helpers
    ui/                shadcn primitives
  lib/
    site.ts            studio details, nav items, form options
    confetti.ts        confetti bursts
```

Copy that appears in more than one place (studio name, email, tagline, and the
two aftercare prices) lives in `src/lib/site.ts`. Change a price there once and
the home page, the contact form and the terminal all follow.

## Design tokens

The palette is defined in `src/app/globals.css`. Two custom properties drive
every accent in the theme:

- `--neon` cyan `#00f0ff`
- `--neon-alt` violet `#8b5cf6`

Both are registered with `@property`, which is what lets the Konami easter egg
animate them smoothly through the spectrum. The site is dark only, so `:root`
and `.dark` carry the same values and `<html>` always ships the `dark` class.

## Contact form delivery

The form works with no backend. On submit it opens a prefilled email in the
visitor's mail client, addressed to the studio.

To post to a real endpoint instead, set an environment variable:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-endpoint.example/api/contact
```

When that is set the form sends a JSON body with `name`, `email`,
`projectType`, `aftercare` (`care`, `hosting`, `unsure` or empty) and
`message`, and the success copy changes to match.

## Hidden details

- `Ctrl + K` or `Cmd + K` opens a command terminal. So does the small prompt
  icon in the footer. Type `help` to list the documented commands, and note the
  line about undocumented ones.
- The Konami code (up, up, down, down, left, right, left, right, B, A) flips
  the whole theme into an animated spectrum mode with confetti.
- The footer runs a live local clock next to a pulsing status LED.

## Accessibility and motion

Everything respects `prefers-reduced-motion`: parallax, the marquee, scroll
reveals, the custom cursor and confetti all stand down when it is set. The
custom cursor is only used on devices with a fine pointer.

## Deployment

Every route is statically prerendered, so the site can be hosted anywhere that
serves a Next.js build. Vercel needs no configuration beyond importing the
repository.
