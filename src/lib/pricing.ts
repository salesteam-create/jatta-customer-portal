/**
 * Pricing rules for the prototype.
 *
 * One rule drives everything: the discounted unit price is rounded ONCE, and every
 * other figure is derived from that rounded value. That is what keeps the price on
 * the product card, the cart line total, the order total and the invoice in
 * agreement, which is an explicit acceptance criterion in the BRD.
 *
 * Discounting is a flat percentage across the whole range. There is no per product
 * or per category rule, because the client has not confirmed they need one.
 * See BRD section 6.4 and open question 1.
 */
import type { Customer, CustomerType, Product } from '../types'
import { VAT_RATE } from '../data/config'

export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100

/**
 * A per-customer override always beats the customer type default.
 * A customer with neither pays the standard trade price.
 */
export function effectiveDiscountPct(customer: Customer, type: CustomerType): number {
  return customer.discountOverridePct ?? type.defaultDiscountPct ?? 0
}

export interface PriceView {
  discountPct: number
  standardUnitPrice: number
  discountedUnitPrice: number
  standardCasePrice: number
  discountedCasePrice: number
  hasDiscount: boolean
}

export function priceFor(product: Product, discountPct: number): PriceView {
  const discountedUnitPrice = round2(product.standardUnitPrice * (1 - discountPct / 100))
  return {
    discountPct,
    standardUnitPrice: product.standardUnitPrice,
    discountedUnitPrice,
    standardCasePrice: round2(product.standardUnitPrice * product.caseSize),
    discountedCasePrice: round2(discountedUnitPrice * product.caseSize),
    hasDiscount: discountPct > 0,
  }
}

export function lineTotal(price: PriceView, cases: number): number {
  return round2(price.discountedCasePrice * cases)
}

export interface Totals {
  subtotal: number
  vat: number
  total: number
  savings: number
}

export function totalsFor(lines: { lineTotal: number; standardLineTotal: number }[]): Totals {
  const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0))
  const standard = round2(lines.reduce((sum, l) => sum + l.standardLineTotal, 0))
  const vat = round2(subtotal * VAT_RATE)
  return {
    subtotal,
    vat,
    total: round2(subtotal + vat),
    savings: round2(standard - subtotal),
  }
}
