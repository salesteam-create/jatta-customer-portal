# Business Requirements Document
## Jåttå Gårdsbryggeri B2B Customer Portal

| | |
|---|---|
| Version | 0.2 (draft for internal review) |
| Date | 18 September 2026 |
| Status | Draft, not yet client approved |
| Source | Judah's scoping notes, transcript of internal call, Jåttå v2 design files |
| Owner | Kilowott |

---

## 1. Purpose of this document

This document defines the business requirements for a B2B customer portal to be added to the
Jåttå Gårdsbryggeri website. It exists for two reasons: to give the client a clear statement of
what will be delivered as additional scope in the proposal, and to give the build team a single
reference to estimate and build against.

It is deliberately lean. It covers what the portal must do and why. It does not specify the
technical implementation beyond the platform decision already taken.

---

## 2. Background

Jåttå Gårdsbryggeri is an independent craft brewery in Jåttåvågen, Stavanger, selling a range
of around ten canned beers. It sells to trade customers as well as to the public. Today there
is no self-service way for a trade customer to see their own prices or place an order. Orders are
handled manually outside any system.

The client asked for a B2B customer portal alongside the main website build. The business goal is
to move repeat trade ordering into a self-service channel, so that the brewery spends less time
taking orders by phone and email, and trade customers can order at any time and see their own
pricing without having to ask.

A second, commercial goal for Kilowott: this is additional scope on the existing Jåttå engagement
and needs to be scoped and priced as part of the proposal.

---

## 3. Business objectives

1. Trade customers can place orders themselves, without brewery staff taking the order manually.
2. Each trade customer sees pricing that reflects the commercial terms agreed with them.
3. Retail pricing is never exposed to the public, and trade pricing is never exposed to anyone
   who is not a logged-in trade customer.
4. Trade customers can see their own order and invoice history without contacting the brewery.
5. No trade customer ever touches the WordPress administration area.

---

## 4. Platform decision

The portal will be built on WooCommerce, on the same WordPress installation as the main Jåttå
website. This was decided by Judah and is treated as fixed unless the build team raises a specific
blocker.

All customer-facing functionality is delivered on the website front end. Trade customers are given
no WordPress back end access at all. This is a firm requirement, not a preference.

---

## 5. Users

| User type | Description | Access |
|---|---|---|
| Super admin | Jåttå staff. Manages products, customers, pricing and orders. | Full WordPress and WooCommerce back end |
| Restaurant | Trade customer buying for on-premise sale | Front end portal only |
| Store / retailer | Trade customer reselling the product | Front end portal only |
| Distributor | Trade customer buying for onward distribution | Front end portal only |
| Public visitor | Anyone browsing the website | Public pages only, no pricing |

The list of trade customer types must be extendable. The brewery must be able to add a new type
later (for example a hotel group or an export partner) without a developer rebuilding the pricing
logic.

---

## 6. Functional requirements

### 6.1 Public product catalogue

- The public website shows the full product range: product name, imagery, description, tasting
  notes, ABV, format and any other descriptive content.
- No prices are shown anywhere to a visitor who is not logged in.
- No add to cart control is shown to a visitor who is not logged in.
- A clear call to action invites trade customers to log in, and prospective trade customers to
  request an account.

### 6.2 Account access

- Trade customers log in from the website front end.
- On successful login the customer is returned to the page they were on, now with pricing visible.
- Password reset is self-service by email.
- New trade customers apply through a front end form. The application captures company name,
  organisation number, VAT number, contact person, email, phone, delivery address and customer
  type. An administrator reviews and approves the application before the account becomes active.
- An account can be deactivated by an administrator, which immediately removes pricing and
  ordering access.

### 6.3 Pricing visibility

- Once logged in, every product displays a price.
- Where a discount applies, the product shows the standard trade price struck through, and the
  customer's own price next to it, with an indication of the discount applied.
- Prices shown in the catalogue, in the cart, at checkout, on the order confirmation and on the
  invoice must all agree.

### 6.4 Discount model

