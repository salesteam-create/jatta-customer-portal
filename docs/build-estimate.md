# Build Estimate
## Jatta Gardsbryggeri B2B Customer Portal

| | |
|---|---|
| Version | 0.1 |
| Date | 18 September 2026 |
| Audience | Internal, Kilowott |
| Purpose | Effort planning for the Claude Code prototype build, plus an indicative figure for the production build |

**This is not a client quote.** The numbers for the production build are indicative only, to sense
check whatever Gilroy's team comes back with. Nothing here should be pasted into the proposal.

---

## 1. Summary

| Phase | What | Effort | Elapsed |
|---|---|---|---|
| Phase 0 | Demonstration prototype, built with Claude Code | 12 to 18 hours of active work | 2 to 3 working days |
| Phase 1 | Production WooCommerce build | 34 to 50 developer days, indicative | 7 to 10 weeks, one developer |

Phase 0 is the commitment for next week. Phase 1 is a sanity check figure, not a promise.

---

## 2. Phase 0, demonstration prototype

### 2.1 What it is

A standalone, clickable front end that tells the whole portal story. Mock data throughout. No real
authentication, no database, no payment, no WooCommerce. Deployed as a static site so Judah can
open a link on any device and walk the client through it.

### 2.2 What it must show

The demo is a story, told in this order:

1. Public catalogue. Products look good. No prices anywhere. A clear "trade customers, log in"
   prompt.
2. Login. Pick a persona, land back on the catalogue.
3. Prices appear. The same page, now with pricing, and the customer's own discounted price shown
   next to the struck-through standard price.
4. Switch persona. A restaurant and a distributor see different prices on the same product. This
   is the moment that sells the idea, so it needs to be easy to trigger during a demo.
5. Order in cases. Quantity stepper, add to cart, cart with discounted totals.
6. Checkout summary and order confirmation.
7. Account area. Profile, order history with an order detail view, invoice list with a PDF-looking
   invoice.
8. Optionally, an admin view showing the customer list with an editable discount percentage. This
   is the second most persuasive screen after the price reveal, because it answers "how do I
   control this".

### 2.3 Effort breakdown

| Item | Hours | Notes |
|---|---|---|
| Project setup, routing, design tokens from Figma | 1.5 to 2 | Faster if the Figma link is available and the design system is clean |
| Shared layout, header, persona switcher | 1 to 1.5 | The persona switcher is a demo device, not a real feature |
| Public catalogue and product detail, no pricing | 1.5 to 2 | |
| Login screen and mock session state | 0.5 to 1 | Local state only |
| Pricing layer: standard price, discount calculation, price reveal | 1.5 to 2 | The core of the demo |
| Case quantity control, cart, cart totals | 1.5 to 2 | |
| Checkout summary and order confirmation | 1 to 1.5 | |
| Account area: profile, order list, order detail | 2 to 2.5 | Three screens |
| Invoice list and invoice view | 1 to 1.5 | Styled HTML that reads as a PDF, not a real PDF |
| Admin view with editable discounts | 1 to 1.5 | Optional, recommended |
| Mock data, realistic product and order content | 0.5 to 1 | Needs real Jatta product names to land well |
| Responsive pass and demo rehearsal fixes | 1 to 1.5 | |
| **Total** | **12 to 18** | |

### 2.4 What drives it to the low or high end

Low end if: the Figma designs are complete and cover most of these screens, real Jatta product
content is available, and the admin view is dropped.

High end if: designs need interpreting or only cover the public site, product content has to be
invented, or the demo needs polishing for a formal client presentation rather than a screen share.

### 2.5 Dependencies before starting

1. Figma file access, as a link rather than a file upload.
2. Real product names, formats, case sizes and rough price points. Invented content weakens the
   demo noticeably.
3. Two or three real trade customer names to use as demo personas, or permission to invent them.
4. A decision on whether the admin view is in.

### 2.6 Risks

- **Scope creep into a real build.** The prototype will look convincing enough that someone will
  ask to "just connect it up". It cannot be connected up. This needs saying out loud before it is
  shown.
- **Demo expectation mismatch.** If the client expects to click through it themselves afterwards,
  every path needs to be either working or visibly disabled. Dead links in a client's hands are
  worse than no demo. Confirm whether the link is being handed over or only screen shared.
- **Product content.** Placeholder beer names will get noticed.

---

## 3. Phase 1, production WooCommerce build, indicative only

Assumes a custom approach: a child theme plus a custom plugin holding the roles, pricing and portal
logic. Assumes one experienced WooCommerce developer, with design already signed off.

| Workstream | Days |
|---|---|
| Environment, WooCommerce setup, product data model including case sizes | 3 to 4 |
| Customer roles and extendable customer types | 3 to 4 |
| Price hiding for logged out visitors, across catalogue, product, search, feeds and REST | 2 to 3 |
| Discount engine: type defaults, per customer override, price display with strike-through | 5 to 7 |
| Cart and checkout adjustments for case-based ordering | 3 to 4 |
| Front end account area: profile, orders, order detail | 5 to 6 |
| Invoices: generation, PDF, front end list and download | 3 to 5 |
| Registration and admin approval flow | 2 to 3 |
| Admin screens for customer and discount management | 2 to 3 |
| Front end theming to the approved design | 4 to 6 |
| QA, cross-browser, UAT support and fixes | 4 to 6 |
| **Subtotal** | **36 to 51** |

Project management and coordination typically adds 12 to 18 percent on top. Discovery, content
population and client-side delays are not included.

### 3.1 Where the estimate moves most

- **Per product or per category discounting.** If open question 1 in the BRD comes back as
  anything other than a flat percentage, add 5 to 10 days to the discount workstream.
- **Card payment at checkout.** Adds 4 to 7 days plus gateway and merchant account setup.
- **Accounting system integration for invoices.** Adds 8 to 15 days depending on the system and
  whether it has a usable API. This is the single largest swing factor after discounting.
- **Using an off-the-shelf B2B plugin instead.** Could remove 10 to 15 days from the custom build,
  at the cost of licence fees, less control over the front end, and awkward customisation later.
  Worth pricing as an alternative if the budget is tight. I would still recommend custom for the
  account area and theming regardless.

### 3.2 Why I would not use this figure in the proposal

Two reasons. First, it is built on assumptions that the open questions in the BRD have not yet
answered, and three of those questions can each move the number by a week or more. Second, Judah
asked Gilroy's team to quote it, and a number from us that undercuts or overshoots theirs creates
an awkward conversation. Use this to judge their quote, not to replace it.

---

## 4. Recommended sequence

1. Get the Figma link and the product content. Blocking for the prototype.
2. Build the prototype. Two to three days.
3. Show it to Judah before it goes to the client, so the demo story is agreed.
4. Send the open questions in BRD section 9 to the client in writing, particularly the discounting
   question and the alcohol marketing question. The answers change the quote.
5. Finalise the scope and price with Gilroy's input, and send the proposal.

If the prototype is not ready in time, the proposal goes out anyway with the BRD scope attached.
That was Judah's instruction and it is the right call. The prototype improves the pitch, it is not
a prerequisite for it.
