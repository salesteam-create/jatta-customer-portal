import { useNavigate } from 'react-router-dom'
import { usePortal, getCustomerType } from '../state/portal'
import { Card } from '../components/Ui'
import { effectiveDiscountPct } from '../lib/pricing'
import { pct } from '../lib/format'

/**
 * There is no authentication in the prototype. Choosing a company logs you in as it.
 * The production build uses real WooCommerce accounts. See BRD section 6.2.
 */
export function Login() {
  const { customers, login } = usePortal()
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">Trade customer login</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-2">
          Log in to see your agreed pricing and place an order. Trade accounts are approved by the
          brewery.
        </p>
      </div>

      <Card className="mt-10 p-6 sm:p-8">
        <p className="mb-4 text-xs tracking-wide text-ink-3 uppercase">
          Demonstration, choose an account
        </p>
        <div className="grid gap-3">
          {customers.map((c) => {
            const type = getCustomerType(c.type)
            const rate = effectiveDiscountPct(c, type)
            const overridden = c.discountOverridePct !== null
            return (
              <button
                key={c.id}
                onClick={() => {
                  login(c.id)
                  navigate('/')
                }}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-paper px-5 py-4 text-left transition-colors hover:border-brand hover:bg-paper-2"
              >
                <div>
                  <div className="font-medium text-ink">{c.companyName}</div>
                  <div className="text-sm text-ink-3">
                    {type.label} · {c.deliveryAddress.city}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg text-brand">{pct(rate)} off</div>
                  <div className="text-xs text-ink-3">
                    {overridden ? 'Set for this customer' : `${type.label} default`}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <p className="font-medium text-ink">Not a trade customer yet?</p>
          <p className="mt-1 text-sm text-ink-2">
            Trade accounts are opened by application. The brewery reviews each application before
            the account is activated.
          </p>
          <button
            disabled
            className="mt-4 cursor-not-allowed rounded-lg border border-line bg-paper-2 px-4 py-2.5 text-sm text-ink-3"
            title="Not built in the prototype"
          >
            Apply for a trade account (not in this prototype)
          </button>
        </div>
      </Card>
    </div>
  )
}
