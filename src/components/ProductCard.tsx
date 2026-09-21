import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { ProductImage } from './ProductImage'
import { CaseStepper } from './CaseStepper'
import { Button } from './Ui'
import { priceFor } from '../lib/pricing'
import { usePortal } from '../state/portal'
import { money, pct } from '../lib/format'

/**
 * Compact catalogue card, sized to run six to a row.
 *
 * The long description that used to sit here is gone: at roughly 210px wide it pushed
 * the price and the ordering controls below the fold, which is exactly the spread-out
 * buying experience the card is meant to fix. The full copy lives on the product page.
 */
export function ProductCard({ product }: { product: Product }) {
  const { currentCustomer, discountPct, addCases } = usePortal()
  const [cases, setCases] = useState(1)
  const price = priceFor(product, discountPct)

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-card">
      <Link to={`/products/${product.slug}`} className="block">
        <ProductImage product={product} className="aspect-[9/10] w-full" />
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="font-display text-sm leading-tight text-ink">
          <Link to={`/products/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-[11px] leading-tight text-ink-3">
          {product.style} · {product.abv.toFixed(1).replace('.', ',')}%
        </p>

        <div className="mt-auto pt-3">
          {currentCustomer ? (
            <>
              {/* Three short lines rather than two long ones: at this width a combined
                  price and case line wraps mid-phrase. */}
              {price.hasDiscount && (
                <p className="text-[11px] leading-none text-ink-3 line-through">
                  {money(price.standardCasePrice)}
                </p>
              )}
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="font-display text-base leading-none text-ink">
                  {money(price.discountedCasePrice)}
                </span>
                {price.hasDiscount && (
                  <span className="text-[11px] font-medium text-brand">
                    {pct(price.discountPct)} off
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] leading-tight text-ink-3">
                {money(price.discountedUnitPrice)} per can
                <br />
                Case of {product.caseSize}
              </p>

              {/* Wraps rather than clips: the card is narrower at two and four columns
                  than it is at six, and the stepper plus button will not always fit. */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <CaseStepper cases={cases} onChange={setCases} min={1} compact />
                <Button
                  size="sm"
                  onClick={() => cases >= 1 && addCases(product.id, cases)}
                  className="min-w-16 flex-1 px-2"
                >
                  Add
                </Button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="block text-xs font-medium text-brand underline underline-offset-4 hover:text-brand-2"
            >
              Log in to see prices
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