- Discounting is percentage based and applied at the customer account level.
- The brewery sets a default discount percentage that applies to all trade customers of a given
  type.
- An administrator can override that percentage for an individual customer account.
- The override always wins over the type default.
- A customer with no override and no type default sees the standard trade price with no discount
  display.
- Changing a discount percentage affects future orders only. Orders already placed keep the
  pricing they were placed at.

**Known limitation to confirm with the client.** As described, the discount is a single percentage
across the customer's whole basket. It cannot express "15 percent on core range, 5 percent on
seasonals" or a fixed price on a specific product. If the brewery already trades that way, this
needs to be raised now, because per product or per category discounting is a materially larger
piece of work. See section 9.

### 6.5 Ordering

- Trade customers order in cases, not in single units.
- The designs state the brewery's delivery rule: "We deliver in special boxes with a capacity of
  12 bottles. You can assemble a basket of different types of beer, but the sum of bottles must be
  a multiple of 12." Every product is therefore treated as a case of 12, which keeps any
  whole-case order a multiple of 12 automatically.
- Whether trade customers may also mix different beers within one 12 unit box, as the public site
  allows, is an open question. See section 9, question 13.
- Quantity is entered per product as a number of cases.
- Minimum order quantity and minimum order value rules must be confirmed. See section 9.
- The customer can add to cart, review the cart, amend quantities and remove lines.
- The cart shows line level and order level totals at the customer's own pricing.
- At checkout the customer confirms delivery address, requested delivery date and a purchase order
  reference if they use one.
- On submission the customer receives an order confirmation by email, and the brewery receives an
  order notification.

### 6.6 Customer account area

Available on the front end, reached from an icon in the site header once logged in.

- **Profile.** Company details, contact details, delivery address, VAT and organisation number.
  The customer can update contact details and address. The customer cannot change their own
  discount, customer type or company identity.
- **Orders.** A list of all orders placed by the account, with date, order reference, total and
  status. Opening an order shows the full line detail at the pricing it was placed at.
- **Invoices.** A list of invoices for the account, viewable and downloadable as PDF. Invoices
  reflect the customer's discounted pricing.

### 6.7 Administration

- Products are managed in WooCommerce as normal: name, description, imagery, case size, standard
  trade price, stock.
- Customer accounts are managed from the WordPress back end: approve or reject applications, set
  customer type, set or override discount percentage, activate or deactivate.
- Orders are managed in WooCommerce: view, update status, mark fulfilled.
- Reporting beyond standard WooCommerce order reporting is out of scope for this phase.

---

## 7. Out of scope

The following are explicitly not included in this phase, and should be stated as such in the
proposal so there is no ambiguity later:

- Online card payment. The assumption is that trade orders are invoiced on account terms. See
  section 9.
- Integration with the brewery's accounting or ERP system.
- Integration with a carrier or freight system, and live shipping rates.
- Stock allocation, back order handling or reservation logic beyond standard WooCommerce stock.
- Per product or per category discount rules.
- Quantity break pricing, for example a better rate above twenty cases.
- Customer specific product ranges, where one customer sees products another does not.
- A mobile application. The portal is a responsive website.
- Multi-currency.
- Sales rep accounts that can order on behalf of a customer.

---

## 8. Assumptions

1. The portal is built on the same WordPress and WooCommerce installation as the main Jåttå site.
2. Hosting is adequate for a logged-in, non-cacheable area of the site. Pricing pages cannot be
   served from a full page cache, which has a performance implication the host must support.
3. Trade orders are paid on invoice, not by card at checkout.
4. The brewery maintains product and pricing data itself after handover.
5. The site is delivered in the language or languages already agreed for the main website build.
   Adding a second language to the portal specifically is not assumed.
6. Jåttå provides the trade customer list, customer types and discount percentages for setup.

---

## 9. Open questions

These need answers before the build starts. Several of them change the estimate.

**Commercial**

1. Is the single percentage discount per customer genuinely how the brewery prices, or do they
   discount differently by product or category? This is the biggest single scope risk.
2. Are trade orders invoiced on account terms, or does the brewery want payment at checkout? Card
   payment adds a payment gateway, merchant account and PCI considerations.
