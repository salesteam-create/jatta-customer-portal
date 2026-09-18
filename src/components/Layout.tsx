import { Outlet } from 'react-router-dom'
import { DemoBar } from './DemoBar'
import { Header } from './Header'
import { BRAND } from '../data/config'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <DemoBar />
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6">
        <Outlet />
      </main>
      <footer className="no-print bg-brand text-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6">
          <p className="text-[11px] tracking-[0.2em] text-wheat uppercase">{BRAND.name}</p>
          <p className="mt-4 font-display text-5xl tracking-[0.14em] text-paper sm:text-7xl">
            {BRAND.shortName}
          </p>
          <p className="mt-4 text-[11px] tracking-[0.2em] text-wheat uppercase">{BRAND.tagline}</p>

          <div className="mt-12 border-t border-paper/15 pt-8 text-sm text-paper/70">
            <p>
              {BRAND.location}, {BRAND.country}
            </p>
            <p className="mt-1">{BRAND.domain}</p>
            <p className="mt-6 text-xs text-paper/50">
              Trade portal prototype, for demonstration only. Not a live ordering system.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
