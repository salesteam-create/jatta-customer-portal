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

  if (!currentCustomer) {
    return (
      <EmptyState
        title="Log in to place an order"
        body="Ordering is available to approved trade customers."
        action={<LinkButton to="/login">Trade customer login</LinkButton>}
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
      <PageHeading title="Checkout" subtitle="Confirm the delivery details and place your order." />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
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
            <h2 className="font-display text-lg text-ink">Payment</h2>
            <p className="mt-2 text-sm text-ink-2">
              This order will be invoiced to {currentCustomer.companyName} on your agreed account
              terms. No payment is taken at checkout.
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
                  <dt className="text-ink-2">Your discount, {pct(discountPct)}</dt>
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
              Place order
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
