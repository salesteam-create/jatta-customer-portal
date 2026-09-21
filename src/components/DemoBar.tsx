import { Link, useNavigate } from 'react-router-dom'
import { usePortal, getCustomerType } from '../state/portal'
import { effectiveDiscountPct } from '../lib/pricing'
import { pct } from '../lib/format'

/**
 * Demo controls. Not part of the product.
 *
 * Kept deliberately quiet: this link goes to a client, so the bar should read as a
 * prototype control strip rather than part of the site. It is the only way to switch
 * between customers now that the login screen behaves like a real one, which matters
 * because showing two customers different prices is the point of the whole portal.
 */
export function DemoBar() {
  const { currentCustomer, customers, login, logout, resetDemo } = usePortal()
  const navigate = useNavigate()

  const chip = (active: boolean) =>
    `rounded px-1.5 py-0.5 transition-colors ${
      active ? 'bg-accent/90 text-ink' : 'text-paper/70 hover:bg-white/10 hover:text-paper'
    }`

  return (
    <div className="no-print bg-ink/95 text-[11px] text-paper">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center gap-x-3 gap-y-1 px-4 py-1.5 sm:px-6">
        <span className="tracking-[0.14em] text-paper/40 uppercase">Prototype</span>

        <div className="flex flex-wrap items-center gap-1">
          <span className="text-paper/40">View as</span>
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className={chip(!currentCustomer)}
          >
            Logged out
          </button>
          {customers.map((c) => {
            const rate = effectiveDiscountPct(c, getCustomerType(c.type))
            return (
              <button
                key={c.id}
                onClick={() => login(c.id)}
                className={chip(currentCustomer?.id === c.id)}
                title={`${getCustomerType(c.type).label}, ${pct(rate)}`}
              >
                {c.companyName}
              </button>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-3 text-paper/40">
          <Link to="/admin/customers" className="hover:text-paper">
            Brewery admin
          </Link>
          <button onClick={resetDemo} className="hover:text-paper">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
