import { Link, useNavigate } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { buildCartLines, cartTotals } from '../lib/cart'
import { ProductImage } from '../components/ProductImage'
import { CaseStepper } from '../components/CaseStepper'
import { Button, Card, EmptyState, LinkButton, PageHeading } from '../components/Ui'
import { money, pct } from '../lib/format'
import { VAT_RATE } from '../data/config'

export function Cart() {
  const { currentCustomer, cart, discountPct, setCases, removeItem } = usePortal()
  const navigate = useNavigate()

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
        body="Add cases from the catalogue to start an order."
        action={<LinkButton to="/">Browse the catalogue</LinkButton>}
      />
    )
  }

  const totals = cartTotals(lines)
  const totalCases = lines.reduce((sum, l) => sum + l.cases, 0)

  return (
    <div>
      <PageHeading
        title="Your order"
        subtitle={`${totalCases} ${totalCases === 1 ? 'case' : 'cases'} for ${currentCustomer.companyName}`}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <Card className="divide-y divide-line">
          {lines.map((line) => (
            <div key={line.product.id} className="flex flex-wrap items-center gap-4 p-5">
              <Link
                to={`/products/${line.product.slug}`}
                className="shrink-0 overflow-hidden rounded-lg border border-line"
              >
                <ProductImage product={line.product} className="h-20 w-20" />
              </Link>

              <div className="min-w-40 flex-1">
                <Link
                  to={`/products/${line.product.slug}`}
                  className="font-medium text-ink hover:text-brand"
                >
                  {line.product.name}
                </Link>
                <p className="text-xs text-ink-3">
                  Case of {line.product.caseSize} cans &times; {line.product.volumeMl}ml
                </p>
                <p className="mt-1.5 text-sm">
                  {line.price.hasDiscount && (
                    <span className="text-ink-3 line-through">
                      {money(line.price.standardCasePrice)}
                    </span>
                  )}{' '}
                  <span className="font-medium text-ink">
                    {money(line.price.discountedCasePrice)}
                  </span>{' '}
                  <span className="text-ink-3">per case</span>
                </p>
              </div>

              <CaseStepper
                cases={line.cases}
                onChange={(next) => setCases(line.product.id, next)}
                min={0}
              />

              <div className="w-28 text-right">
                <div className="font-display text-lg text-ink">{money(line.lineTotal)}</div>
                <button
                  onClick={() => removeItem(line.product.id)}
                  className="text-xs text-ink-3 underline underline-offset-2 hover:text-alert"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </Card>

        <div>
          <Card className="p-6">
            <h2 className="font-display text-lg text-ink">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-2">Cases</dt>
                <dd className="text-ink">{totalCases}</dd>
              </div>
              {totals.savings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-2">Your discount, {pct(discountPct)}</dt>
                  <dd className="text-good">&minus;{money(totals.savings)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-line pt-2">
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

            <Button size="lg" className="mt-6 w-full" onClick={() => navigate('/checkout')}>
              Continue to checkout
            </Button>
            <Link
              to="/"
              className="mt-3 block text-center text-sm text-ink-2 hover:text-ink"
            >
              Keep adding products
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
