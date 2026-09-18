import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { CanArt } from '../components/CanArt'
import { PriceTag } from '../components/PriceTag'
import { CaseStepper } from '../components/CaseStepper'
import { Button, Card, EmptyState, LinkButton } from '../components/Ui'
import { priceFor } from '../lib/pricing'
import { usePortal } from '../state/portal'

export function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = slug ? getProductBySlug(slug) : undefined
  const { currentCustomer, discountPct, addCases } = usePortal()
  const [cases, setCases] = useState(1)

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        body="That product is not in the range."
        action={<LinkButton to="/">Back to the catalogue</LinkButton>}
      />
    )
  }

  const price = priceFor(product, discountPct)

  return (
    <div>
      <Link to="/" className="text-sm text-ink-2 hover:text-ink">
        &larr; Back to the catalogue
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Card className="flex items-center justify-center bg-paper-2 py-12">
          <CanArt product={product} className="h-80 w-auto" />
        </Card>

        <div>
          <p className="text-xs tracking-wide text-ink-3 uppercase">{product.style}</p>
          <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-ink-2">
            {product.abv.toFixed(1)}% ABV · {product.ibu} IBU · {product.volumeMl}ml · case of{' '}
            {product.caseSize}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-xs text-ink-2"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-6 text-ink-2">{product.description}</p>

          <dl className="mt-6 border-t border-line pt-6 text-sm">
            <div className="flex gap-4 py-1.5">
              <dt className="w-32 shrink-0 text-ink-3">Tasting notes</dt>
              <dd className="text-ink-2">{product.tastingNotes}</dd>
            </div>
            <div className="flex gap-4 py-1.5">
              <dt className="w-32 shrink-0 text-ink-3">Case size</dt>
              <dd className="text-ink-2">
                {product.caseSize} cans &times; {product.volumeMl}ml
              </dd>
            </div>
            <div className="flex gap-4 py-1.5">
              <dt className="w-32 shrink-0 text-ink-3">Availability</dt>
              <dd className="text-ink-2">{product.available ? 'In stock' : 'Out of stock'}</dd>
            </div>
          </dl>

          <div className="mt-8 rounded-xl border border-line bg-card p-6">
            {currentCustomer ? (
              <>
                <PriceTag price={price} caseSize={product.caseSize} size="lg" />
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <CaseStepper cases={cases} onChange={setCases} min={1} />
                  <Button
                    size="lg"
                    onClick={() => {
                      addCases(product.id, cases)
                      navigate('/cart')
                    }}
                  >
                    Add {cases} {cases === 1 ? 'case' : 'cases'} to order
                  </Button>
                </div>
                <p className="mt-3 text-xs text-ink-3">
                  Prices exclude VAT. Orders are placed in full cases.
                </p>
              </>
            ) : (
              <div>
                <p className="font-display text-lg text-ink">Trade pricing</p>
                <p className="mt-1 text-sm text-ink-2">
                  Prices and ordering are available to approved trade customers. Log in to see your
                  rate.
                </p>
                <LinkButton to="/login" className="mt-4">
                  Trade customer login
                </LinkButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
