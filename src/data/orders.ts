/**
 * PLACEHOLDER CONTENT. Invented order history so the account area has something to show.
 *
 * Each historic order carries the discount percentage it was placed at, rather than
 * looking up the customer's current rate. That is deliberate: the BRD says changing a
 * customer's discount must not restate orders already placed, and the demo should
 * behave that way when someone edits a discount in the admin view.
 */
import type { Invoice, Order, OrderLine, OrderStatus } from '../types'
import { customers } from './customers'
import { getProduct } from './products'
import { lineTotal, priceFor, round2 } from '../lib/pricing'
import { VAT_RATE } from './config'

interface OrderSeed {
  id: string
  reference: string
  customerId: string
  placedAt: string
  requestedDelivery: string
  poReference: string
  status: OrderStatus
  /** The rate in force when the order was placed. */
  discountPct: number
  items: { productId: string; cases: number }[]
}

const seeds: OrderSeed[] = [
  {
    id: 'o-1041',
    reference: 'JG-1041',
    customerId: 'c-01',
    placedAt: '2026-09-02',
    requestedDelivery: '2026-09-09',
    poReference: 'LK-2026-114',
    status: 'Delivered',
    discountPct: 10,
    items: [
      { productId: 'p-jattapils', cases: 6 },
      { productId: 'p-paskefjellet', cases: 4 },
      { productId: 'p-blabaersafari', cases: 2 },
    ],
  },
  {
    id: 'o-1052',
    reference: 'JG-1052',
    customerId: 'c-01',
    placedAt: '2026-09-11',
    requestedDelivery: '2026-09-18',
    poReference: 'LK-2026-121',
    status: 'Dispatched',
    discountPct: 10,
    items: [
      { productId: 'p-jattapils', cases: 8 },
      { productId: 'p-studen', cases: 3 },
    ],
  },
  {
    id: 'o-1048',
    reference: 'JG-1048',
    customerId: 'c-02',
    placedAt: '2026-09-05',
    requestedDelivery: '2026-09-12',
    poReference: 'SM-9921',
    status: 'Delivered',
    discountPct: 15,
    items: [
      { productId: 'p-paskefjellet', cases: 12 },
      { productId: 'p-hanegal', cases: 5 },
    ],
  },
  {
    id: 'o-1055',
    reference: 'JG-1055',
    customerId: 'c-02',
    placedAt: '2026-09-15',
    requestedDelivery: '2026-09-22',
    poReference: 'SM-9948',
    status: 'Confirmed',
    discountPct: 15,
    items: [
      { productId: 'p-jattapils', cases: 10 },
      { productId: 'p-studen', cases: 6 },
      { productId: 'p-nr2', cases: 4 },
    ],
  },
  {
    id: 'o-1039',
    reference: 'JG-1039',
    customerId: 'c-03',
    placedAt: '2026-08-28',
    requestedDelivery: '2026-09-04',
    poReference: 'RD-2026-0812',
    status: 'Delivered',
    discountPct: 30,
    items: [
      { productId: 'p-jattapils', cases: 40 },
      { productId: 'p-paskefjellet', cases: 35 },
      { productId: 'p-studen', cases: 20 },
    ],
  },
  {
    id: 'o-1057',
    reference: 'JG-1057',
    customerId: 'c-03',
    placedAt: '2026-09-16',
    requestedDelivery: '2026-09-25',
    poReference: 'RD-2026-0903',
    status: 'Awaiting confirmation',
    discountPct: 30,
    items: [
      { productId: 'p-paskefjellet', cases: 50 },
      { productId: 'p-hanegal', cases: 18 },
      { productId: 'p-nr2', cases: 12 },
    ],
  },
  {
    id: 'o-1050',
    reference: 'JG-1050',
    customerId: 'c-04',
    placedAt: '2026-09-08',
    requestedDelivery: '2026-09-17',
    poReference: 'ES-441',
    status: 'Dispatched',
    discountPct: 5,
    items: [
      { productId: 'p-hanegal', cases: 3 },
      { productId: 'p-blabaersafari', cases: 2 },
    ],
  },
]

function buildOrder(seed: OrderSeed): Order {
  const customer = customers.find((c) => c.id === seed.customerId)!
  const lines: OrderLine[] = seed.items.map((item) => {
    const product = getProduct(item.productId)!
    const price = priceFor(product, seed.discountPct)
    return {
      productId: product.id,
      productName: product.name,
      caseSize: product.caseSize,
      cases: item.cases,
      standardUnitPrice: price.standardUnitPrice,
      discountedUnitPrice: price.discountedUnitPrice,
      discountPct: seed.discountPct,
      lineTotal: lineTotal(price, item.cases),
    }
  })
  const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0))
  const vat = round2(subtotal * VAT_RATE)
  return {
    id: seed.id,
    reference: seed.reference,
    customerId: seed.customerId,
    placedAt: seed.placedAt,
    requestedDelivery: seed.requestedDelivery,
    poReference: seed.poReference,
    status: seed.status,
    lines,
    subtotal,
    vat,
    total: round2(subtotal + vat),
    deliveryAddress: customer.deliveryAddress,
  }
}

export const seedOrders: Order[] = seeds.map(buildOrder)

const addDays = (iso: string, days: number) => {
  const d = new Date(iso)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

/** An invoice is raised for every order that has left the brewery. */
export const seedInvoices: Invoice[] = seedOrders
  .filter((o) => o.status === 'Dispatched' || o.status === 'Delivered')
  .map((o, i) => ({
    id: `inv-${o.id}`,
    number: `F-2026-${String(2100 + i).padStart(4, '0')}`,
    orderId: o.id,
    customerId: o.customerId,
    issuedAt: o.placedAt,
    dueAt: addDays(o.placedAt, 30),
    status: o.status === 'Delivered' ? 'Paid' : 'Due',
  }))
