# Jåttå Gårdsbryggeri B2B Customer Portal

Demonstration prototype and scoping documents for a B2B trade ordering portal for Jåttå
Gårdsbryggeri, an independent craft brewery in Jåttåvågen, Stavanger.

## Running it

```
npm install
npm run dev      # development server
npm run build    # static build into dist/
npm run preview  # serve the built site
```

The build is static and uses hash routing, so `dist/` can be dropped on any host and deep links
still work without server rewrite rules.

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

Prices are invented. So are the trade customer names and some ABVs. `CLAUDE.md` lists exactly what
is real and what still needs confirming.
