import { Link, NavLink } from 'react-router-dom'
import { Logo } from './Logo'
import { usePortal } from '../state/portal'
import { BRAND } from '../data/config'
import { pct } from '../lib/format'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors ${isActive ? 'text-ink font-medium' : 'text-ink-2 hover:text-ink'}`

export function Header() {
  const { currentCustomer, cart, discountPct, logout, openCart, closeCart, cartOpenedBy } =
    usePortal()
  const cartCases = cart.reduce((sum, i) => sum + i.cases, 0)

  return (
    <header className="no-print sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[90rem] items-center gap-6 px-4 py-4 sm:px-6">
        {/* The roundel already reads JÅTTÅ GÅRDSBRYGGERI, so no wordmark beside it.
            It stays at 52px, below which the ring of text stops being legible. */}
        <Link to="/" className="flex shrink-0 items-center gap-3 leading-none">
          <Logo className="h-13 w-auto" />
          <span className="hidden border-l border-line pl-3 text-[11px] tracking-[0.16em] text-ink-3 uppercase sm:inline">
            {BRAND.portalName}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink to="/" end className={navClass}>
            Catalogue
          </NavLink>
          {currentCustomer && (
            <>
              <NavLink to="/account/orders" className={navClass}>
                Orders
              </NavLink>
              <NavLink to="/account/invoices" className={navClass}>
                Invoices
              </NavLink>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {currentCustomer ? (
            <>
              <div className="hidden text-right sm:block">
                <div className="text-sm leading-tight font-medium text-ink">
                  {currentCustomer.companyName}
                </div>
                <div className="text-xs leading-tight text-ink-3">
                  {discountPct > 0 ? `${pct(discountPct)} discount` : 'Standard price'}
                </div>
              </div>

              <Link
                to="/account"
                aria-label="Your account"
                className="rounded-full border border-line bg-card p-2 text-ink-2 transition-colors hover:text-ink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" strokeLinecap="round" />
                </svg>
              </Link>

              <button
                onClick={cartOpenedBy ? closeCart : openCart}
                aria-expanded={cartOpenedBy !== null}
                aria-label={`Your order, ${cartCases} cases`}
                className="relative rounded-full border border-line bg-card p-2 text-ink-2 transition-colors hover:text-ink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6h16l-1.5 11.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5z" strokeLinejoin="round" />
                  <path d="M9 6a3 3 0 0 1 6 0" strokeLinecap="round" />
                </svg>
                {cartCases > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-medium text-white">
                    {cartCases}
                  </span>
                )}
              </button>

              <button
                onClick={logout}
                className="hidden text-sm text-ink-2 transition-colors hover:text-ink sm:block"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-2"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
