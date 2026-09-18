import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { buildCartLines, cartTotals } from '../lib/cart'
import { ProductImage } from './ProductImage'
import { CaseStepper } from './CaseStepper'
import { Button, LinkButton } from './Ui'
import { money, pct } from '../lib/format'
import { VAT_RATE } from '../data/config'

/**
 * Slide-out cart.
 *
 * Opens whenever a case is added, so the basket is never a silent change that only
 * shows up as a number on an icon. A drawer rather than a small dropdown, because the
 * same panel has to work on a phone, where Judah may well be demonstrating this.
 */
export function CartDrawer() {
  const { cartOpen, closeCart, cart, currentCustomer, discountPct, setCases, removeItem } =
    usePortal()
  const { pathname } = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)

  // Escape closes, and the page behind should not scroll while it is open.
  useEffect(() => {
    if (!cartOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [cartOpen, closeCart])

  // The cart and checkout pages already show everything, so the drawer stands down there.
  useEffect(() => {
    if (pathname === '/cart' || pathname === '/checkout') closeCart()
  }, [pathname, closeCart])

  if (!currentCustomer) return null

  const lines = buildCartLines(cart, discountPct)
  const totals = cartTotals(lines)
  const totalCases = lines.reduce((sum, l) => sum + l.cases, 0)

  return (
    <div
      className={`no-print fixed inset-0 z-40 ${cartOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!cartOpen}
      inert={!cartOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${
          cartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        tabIndex={-1}
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-250 outline-none ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-lg text-ink">Your order</h2>
            <p className="text-xs text-ink-3">
              {totalCases} {totalCases === 1 ? 'case' : 'cases'} · {currentCustomer.companyName}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close"
            className="rounded-full p-2 text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-display text-lg text-ink">Nothing added yet</p>
            <p className="text-sm text-ink-2">
              Add cases from the catalogue and they will appear here.
            </p>
            <Button variant="secondary" onClick={closeCart}>
              Browse the catalogue
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-line overflow-y-auto">
              {lines.map((line) => (
                <div key={line.product.id} className="flex gap-3 p-4">
                  <Link
                    to={`/products/${line.product.slug}`}
                    onClick={closeCart}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line"
                  >
                    <ProductImage product={line.product} className="h-16 w-16" />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/products/${line.product.slug}`}
                        onClick={closeCart}
                        className="truncate text-sm font-medium text-ink hover:text-brand"
                      >
                        {line.product.name}
                      </Link>
                      <span className="shrink-0 text-sm font-medium text-ink">
                        {money(line.lineTotal)}
                      </span>
                    </div>
                    <p className="text-xs text-ink-3">
                      {money(line.price.discountedCasePrice)} per case of {line.product.caseSize}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <CaseStepper
                        cases={line.cases}
                        onChange={(next) => setCases(line.product.id, next)}
                        min={0}
                      />
                      <button
                        onClick={() => removeItem(line.product.id)}
                        className="text-xs text-ink-3 underline underline-offset-2 hover:text-alert"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line bg-card px-5 py-4">
              <dl className="space-y-1.5 text-sm">
                {totals.savings > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-ink-2">Your discount, {pct(discountPct)}</dt>
                    <dd className="text-good">&minus;{money(totals.savings)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-ink-2">Subtotal, ex VAT</dt>
                  <dd className="text-ink">{money(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-2">VAT at {pct(VAT_RATE * 100)}</dt>
                  <dd className="text-ink">{money(totals.vat)}</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-line pt-2">
                  <dt className="font-medium text-ink">Total</dt>
                  <dd className="font-display text-lg text-ink">{money(totals.total)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex gap-2">
                <LinkButton to="/cart" variant="secondary" className="flex-1">
                  View order
                </LinkButton>
                <LinkButton to="/checkout" className="flex-1">
                  Checkout
                </LinkButton>
              </div>
              <button
                onClick={closeCart}
                className="mt-3 w-full text-center text-sm text-ink-2 hover:text-ink"
              >
                Keep adding products
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
