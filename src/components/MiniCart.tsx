import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { buildCartLines, cartTotals } from '../lib/cart'
import { ProductImage } from './ProductImage'
import { LinkButton } from './Ui'
import { money, pct } from '../lib/format'
import { VAT_RATE } from '../data/config'

/**
 * Small cart panel anchored under the header cart icon.
 *
 * It started as a full-width slide-out drawer, which had two problems. A blocking
 * backdrop stopped the customer adding the next product, and even without the backdrop
 * a 448px panel physically covered the last two columns of a six-across catalogue. A
 * compact panel in the top right corner avoids both: it overlaps very little, and when
 * it appears on its own after an add it times out rather than sitting there.
 *
 * Opened from the header icon it stays put until dismissed, because that is a
 * deliberate request to look at the basket.
 */
const DISMISS_AFTER_MS = 4500

export function MiniCart() {
  const { cartOpenedBy, closeCart, cart, currentCustomer, discountPct } = usePortal()
  const { pathname } = useLocation()
  const [held, setHeld] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const open = cartOpenedBy !== null
  const cartKey = cart.map((i) => `${i.productId}:${i.cases}`).join('|')

  // Auto-dismiss only when it appeared by itself, and not while it is being used.
  useEffect(() => {
    if (cartOpenedBy !== 'add' || held) return
    const t = window.setTimeout(closeCart, DISMISS_AFTER_MS)
    return () => window.clearTimeout(t)
  }, [cartOpenedBy, held, cartKey, closeCart])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart()
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (panelRef.current?.contains(target)) return
      if ((target as HTMLElement).closest?.('[data-cart-toggle]')) return
      closeCart()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open, closeCart])

  // The cart and checkout pages already show everything.
  useEffect(() => {
    if (pathname === '/cart' || pathname === '/checkout') closeCart()
  }, [pathname, closeCart])

  if (!currentCustomer) return null

  const lines = buildCartLines(cart, discountPct)
  const totals = cartTotals(lines)
  const totalCases = lines.reduce((sum, l) => sum + l.cases, 0)

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Your order"
      inert={!open}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      className={`no-print fixed top-[6.5rem] right-3 z-40 w-[20rem] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-xl border border-line bg-card shadow-xl transition-all duration-200 sm:right-6 ${
        open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="text-sm font-medium text-ink">
          Your order
          <span className="ml-1.5 text-xs font-normal text-ink-3">
            {totalCases} {totalCases === 1 ? 'case' : 'cases'}
          </span>
        </p>
        <button
          onClick={closeCart}
          aria-label="Close"
          className="rounded-full p-1 text-ink-3 transition-colors hover:bg-paper-2 hover:text-ink"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {lines.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-ink-2">Nothing added yet.</p>
      ) : (
        <>
          <ul className="max-h-64 divide-y divide-line overflow-y-auto">
            {lines.map((line) => (
              <li key={line.product.id} className="flex items-center gap-2.5 px-4 py-2.5">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded border border-line">
                  <ProductImage product={line.product} className="h-10 w-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink">{line.product.name}</p>
                  <p className="text-[11px] text-ink-3">
                    {line.cases} × case of {line.product.caseSize}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-ink">{money(line.lineTotal)}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-line bg-paper px-4 py-3">
            <dl className="space-y-1 text-xs">
              {totals.savings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-ink-2">Discount, {pct(discountPct)}</dt>
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
              <div className="flex items-baseline justify-between border-t border-line pt-1.5">
                <dt className="text-sm font-medium text-ink">Total</dt>
                <dd className="font-display text-base text-ink">{money(totals.total)}</dd>
              </div>
            </dl>

            <div className="mt-3 flex gap-2">
              <LinkButton to="/cart" variant="secondary" size="sm" className="flex-1">
                View order
              </LinkButton>
              <LinkButton to="/checkout" size="sm" className="flex-1">
                Checkout
              </LinkButton>
            </div>
          </div>
        </>
      )}

      <Link to="/cart" className="sr-only">
        Open the full order page
      </Link>
    </div>
  )
}
