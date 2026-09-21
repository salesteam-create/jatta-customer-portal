import { Link } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { Badge, Card, EmptyState, LinkButton } from '../components/Ui'
import { formatDate, money } from '../lib/format'
import type { OrderStatus } from '../types'

const tone = (status: OrderStatus) =>
  status === 'Delivered' ? 'good' : status === 'Awaiting confirmation' ? 'accent' : 'neutral'

export function Orders() {
  const { currentCustomer, orders } = usePortal()
  if (!currentCustomer) return null

  const mine = orders.filter((o) => o.customerId === currentCustomer.id)

  if (mine.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        body="Orders you place will appear here."
        action={<LinkButton to="/">Browse the catalogue</LinkButton>}
      />
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="hidden grid-cols-[8rem_1fr_9rem_8rem_8rem] gap-4 border-b border-line bg-paper-2 px-6 py-3 text-xs tracking-wide text-ink-3 uppercase md:grid">
        <div>Reference</div>
        <div>Placed</div>
        <div>Cases</div>
        <div>Status</div>
        <div className="text-right">Total</div>
      </div>

      <div className="divide-y divide-line">
        {mine.map((order) => {
          const cases = order.lines.reduce((sum, l) => sum + l.cases, 0)
          return (
            <Link
              key={order.id}
              to={`/account/orders/${order.id}`}
              className="grid grid-cols-2 gap-x-4 gap-y-2 px-6 py-4 text-sm transition-colors hover:bg-paper-2 md:grid-cols-[8rem_1fr_9rem_8rem_8rem] md:items-center"
            >
              <div className="font-medium text-ink">{order.reference}</div>
              <div className="text-ink-2">{formatDate(order.placedAt)}</div>
              <div className="text-ink-2">{cases} cases</div>
              <div>
                <Badge tone={tone(order.status)}>{order.status}</Badge>
              </div>
              <div className="text-right font-medium text-ink">{money(order.total)}</div>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
