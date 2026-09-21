import { useNavigate } from 'react-router-dom'
import { usePortal, customerTypes, getCustomerType } from '../state/portal'
import { Badge, Button, Card, PageHeading } from '../components/Ui'
import { effectiveDiscountPct } from '../lib/pricing'
import { formatDate, pct } from '../lib/format'

/**
 * The brewery's view of its trade customers.
 *
 * In the production build this lives in the WordPress back end, where only Jåttå staff
 * can reach it. It is on the front end here purely so it can be shown in the demo
 * without a second system. See BRD section 6.7.
 */
export function AdminCustomers() {
  const { customers, orders, setDiscountOverride, login } = usePortal()
  const navigate = useNavigate()

  return (
    <div>
      <PageHeading
        title="Customers"
        subtitle="Set the rate each customer pays. A rate set here overrides the customer type default and applies to their next order."
      />

      <Card className="mb-6 border-accent/40 bg-wheat/25 p-4 text-sm text-ink-2">
        <strong className="text-ink">Brewery view.</strong> In the live site this sits inside the
        WordPress administration area. Customers never see it.
      </Card>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {customerTypes.map((type) => (
          <Card key={type.id} className="p-5">
            <p className="eyebrow">{type.label}</p>
            <p className="mt-2 font-display text-2xl text-ink">
              {pct(type.defaultDiscountPct)} <span className="text-base text-ink-3">default</span>
            </p>
            <p className="mt-2 text-sm text-ink-2">{type.description}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1fr_9rem_7rem_11rem_7rem] gap-4 border-b border-line bg-paper-2 px-6 py-3 text-xs tracking-wide text-ink-3 uppercase lg:grid">
          <div>Customer</div>
          <div>Type</div>
          <div>Orders</div>
          <div>Discount</div>
          <div className="text-right">View as</div>
        </div>

        <div className="divide-y divide-line">
          {customers.map((customer) => {
            const type = getCustomerType(customer.type)
            const rate = effectiveDiscountPct(customer, type)
            const overridden = customer.discountOverridePct !== null
            const orderCount = orders.filter((o) => o.customerId === customer.id).length

            return (
              <div
                key={customer.id}
                className="grid gap-x-4 gap-y-3 px-6 py-5 lg:grid-cols-[1fr_9rem_7rem_11rem_7rem] lg:items-center"
              >
                <div>
                  <div className="font-medium text-ink">{customer.companyName}</div>
                  <div className="text-xs text-ink-3">
                    {customer.contactName} · {customer.deliveryAddress.city} · since{' '}
                    {formatDate(customer.customerSince)}
                  </div>
                </div>

                <div className="text-sm text-ink-2">{type.label}</div>

                <div className="text-sm text-ink-2">{orderCount}</div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={rate}
                      onChange={(e) => {
                        const parsed = Number.parseInt(e.target.value, 10)
                        setDiscountOverride(
                          customer.id,
                          Number.isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed)),
                        )
                      }}
                      aria-label={`Discount for ${customer.companyName}`}
                      className="w-20 rounded-lg border border-line bg-card py-2 pr-7 pl-3 text-sm text-ink focus:border-brand focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-ink-3">
                      %
                    </span>
                  </div>
                  {overridden ? (
                    <button
                      onClick={() => setDiscountOverride(customer.id, null)}
                      className="text-xs text-ink-3 underline underline-offset-2 hover:text-ink"
                      title={`Revert to the ${type.label} default of ${pct(type.defaultDiscountPct)}`}
                    >
                      Reset
                    </button>
                  ) : (
                    <Badge>Type default</Badge>
                  )}
                </div>

                <div className="lg:text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      login(customer.id)
                      navigate('/')
                    }}
                  >
                    View as
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <p className="mt-4 text-sm text-ink-3">
        Changing a rate here affects future orders only. Orders already placed keep the pricing
        they were placed at, which you can check in any customer's order history.
      </p>
    </div>
  )
}
