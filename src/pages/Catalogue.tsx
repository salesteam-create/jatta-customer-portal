import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { usePortal } from '../state/portal'
import { pct } from '../lib/format'
import { BRAND } from '../data/config'

export function Catalogue() {
  const { currentCustomer, discountPct } = usePortal()
  const [category, setCategory] = useState<string>('Alle')

  const shown = category === 'Alle' ? products : products.filter((p) => p.category === category)

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

      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="eyebrow">Utvalgte øl</p>
          <h2 className="mt-1 font-display text-2xl text-ink">
            {currentCustomer ? 'Your price list' : 'Våre øl'}
          </h2>
        </div>
        <p className="text-sm text-ink-3">
          {shown.length} of {products.length} products
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c === category
          const count = c === 'Alle' ? products.length : products.filter((p) => p.category === c).length
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              disabled={count === 0}
              className={`rounded-full border px-5 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                active
                  ? 'border-brand bg-brand text-white'
                  : 'border-line bg-card text-ink-2 hover:border-brand hover:text-ink'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>

      {shown.length === 0 ? (
        <p className="rounded-xl border border-line bg-card p-10 text-center text-ink-2">
          Nothing in this category yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