3. Are there minimum order quantities, minimum order values or free freight thresholds?
4. Is freight charged? If so, how is it calculated?
5. Do different customer types get different products, or does everyone see the full range?

**Operational**

6. Where do invoices come from? Generated by WooCommerce, or issued from the brewery's accounting
   system and uploaded or synced? If the latter, which system, and does it have an API?
7. How many trade customers are there today, and roughly how many orders per week?
8. Who approves new trade account applications, and what do they check?

**Regulatory, and this one matters**

9. Norway regulates the marketing of alcohol tightly. Before we finalise the public catalogue
   design, the client needs to confirm with their own legal advisor what may be displayed publicly
   about their products, and whether a login-gated trade area changes what is permitted. We should
   not design the public pages on an assumption here. This is the client's call to make, not ours,
   but we must ask the question in writing and record the answer.
10. Does the brewery need to verify that a trade applicant holds the relevant licence before
    approving their account? If so, that check becomes part of the approval flow.

**Raised by the design files**

13. The product page states that orders ship in 12 unit boxes and that a customer may mix beers
    provided the total is a multiple of 12. Does that mixing rule apply to trade customers too, or
    do they order whole single-product cases only? Judah described case ordering, the designs
    describe mixed boxes. Mixed boxes are a materially more complex cart and need confirming
    before the build.
14. The designs contradict themselves on the founding year: the homepage hero reads "EST. 2018"
    and the brewery facts block reads "FOUNDED 2016". The prototype uses 2016. The client should
    confirm which is right and the designs should be corrected.
15. The Påskefjellet product page also contradicts itself: the tag row reads "4,7 % · 35 IBU" while
    the characteristics block below reads "ABV 4.9 %" and "IBU 23". The prototype uses 4.7% and
    35 IBU. Confirm the correct figures, and check the rest of the range for the same problem.
16. No price appears anywhere in the design files. A full trade price list is needed, per product,
    per case, ex VAT.
17. Can volume is not legible in the designs. 330ml is assumed throughout the prototype and needs
    confirming.

**Technical**

11. Is the WooCommerce site already live, or is the portal being built alongside the new site?
    This affects sequencing and testing.
12. What is the hosting environment, and does it support the caching behaviour described in
    assumption 2?

---

## 10. Acceptance criteria

The portal is accepted when all of the following are demonstrably true on the staging site.

1. A logged out visitor can browse the full catalogue and sees no price and no add to cart control
   on any product, anywhere on the site.
2. A trade customer can log in from the front end and immediately sees pricing.
3. A customer with a discount sees the standard price struck through and their own price alongside
   it, on the catalogue, the product page and in the cart.
4. Two customers of different types, with different discount percentages, each log in and each see
   their own correct pricing on the same product.
5. An administrator can change one customer's discount percentage and that customer's pricing
   updates, with no effect on any other customer.
6. A customer can add cases to the cart, amend quantities, check out and receive an order
   confirmation showing their discounted total. Every order quantity is a multiple of 12 units.
7. The customer can see that order in their front end order history at the pricing it was placed
   at.
8. The customer can view and download an invoice reflecting their discounted pricing.
9. The customer can view and update their profile details.
10. No trade customer can reach the WordPress administration area by any route, including a direct
    URL.
11. The portal works on mobile, tablet and desktop.

---

## 11. Delivery approach

**Phase 0, demonstration prototype.** Built, and in this repository. A clickable prototype that shows the portal
concept: public catalogue without prices, login, prices revealed, discount display, case ordering,
cart, order history, invoices and profile. Built as a standalone front end with mock data, not on
WooCommerce, so that it can be produced quickly and demonstrated as a link. The purpose is to let
Judah show the client the idea while the proposal is being agreed. It is a sales asset, not a
foundation for the production build.

**Phase 1, production build.** The full WooCommerce implementation described in this document,
built after the scope and estimate are approved.

The prototype does not prove technical feasibility in WooCommerce. It proves the concept and the
user experience. That distinction should be made clear when it is shown.
