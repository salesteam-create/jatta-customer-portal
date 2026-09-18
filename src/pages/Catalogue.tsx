import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { usePortal } from '../state/portal'
import { pct } from '../lib/format'
import { BRAND } from '../data/config'

export function Catalogue() {
  const { currentCustomer, discountPct } = usePortal()

  return (
    <div>
      {currentCustomer ? (
        <div className="mb-10 rounded-xl border border-line bg-card p-6 sm:p-8">
          <p className="eyebrow">Trade account</p>
          <h1 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
            {currentCustomer.companyName}
          </h1>
          <p className="mt-2 max-w-2xl text-ink-2">
            {discountPct > 0 ? (
              <>
                Your agreed rate of <strong className="text-ink">{pct(discountPct)}</strong> is
                applied to every price below. Orders are placed in full cases.
              </>
            ) : (
              <>
                You are seeing standard trade pricing. Orders are placed in full cases.
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="mb-10 overflow-hidden rounded-xl border border-line bg-card">
          <div className="p-6 sm:p-10">
            <p className="eyebrow">
              {BRAND.identity} · {BRAND.location} · Est. {BRAND.founded}
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl text-ink sm:text-5xl">
              {BRAND.tagline}
            </h1>
            <p className="mt-4 max-w-2xl text-ink-2">
              Our full range, brewed at the farm in Jåttåvågen. Trade pricing and online ordering
              are available to approved restaurants, retailers and distributors.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-2"
              >
                Trade customer login
              </Link>
              <Link
                to="/login"
                className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-paper-2"
              >
                Apply for a trade account
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-display text-xl text-ink">
          {currentCustomer ? 'Your price list' : 'Our beers'}
        </h2>
        <p className="text-sm text-ink-3">{products.length} products</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
