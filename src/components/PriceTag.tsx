import { money, pct } from '../lib/format'
import type { PriceView } from '../lib/pricing'

/**
 * The centre of the whole demo: the standard price struck through, the customer's own
 * price beside it, and the rate that produced it.
 *
 * `unit` shows the per-can price, `case` the price for a full case. Both come from
 * the same rounded figure so they can never disagree with the cart.
 */
export function PriceTag({
  price,
  caseSize,
  size = 'md',
}: {
  price: PriceView
  caseSize: number
  size?: 'sm' | 'md' | 'lg'
}) {
  const scale = {
    sm: { main: 'text-base', sub: 'text-xs' },
    md: { main: 'text-xl', sub: 'text-sm' },
    lg: { main: 'text-3xl', sub: 'text-sm' },
  }[size]

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {price.hasDiscount && (
          <span className={`${scale.sub} text-ink-3 line-through`}>
            {money(price.standardCasePrice)}
          </span>
        )}
        <span className={`${scale.main} font-display text-ink`}>
          {money(price.discountedCasePrice)}
        </span>
        <span className={`${scale.sub} text-ink-3`}>per case</span>
      </div>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-xs text-ink-2">
          {money(price.discountedUnitPrice)} per can, case of {caseSize}
        </span>
        {price.hasDiscount && (
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-brand">
            Your rate, {pct(price.discountPct)} off
          </span>
        )}
      </div>
    </div>
  )
}
