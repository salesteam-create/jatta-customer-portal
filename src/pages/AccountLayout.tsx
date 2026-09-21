import { NavLink, Outlet } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { EmptyState, LinkButton, PageHeading } from '../components/Ui'
import { pct } from '../lib/format'

const tabs = [
  { to: '/account', label: 'Profile', end: true },
  { to: '/account/orders', label: 'Orders', end: false },
  { to: '/account/invoices', label: 'Invoices', end: false },
]

export function AccountLayout() {
  const { currentCustomer, discountPct } = usePortal()

  if (!currentCustomer) {
    return (
      <EmptyState
        title="Log in to see your account"
        body="Your profile, orders and invoices are available once you are logged in."
        action={<LinkButton to="/login">Log in</LinkButton>}
      />
    )
  }

  return (
    <div>
      <PageHeading
        title="Your account"
        subtitle={`${currentCustomer.companyName} · ${
          discountPct > 0 ? `${pct(discountPct)} discount` : 'standard price'
        }`}
      />

      <div className="no-print mb-8 flex gap-1 border-b border-line">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `-mb-px border-b-2 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'border-brand font-medium text-ink'
                  : 'border-transparent text-ink-2 hover:text-ink'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <Outlet />
    </div>
  )
}
