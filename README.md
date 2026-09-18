# Jåttå Gårdsbryggeri B2B Customer Portal

Demonstration prototype and scoping documents for a B2B trade ordering portal for Jåttå
Gårdsbryggeri, an independent craft brewery in Jåttåvågen, Stavanger.

## Running it

```
npm install
npm run dev            # development server
npm run build          # static build into dist/
npm run publish:pages  # build, then refresh the copy GitHub Pages serves
```

The build is static and uses hash routing, so it can be dropped on any host and deep links still
work without server rewrite rules.

**Publishing.** GitHub Pages serves this repository's root, so the built `index.html` and `assets/`
are committed there. Run `npm run publish:pages` after any change, then commit. Running only
`npm run build` will not update the live site. The Vite source entry is `app/index.html`, kept out
of the root so it cannot collide with the published build.

Live: https://salesteam-create.github.io/jatta-customer-portal/

## What this is

A clickable demo, not the product. There is no backend, no authentication and no payment. All data
comes from fixtures in `src/data/` and lives in browser state. The real portal will be built on
WordPress and WooCommerce as a separate piece of work.

Use the demo bar at the top of the page to switch between a public visitor and each trade customer.
That is the fastest way to show the same catalogue at three different discount rates.

## Documents

| File | What it is |
|---|---|
| `docs/BRD-b2b-customer-portal.md` | Business requirements. Scope, users, functional requirements, out of scope, open questions, acceptance criteria. |
| `docs/build-estimate.md` | Internal effort estimate for the prototype, plus an indicative figure for the production WooCommerce build. Not a client quote. |
| `CLAUDE.md` | Build context, constraints, and what content is real versus invented. |

## Before showing it to the client

Prices are invented, as are the trade customer names. Every ABV shown is 4,7 % because that is what
every supplied asset prints, which is almost certainly a placeholder.

Note also that the source designs caption each can with another product's name and style. Product
data here is taken from the label artwork instead. `CLAUDE.md` lists exactly what is real and what
still needs confirming, and `docs/BRD-b2b-customer-portal.md` section 9 has the open questions.
