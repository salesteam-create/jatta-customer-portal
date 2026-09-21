import { Link, useParams } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { Badge, Card, EmptyState, LinkButton } from '../components/Ui'
import { formatDate, money, pct } from '../lib/format'
import { VAT_RATE } from '../data/config'
import { round2 } from '../lib/pricing'

export function OrderDetail() {
  const { orderId } = useParams()
  const { currentCustomer, orders, invoices } = usePortal()
  if (!currentCustomer) return null

  const order = orders.find((o) => o.id === orderId && o.customerId === currentCustomer.id)
  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        body="That order does not belong to this account."
        action={<LinkButton to="/account/orders">Back to orders</LinkButton>}
      />
    )
  }

  const invoice = invoices.find((i) => i.orderId === order.id)
  const savings = round2(
    order.lines.reduce(
      (sum, l) => sum + (l.standardUnitPrice - l.discountedUnitPrice) * l.caseSize * l.cases,
      0,
    ),
  )

  return (
    <div>
      <Link to="/account/orders" className="text-sm text-ink-2 hover:text-ink">
        &larr; Back to orders
      </Link>

      <div className="mt-4 mb-8 flex flex-wrap items-center gap-3">
        <h2 className="font-display text-2xl text-ink">Order {order.reference}</h2>
        <Badge tone={order.status === 'Delivered' ? 'good' : 'neutral'}>{order.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <Card className="overflow-hidden">
          <div className="hidden grid-cols-[1fr_6rem_8rem_7rem] gap-4 border-b border-line bg-paper-2 px-6 py-3 text-xs tracking-wide text-ink-3 uppercase sm:grid">
            <div>Product</div>
            <div>Cases</div>
            <div>Price per case</div>
            <div className="text-right">Line total</div>
          </div>
          <div className="divide-y divide-line">
            {order.lines.map((line) => (
              <div
                key={line.productId}
                className="grid grid-cols-2 gap-x-4 gap-y-1 px-6 py-4 text-sm sm:grid-cols-[1fr_6rem_8rem_7rem] sm:items-center"
              >
                <div>
                  <div className="font-medium text-ink">{line.productName}</div>
                  <div className="text-xs text-ink-3">Case of {line.caseSize}</div>
                </div>
                <div className="text-ink-2">{line.cases}</div>
                <div>
                  {line.discountPct > 0 && (
                    <span className="mr-1.5 text-xs text-ink-3 line-through">
                      {money(round2(line.standardUnitPrice * line.caseSize))}
                    </span>
                  )}
                  <span className="text-ink">
                    {money(round2(line.discountedUnitPrice * line.caseSize))}
                  </span>
                </div>
                <div className="text-right font-medium text-ink">{money(line.lineTotal)}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-display text-base text-ink">Totals</h3>
            <dl className="mt-4 space-y-2 text-sm">
              {savings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-2">
                    Discount, {pct(order.lines[0]?.discountPct ?? 0)}
                  </dt>
                  <dd className="text-good">&minus;{money(savings)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-ink-2">Subtotal, ex VAT</dt>
                <dd className="text-ink">{money(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-2">VAT at {pct(VAT_RATE * 100)}</dt>
                <dd className="text-ink">{money(order.vat)}</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-line pt-3">
                <dt className="font-medium text-ink">Total</dt>
                <dd className="font-display text-lg text-ink">{money(order.total)}</dd>
              </div>
            </dl>
            {invoice && (
              <LinkButton
                to={`/account/invoices/${invoice.id}`}
                variant="secondary"
                className="mt-5 w-full"
              >
                View invoice {invoice.number}
              </LinkButton>
            )}
          </Card>

          <Card className="p-6 text-sm">
            <h3 className="font-display text-base text-ink">Delivery</h3>
            <p className="mt-3 text-ink-2">
              {order.deliveryAddress.line1}
              <br />
              {order.deliveryAddress.line2 && (
                <>
                  {order.deliveryAddress.line2}
                  <br />
                </>
              )}
              {order.deliveryAddress.postcode} {order.deliveryAddress.city}
              <br />
              {order.deliveryAddress.country}
            </p>
            <dl className="mt-4 space-y-1.5 border-t border-line pt-4">
              <div className="flex justify-between gap-3">
                <dt className="text-ink-2">Placed</dt>
                <dd className="text-ink">{formatDate(order.placedAt)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-2">Requested</dt>
                <dd className="text-ink">{formatDate(order.requestedDelivery)}</dd>
              </div>
              {order.poReference && (
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-2">Your reference</dt>
                  <dd className="text-ink">{order.poReference}</dd>
                </div>
              )}
            </dl>
          </Card>
        </div>
      </div>
    </div>
  )
}
