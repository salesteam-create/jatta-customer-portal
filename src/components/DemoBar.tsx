import { Link, useNavigate } from 'react-router-dom'
import { usePortal, getCustomerType } from '../state/portal'
import { effectiveDiscountPct } from '../lib/pricing'
import { PRICES_ARE_PLACEHOLDER } from '../data/config'
import { pct } from '../lib/format'

/**
 * Demo controls. Not part of the product.
 *
 * Switching persona from here is the single most important interaction in the
 * walkthrough: it lets the same catalogue page be shown at three different rates
 * without logging out and back in.
 */
export function DemoBar() {
  const { currentCustomer, customers, login, logout, resetDemo } = usePortal()
  const navigate = useNavigate()

  return (
    <div className="no-print bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 text-xs sm:px-6">
        <span className="font-medium tracking-wide text-accent uppercase">Demo controls</span>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-paper/60">View as</span>
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className={`rounded px-2 py-1 transition-colors ${
              !currentCustomer ? 'bg-accent text-ink' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            Public visitor
          </button>
          {customers.map((c) => {
            const rate = effectiveDiscountPct(c, getCustomerType(c.type))
            const active = currentCustomer?.id === c.id
            return (
              <button
                key={c.id}
                onClick={() => login(c.id)}
                className={`rounded px-2 py-1 transition-colors ${
                  active ? 'bg-accent text-ink' : 'bg-white/10 hover:bg-white/20'
                }`}
                title={`${getCustomerType(c.type).label}, ${pct(rate)} off`}
              >
                {c.companyName}
                <span className={active ? 'text-ink/70' : 'text-paper/50'}> {pct(rate)}</span>
              </button>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/admin/customers"
            className="rounded bg-white/10 px-2 py-1 transition-colors hover:bg-white/20"
          >
            Brewery admin
          </Link>
          {PRICES_ARE_PLACEHOLDER && (
            <span className="text-paper/50">Real range, placeholder prices</span>
          )}
          <button onClick={resetDemo} className="underline decoration-paper/40 hover:text-accent">
            Reset demo
          </button>
        </div>
      </div>
    </div>
  )
}
