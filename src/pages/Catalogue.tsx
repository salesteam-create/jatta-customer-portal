import { useState } from 'react'
import { categories, products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { usePortal } from '../state/portal'

/**
 * The catalogue is the ordinary site catalogue. It carries no portal chrome of its own:
 * logging in simply makes prices and ordering controls appear on the same page.
 */
export function Catalogue() {
  const { currentCustomer } = usePortal()
  const [category, setCategory] = useState<string>('Alle')

  const shown = category === 'Alle' ? products : products.filter((p) => p.category === category)

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Utvalgte øl</p>
          <h1 className="mt-1 font-display text-3xl text-ink">Våre øl</h1>
        </div>
        <p className="text-sm text-ink-3">
          {currentCustomer
            ? `${shown.length} of ${products.length} products`
            : 'Log in to see prices and order'}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c === category
          const count =
            c === 'Alle' ? products.length : products.filter((p) => p.category === c).length
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              disabled={count === 0}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
