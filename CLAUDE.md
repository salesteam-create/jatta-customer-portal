# Jatta Gardsbryggeri B2B Customer Portal, demonstration prototype

## What this repository is

A clickable demonstration prototype of a B2B trade ordering portal for Jatta Gardsbryggeri, a
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
   placeholders. Do not present invented detail as if it came from Jatta.

## Stack

Vite, React, TypeScript, Tailwind CSS, React Router. Chosen for fast setup and a clean static
build. If you have a good reason to change this, say so before changing it.

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

- Every product has a standard trade price and a case size.
- Each customer type has a default discount percentage.
- Each individual customer may have an override percentage. The override always wins.
- Discount is a flat percentage across the whole range. There is no per product or per category
  discounting in this prototype, because the client has not confirmed they need it.
- Displayed price, cart line total, order total and invoice total must always agree.

## Demo personas

Three personas, one per customer type, so the price difference is demonstrable. Until real customer
names are supplied, use clearly fictional placeholder businesses and keep them in one fixture file
so they are easy to swap.

| Type | Example default discount |
|---|---|
| Restaurant | 10 percent |
| Store / retailer | 15 percent |
| Distributor | 25 percent |

At least one persona should carry a per customer override so that the override behaviour is
visible in the demo.

## Design source

Designs come from Figma. The link goes here once supplied:

- Figma file: _pending_

Do not upload the `.fig` binary to this repository. Use the Figma connector to read the file
directly from the link. If no link is available, build to a clean, restrained brewery aesthetic and
flag clearly that the styling is provisional.

## Content needed from the client side

Track these here as they arrive. Placeholder content weakens the demo.

- [ ] Figma file link
- [ ] Real product names, formats, ABV, case sizes
- [ ] Rough standard trade price points
- [ ] Product photography or approved placeholder imagery
- [ ] Two or three real trade customer names, or permission to invent them
- [ ] Decision on whether the admin view is in scope for the demo

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
