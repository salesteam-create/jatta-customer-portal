import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { buildCartLines, cartTotals } from '../lib/cart'
import { Button, Card, EmptyState, Field, LinkButton, PageHeading, inputClass } from '../components/Ui'
import { money, pct } from '../lib/format'
import { VAT_RATE } from '../data/config'

const inSevenDays = () => {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().slice(0, 10)
}

export function Checkout() {
  const { currentCustomer, cart, discountPct, placeOrder } = usePortal()
  const navigate = useNavigate()

  const [requestedDelivery, setRequestedDelivery] = useState(inSevenDays)
  const [poReference, setPoReference] = useState('')
  const [address, setAddress] = useState(
    currentCustomer?.deliveryAddress ?? { line1: '', postcode: '', city: '', country: 'Norway' },
  )
  // Prefilled from the account, but editable: a customer may invoice to a different
  // address or contact than the one on file.
  const [company, setCompany] = useState({
    companyName: currentCustomer?.companyName ?? '',
    orgNumber: currentCustomer?.orgNumber ?? '',
    vatNumber: currentCustomer?.vatNumber ?? '',
    contactName: currentCustomer?.contactName ?? '',
    invoiceEmail: currentCustomer?.email ?? '',
    phone: currentCustomer?.phone ?? '',
  })

  if (!currentCustomer) {
    return (
      <EmptyState
        title="Log in to place an order"
        body="Ordering is available to customers with an account."
        action={<LinkButton to="/login">Log in</LinkButton>}
      />
    )
  }

  const lines = buildCartLines(cart, discountPct)
  if (lines.length === 0) {
    return (
      <EmptyState
        title="Your order is empty"
        body="Add cases from the catalogue before checking out."
        action={<LinkButton to="/">Browse the catalogue</LinkButton>}
      />
    )
  }

  const totals = cartTotals(lines)

  const submit = () => {
    const order = placeOrder({ requestedDelivery, poReference, deliveryAddress: address })
    navigate(`/order-confirmation/${order.id}`)
  }

  return (
    <div>
      <PageHeading title="Checkout" subtitle="Confirm your details and send your order request." />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-lg text-ink">Company details</h2>
            <p className="mt-1 text-sm text-ink-2">
              Taken from your account. Change anything that should be different on this order.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Company name">
                  <input
                    className={inputClass}
                    value={company.companyName}
                    onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Organisation number">
                <input
                  className={inputClass}
                  value={company.orgNumber}
                  onChange={(e) => setCompany({ ...company, orgNumber: e.target.value })}
                />
              </Field>
              <Field label="VAT number">
                <input
                  className={inputClass}
                  value={company.vatNumber}
                  onChange={(e) => setCompany({ ...company, vatNumber: e.target.value })}
                />
              </Field>
              <Field label="Contact person">
                <input
                  className={inputClass}
                  value={company.contactName}
                  onChange={(e) => setCompany({ ...company, contactName: e.target.value })}
                />
              </Field>
              <Field label="Phone">
                <input
                  className={inputClass}
                  value={company.phone}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Invoicing email" hint="Where the invoice for this order is sent.">
                  <input
                    type="email"
                    className={inputClass}
                    value={company.invoiceEmail}
                    onChange={(e) => setCompany({ ...company, invoiceEmail: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg text-ink">Delivery address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Address">
                  <input
                    className={inputClass}
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Postcode">
                <input
                  className={inputClass}
                  value={address.postcode}
                  onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
                />
              </Field>
              <Field label="City">
                <input
                  className={inputClass}
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
              </Field>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg text-ink">Delivery and reference</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Requested delivery date">
                <input
                  type="date"
                  className={inputClass}
                  value={requestedDelivery}
                  onChange={(e) => setRequestedDelivery(e.target.value)}
                />
              </Field>
              <Field label="Your purchase order reference" hint="Optional">
                <input
                  className={inputClass}
                  placeholder="e.g. PO-2026-118"
                  value={poReference}
                  onChange={(e) => setPoReference(e.target.value)}
                />
              </Field>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg text-ink">Payment and confirmation</h2>
            <p className="mt-2 text-sm text-ink-2">
              This order will be invoiced to {company.companyName} on account terms. No payment is
              taken here.
            </p>
            <p className="mt-3 rounded-lg bg-paper-2 p-3 text-sm text-ink-2">
              Submitting this form places an order request. Jåttå Gårdsbryggeri reserves the right
              to confirm the order, including availability, quantities and the delivery date,
              before it is accepted. You will receive a confirmation by email.
            </p>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="font-display text-lg text-ink">Your order</h2>
            <ul className="mt-4 space-y-3 border-b border-line pb-4 text-sm">
              {lines.map((l) => (
                <li key={l.product.id} className="flex justify-between gap-3">
                  <span className="text-ink-2">
                    {l.cases} &times; {l.product.name}
                  </span>
                  <span className="shrink-0 text-ink">{money(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-sm">
              {totals.savings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-2">Discount, {pct(discountPct)}</dt>
                  <dd className="text-good">&minus;{money(totals.savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-2">Subtotal, ex VAT</dt>
                <dd className="text-ink">{money(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">VAT at {pct(VAT_RATE * 100)}</dt>
                <dd className="text-ink">{money(totals.vat)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-3">
                <dt className="font-medium text-ink">Total</dt>
                <dd className="font-display text-xl text-ink">{money(totals.total)}</dd>
              </div>
            </dl>
            <Button size="lg" className="mt-6 w-full" onClick={submit}>
              Request order
            </Button>
            <p className="mt-3 text-xs text-ink-3">
              Subject to confirmation by the brewery.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
