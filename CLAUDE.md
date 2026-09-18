# Jåttå Gårdsbryggeri B2B Customer Portal, demonstration prototype

## What this repository is

A clickable demonstration prototype of a B2B trade ordering portal for Jåttå Gårdsbryggeri, a
brewery. It is a sales asset. Judah will use it to show the client the portal concept while the
proposal is being agreed.

It is **not** the product. The real portal will be built separately on WordPress and WooCommerce.
Nothing in this repository is intended to become production code.

Read `docs/BRD-b2b-customer-portal.md` for the full requirements and `docs/build-estimate.md` for
the effort plan before making design decisions.

## Hard constraints

1. **Everything is mocked.** No backend, no database, no API calls, no real authentication, no
   payment. All data comes from local fixture files. State lives in React state or localStorage.
2. **Static build.** The output must be a static site that deploys to a link with no server.
3. **No WooCommerce, no WordPress, no PHP.** The production build uses them. The prototype does not.
4. **Every path either works or is visibly disabled.** No dead links. If a control is not part of
   the demo, disable it and make that obvious. A client may be handed this link.
5. **Do not invent facts about the client.** If product names, prices, case sizes or customer names
   are not supplied, use the placeholders in the fixtures and flag clearly that they are
   placeholders. Do not present invented detail as if it came from Jåttå.

## Stack

Vite, React, TypeScript, Tailwind CSS, React Router. Chosen for fast setup and a clean static
build. If you have a good reason to change this, say so before changing it.

**The Vite entry is `app/index.html`, not the project root.** GitHub Pages serves this repository's
root, so the built `index.html` is committed there. Two files called `index.html` in the root would
collide and Vite would bundle its own previous output, which is a bug that already happened once.
Because the Vite root is `app/`, Tailwind's automatic content detection does not reach the
components, so `src/index.css` declares its sources explicitly. Do not remove those `@source` lines.

After changing anything, run `npm run publish:pages`, not `npm run build`. The first rebuilds and
refreshes the copy at the repository root that Pages actually serves. The second only writes
`dist/` and the live site will not change.

## The demo story

The prototype exists to tell this sequence. Every build decision should serve it.

1. **Public catalogue.** Products look appealing. No prices anywhere. No add to cart. A visible
   prompt for trade customers to log in.
2. **Login.** Choose a persona. Land back on the catalogue.
3. **Prices appear.** Same page, now priced. Where a discount applies, the standard price is struck
   through with the customer's own price next to it and the discount percentage shown.
4. **Persona switch.** A restaurant and a distributor see different prices on the same product.
   This is the single most important moment in the demo. Make switching persona fast and obvious,
   ideally from the header, so it can be shown live without logging out.
5. **Case ordering.** Quantity is in cases, never single bottles. Stepper control. Add to cart.
6. **Cart and checkout.** Discounted line totals and order total. Delivery address, requested
   delivery date, optional purchase order reference. Submit, then an order confirmation.
7. **Account area.** Reached from a header icon once logged in. Profile, order history with an
   order detail view, and an invoice list with an invoice that reads like a PDF.
8. **Admin view.** A customer list with an editable discount percentage per customer. Changing it
   and then viewing that customer's catalogue shows the new pricing. This answers "how do I control
   it" and is worth building.

## Pricing rules to implement in the mock

- Every product has a standard trade price and a case size of 12, per the delivery rule in the
  designs.
- Each customer type has a default discount percentage.
- Each individual customer may have an override percentage. The override always wins.
- Discount is a flat percentage across the whole range. There is no per product or per category
  discounting in this prototype, because the client has not confirmed they need it.
- Displayed price, cart line total, order total and invoice total must always agree.

## Demo personas

Three personas, one per customer type, so the price difference is demonstrable. Until real customer
names are supplied, use clearly fictional placeholder businesses and keep them in one fixture file
so they are easy to swap.

| Persona | Type | Rate |
|---|---|---|
| Lysefjord Kro | Restaurant | 10 percent, type default |
| Storhaug Matvare | Store / retailer | 15 percent, type default |
| Rogaland Drikk AS | Distributor | 30 percent, per customer override above the 25 percent default |
| Egersund Servering | Restaurant | 5 percent, per customer override below the 10 percent default |

Two personas carry overrides, one above its type default and one below, so the override rule is
visible both ways during the demo.

## Design source

The v2 designs were supplied as a PNG export: homepage, a product page, header, footer and the
logo. The Figma MCP connector could not read the file directly, because the connected account has
view access only and the design-read tools require edit access.

Palette, typography and brand copy in `src/index.css` and `src/data/config.ts` are sampled from
that export. Playfair Display stands in for the editorial serif in the designs. If the brand has a
licensed display face, swap the font import and `--font-display` and nothing else changes.

## What is real and what is not

**Real, from the designs and the supplied assets.** Brand name and wordmark, tagline "Norsk fra
jord til brygg", location Jåttåvågen in Stavanger, the palette, the label artwork in
`src/assets/products/`, and each product's name and style as printed on its own label.

**Invented, needs client confirmation.** Every trade price. Can volume, assumed 330ml. Trade
customer names and addresses. Product descriptions, tasting notes and IBU. Category assignments,
inferred from the style for the catalogue filter.

**Known wrong in the source designs, do not copy.** The "Våre øl" grid captions each can with
another product's name, style and ABV, and the product page breadcrumb does the same. Product data
here comes from the label artwork, never from the design's caption text. See BRD open question 18.

**Suspect.** Every supplied asset prints 4,7 % ABV, across a pilsner, two sours and three pale
ales. Treated as a placeholder. See BRD open question 19.

## Product images

`src/assets/products/` holds artwork cropped from the supplied exports. Six are flat square label
designs, which fill the card. Låven and #2 are cut-out can renders on transparency, which are
centred on a tinted tile. The `imageFit` field on each product picks between the two, and
`ProductImage.tsx` is the only component that reads it.

## Content still needed from the client

- [x] Designs
- [x] Product label artwork
- [x] Real product names and styles
- [ ] Trade price list, per product, ex VAT
- [ ] Real ABVs, since every asset shows 4,7 %
- [ ] A definitive product list, see BRD open question 20
- [ ] Can volume confirmation
- [ ] Artwork for the products not yet supplied (Kjekkas, X3, Herliga London, Preikestolen,
      Skallegrim, Mangoflørt, Fjøsnisse, Pådda, Flørli, Helnorsk Rabarbra)
- [ ] Real trade customer names, or permission to keep the invented ones
- [ ] Answer on the mixed 12 unit box rule, BRD open question 13

## Working rules

- Branch: `claude/amazing-brown-kjrz6u`. Commit and push to it.
- Keep fixtures in one place, `src/data/`, so content can be swapped without touching components.
- Build the demo story end to end before polishing any single screen. A complete rough walkthrough
  is worth more than one beautiful screen and six missing ones.
- Responsive matters. Judah may open this on a phone.
- If something in the BRD is ambiguous, note it in `docs/BRD-b2b-customer-portal.md` section 9
  rather than guessing and moving on.

## What is deliberately not in the prototype

Card payment, real authentication, stock handling, freight calculation, accounting integration,
multi-currency, multi-language, per product discounting, sales rep ordering on behalf of customers.
All of these are listed as out of scope in the BRD. Do not add them.
