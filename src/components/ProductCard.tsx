import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { ProductImage } from './ProductImage'
import { PriceTag } from './PriceTag'
import { CaseStepper } from './CaseStepper'
import { Button } from './Ui'
import { priceFor } from '../lib/pricing'
import { usePortal } from '../state/portal'

/**
 * Card layout follows the "Våre øl" grid in the designs: full-bleed artwork with the
 * ABV in a chip top right, and the name and style over the foot of the image. The
 * trade pricing and ordering controls sit below, which the public designs do not have.
 */
export function ProductCard({ product }: { product: Product }) {
  const { currentCustomer, discountPct, addCases } = usePortal()
  const [cases, setCases] = useState(1)
  const price = priceFor(product, discountPct)

  const handleAdd = () => {
    if (cases < 1) return
    addCases(product.id, cases)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-line bg-card">
      {/*
        The designs overlay the name on the image, which works over photography. These
        are flat labels that already carry the name and the ABV, so the caption sits
        below the artwork instead of fighting with it.
      */}
      <Link to={`/products/${product.slug}`} className="block">
        <ProductImage product={product} className="aspect-[9/10] w-full" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight text-ink">
            <Link to={`/products/${product.slug}`} className="hover:text-brand">
              {product.name}
            </Link>
          </h3>
          <span className="mt-1 shrink-0 text-[11px] tracking-[0.14em] text-ink-3 uppercase">
            {product.category}
          </span>
        </div>
        <p className="mt-1 text-xs text-ink-3">
          {product.styleNo} · {product.abv.toFixed(1).replace('.', ',')}% · {product.volumeMl}ml
        </p>
        <p className="mt-3 flex-1 text-sm text-ink-2">{product.shortDescription}</p>

        <div className="mt-5 border-t border-line pt-4">
          {currentCustomer ? (
            <>
              <PriceTag price={price} caseSize={product.caseSize} size="md" />
              <div className="mt-4 flex items-center gap-2">
                <CaseStepper cases={cases} onChange={setCases} min={1} />
                <Button onClick={handleAdd} className="flex-1">
                  Add to order
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
