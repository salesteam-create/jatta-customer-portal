import type { Product } from '../types'

/**
 * Renders the supplied artwork for a product.
 *
 * Two shapes arrive from the designers. Most products come as flat square label art,
 * which fills the tile. Låven and #2 come as cut-out can renders on transparency, so
 * they are centred on a tinted tile instead. Same component, one flag on the product.
 */
export function ProductImage({
  product,
  className = '',
  eager = false,
}: {
  product: Product
  className?: string
  eager?: boolean
}) {
  if (product.imageFit === 'can') {
    return (
      <div className={`flex items-center justify-center bg-paper-2 ${className}`}>
        <img
          src={product.image}
          alt={product.name}
          loading={eager ? 'eager' : 'lazy'}
          className="h-[78%] w-auto object-contain drop-shadow-sm"
        />
      </div>
    )
  }

  return (
    <img
      src={product.image}
      alt={`${product.name} label`}
      loading={eager ? 'eager' : 'lazy'}
      className={`object-cover ${className}`}
    />
  )
}
