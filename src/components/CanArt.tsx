import type { Product } from '../types'
import { BRAND } from '../data/config'

/**
 * Placeholder product artwork.
 *
 * The designs use photography of printed cans. That photography is not in the export,
 * so this draws a can in each product's colours instead. Replace this component with
 * real images once they are supplied and nothing else needs to change.
 */
export function CanArt({ product, className = '' }: { product: Product; className?: string }) {
  const id = `can-${product.id}`
  return (
    <svg viewBox="0 0 110 190" className={className} role="img" aria-label={`${product.name} can`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor={product.artFrom} />
          <stop offset="100%" stopColor={product.artTo} />
        </linearGradient>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b9bcc0" />
          <stop offset="35%" stopColor="#eef0f2" />
          <stop offset="100%" stopColor="#a8acb1" />
        </linearGradient>
      </defs>

      {/* body */}
      <rect x="15" y="16" width="80" height="158" rx="10" fill={`url(#${id})`} />
      {/* lid and base */}
      <rect x="17" y="10" width="76" height="12" rx="5" fill={`url(#${id}-lid)`} />
      <rect x="17" y="168" width="76" height="10" rx="5" fill={`url(#${id}-lid)`} opacity="0.9" />
      {/* highlight */}
      <rect x="24" y="22" width="9" height="146" rx="4" fill="#fff" opacity="0.16" />

      {/* label */}
      <text
        x="55"
        y="86"
        textAnchor="middle"
        fontSize={product.name.length > 12 ? 9 : product.name.length > 8 ? 11 : 13}
        fontFamily="'Playfair Display', Georgia, serif"
        fill="#fffdf8"
      >
        {product.name}
      </text>
      <text
        x="55"
        y="102"
        textAnchor="middle"
        fontSize={product.style.length > 18 ? 5 : 6.5}
        fill="#fffdf8"
        opacity="0.85"
      >
        {product.style.toUpperCase()}
      </text>
      <line x1="34" y1="110" x2="76" y2="110" stroke="#fffdf8" strokeWidth="0.6" opacity="0.5" />
      <text x="55" y="124" textAnchor="middle" fontSize="7" fill="#fffdf8" opacity="0.9">
        {product.abv.toFixed(1)}% · {product.volumeMl}ml
      </text>
      <text x="55" y="152" textAnchor="middle" fontSize="5.5" fill="#fffdf8" opacity="0.7">
        {BRAND.shortName}
      </text>
    </svg>
  )
}
