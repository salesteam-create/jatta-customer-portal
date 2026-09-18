import type { CartItem, Product } from '../types'
import { getProduct } from '../data/products'
import { lineTotal, priceFor, totalsFor, round2, type PriceView } from './pricing'

export interface CartLine {
  product: Product
  cases: number
  price: PriceView
  lineTotal: number
  standardLineTotal: number
}

export function buildCartLines(cart: CartItem[], discountPct: number): CartLine[] {
  return cart.flatMap((item) => {
    const product = getProduct(item.productId)
    if (!product) return []
    const price = priceFor(product, discountPct)
    return [
      {
        product,
        cases: item.cases,
        price,
        lineTotal: lineTotal(price, item.cases),
        standardLineTotal: round2(price.standardCasePrice * item.cases),
      },
    ]
  })
}

export const cartTotals = (lines: CartLine[]) => totalsFor(lines)
