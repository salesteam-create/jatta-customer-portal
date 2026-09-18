import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { CanArt } from './CanArt'
import { PriceTag } from './PriceTag'
import { CaseStepper } from './CaseStepper'
import { Button } from './Ui'
import { priceFor } from '../lib/pricing'
import { usePortal } from '../state/portal'
import { useState } from 'react'

export function ProductCard({ product }: { product: Product }) {
  const { currentCustomer, discountPct, addCases } = usePortal()
  const [cases, setCases] = useState(1)
  const [added, setAdded] = useState(false)
  const price = priceFor(product, discountPct)

  const handleAdd = () => {
    if (cases < 1) return
    addCases(product.id, cases)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-card">
      <Link
        to={`/products/${product.slug}`}
        className="flex justify-center bg-paper-2 py-6 transition-colors hover:bg-line/50"
      >
        <CanArt product={product} className="h-44 w-auto" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg text-ink">
              <Link to={`/products/${product.slug}`} className="hover:text-brand">
                {product.name}
              </Link>
            </h3>
            <p className="text-xs text-ink-3">
              {product.style} · {product.abv.toFixed(1)}% · {product.volumeMl}ml
            </p>
          </div>
        </div>

        <p className="mt-3 flex-1 text-sm text-ink-2">{product.shortDescription}</p>

        <div className="mt-5 border-t border-line pt-4">
          {currentCustomer ? (
            <>
              <PriceTag price={price} caseSize={product.caseSize} size="md" />
              <div className="mt-4 flex items-center gap-2">
                <CaseStepper cases={cases} onChange={setCases} min={1} />
                <Button onClick={handleAdd} className="flex-1" disabled={added}>
                  {added ? 'Added' : 'Add to order'}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-ink-3">Pricing for trade customers</p>
              <Link
                to="/login"
                className="text-sm font-medium text-brand underline underline-offset-4 hover:text-brand-2"
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
