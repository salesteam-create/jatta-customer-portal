import { Outlet } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { DemoBar } from './DemoBar'
import { Header } from './Header'
import { Logo } from './Logo'
import { CartPanel } from './CartPanel'
import { BRAND } from '../data/config'

export function Layout() {
  const { cartOpenedBy } = usePortal()

  return (
    /* While the order panel is open the whole page is inset by its width, so the panel
       never sits on top of a product. There is no room to do that on a small screen, so
       below the large breakpoint the panel overlays instead. */
    <div
      className={`flex min-h-screen flex-col transition-[padding] duration-200 ${
        cartOpenedBy ? 'lg:pr-[26rem]' : ''
      }`}
    >
      <DemoBar />
      <Header />
      <CartPanel />
      <main className="@container mx-auto w-full max-w-[90rem] flex-1 px-4 py-10 sm:px-6">
        <Outlet />
      </main>
      <footer className="no-print bg-brand text-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          {/* The roundel carries the name, so neither the wordmark nor the name line
              is repeated under it. */}
          <Logo className="mx-auto h-24 w-auto" />
          <p className="mt-6 text-[11px] tracking-[0.2em] text-wheat uppercase">{BRAND.tagline}</p>

          <div className="mt-12 border-t border-paper/15 pt-8 text-sm text-paper/70">
            <p>
              {BRAND.location}, {BRAND.country}
            </p>
            <p className="mt-1">{BRAND.domain}</p>
            <p className="mt-6 text-xs text-paper/50">
              Customer portal prototype, for demonstration only. Not a live ordering system.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
