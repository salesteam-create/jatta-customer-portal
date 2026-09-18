import { Link, useParams } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { Card, EmptyState, LinkButton } from '../components/Ui'
import { formatDate, money } from '../lib/format'

export function OrderConfirmation() {
  const { orderId } = useParams()
  const { orders } = usePortal()
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        body="We could not find that order."
        action={<LinkButton to="/">Back to the catalogue</LinkButton>}
      />
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-good/10">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2f6b46" strokeWidth="2.2">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="mt-5 font-display text-3xl text-ink">Order received</h1>
        <p className="mt-2 text-ink-2">
          Thank you. We have sent a confirmation to your registered email address.
        </p>

        <dl className="mt-8 divide-y divide-line border-y border-line text-left text-sm">
          <div className="flex justify-between py-3">
            <dt className="text-ink-2">Order reference</dt>
            <dd className="font-medium text-ink">{order.reference}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-ink-2">Placed</dt>
            <dd className="text-ink">{formatDate(order.placedAt)}</dd>
          </div>
          <div className="flex justify-between py-3">
            <dt className="text-ink-2">Requested delivery</dt>
            <dd className="text-ink">{formatDate(order.requestedDelivery)}</dd>
          </div>
          {order.poReference && (
            <div className="flex justify-between py-3">
              <dt className="text-ink-2">Your reference</dt>
              <dd className="text-ink">{order.poReference}</dd>
            </div>
          )}
          <div className="flex justify-between py-3">
            <dt className="text-ink-2">Total, inc VAT</dt>
            <dd className="font-display text-lg text-ink">{money(order.total)}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to={`/account/orders/${order.id}`}>View this order</LinkButton>
          <LinkButton to="/" variant="secondary">
            Back to the catalogue
          </LinkButton>
        </div>

        <p className="mt-6 text-xs text-ink-3">
          Your invoice will appear under{' '}
          <Link to="/account/invoices" className="underline underline-offset-2">
            Invoices
          </Link>{' '}
          once the order is dispatched.
        </p>
      </Card>
    </div>
  )
}
