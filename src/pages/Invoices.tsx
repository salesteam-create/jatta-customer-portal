import { Link } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { Badge, Card, EmptyState, LinkButton } from '../components/Ui'
import { formatDate, money } from '../lib/format'

export function Invoices() {
  const { currentCustomer, invoices, orders } = usePortal()
  if (!currentCustomer) return null

  const mine = invoices.filter((i) => i.customerId === currentCustomer.id)

  if (mine.length === 0) {
    return (
      <EmptyState
        title="No invoices yet"
        body="An invoice is raised once an order leaves the brewery."
        action={<LinkButton to="/account/orders">View your orders</LinkButton>}
      />
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="hidden grid-cols-[9rem_1fr_8rem_7rem_8rem] gap-4 border-b border-line bg-paper-2 px-6 py-3 text-xs tracking-wide text-ink-3 uppercase md:grid">
        <div>Invoice</div>
        <div>Issued</div>
        <div>Due</div>
        <div>Status</div>
        <div className="text-right">Amount</div>
      </div>

      <div className="divide-y divide-line">
        {mine.map((invoice) => {
          const order = orders.find((o) => o.id === invoice.orderId)
          return (
            <Link
              key={invoice.id}
              to={`/account/invoices/${invoice.id}`}
              className="grid grid-cols-2 gap-x-4 gap-y-2 px-6 py-4 text-sm transition-colors hover:bg-paper-2 md:grid-cols-[9rem_1fr_8rem_7rem_8rem] md:items-center"
            >
              <div className="font-medium text-ink">{invoice.number}</div>
              <div className="text-ink-2">{formatDate(invoice.issuedAt)}</div>
              <div className="text-ink-2">{formatDate(invoice.dueAt)}</div>
              <div>
                <Badge tone={invoice.status === 'Paid' ? 'good' : 'accent'}>{invoice.status}</Badge>
              </div>
              <div className="text-right font-medium text-ink">
                {order ? money(order.total) : '—'}
              </div>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
