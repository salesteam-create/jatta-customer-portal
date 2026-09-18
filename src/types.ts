export type CustomerTypeId = 'restaurant' | 'retailer' | 'distributor'

export interface CustomerType {
  id: CustomerTypeId
  label: string
  /** Applied to every customer of this type unless the customer has an override. */
  defaultDiscountPct: number
  description: string
}

export interface Product {
  id: string
  slug: string
  name: string
  style: string
  /** The Norwegian style line printed on the can. */
  styleNo: string
  /** Used by the catalogue filter chips. */
  category: string
  /** Short descriptors shown as pills on the product page, as in the designs. */
  tags: string[]
  abv: number
  ibu: number
  volumeMl: number
  /** Trade customers order in cases. 12 cans per case, per the delivery rule in the designs. */
  caseSize: number
  /** Standard trade price per can, ex VAT, in NOK. */
  standardUnitPrice: number
  shortDescription: string
  description: string
  tastingNotes: string
  /** Supplied label artwork, or a cut-out can render. */
  image: string
  /** 'cover' fills the tile with flat label art. 'can' centres a cut-out can on a tint. */
  imageFit: 'cover' | 'can'
  available: boolean
}

export interface Address {
  line1: string
  line2?: string
  postcode: string
  city: string
  country: string
}

export interface Customer {
  id: string
  companyName: string
  type: CustomerTypeId
  contactName: string
  email: string
  phone: string
  orgNumber: string
  vatNumber: string
  deliveryAddress: Address
  /** Overrides the customer type default. null means "use the type default". */
  discountOverridePct: number | null
  active: boolean
  customerSince: string
}

export interface OrderLine {
  productId: string
  productName: string
  caseSize: number
  cases: number
  /** Unit prices are captured at the moment the order is placed and never recalculated. */
  standardUnitPrice: number
  discountedUnitPrice: number
  discountPct: number
  lineTotal: number
}

export type OrderStatus = 'Received' | 'In production' | 'Dispatched' | 'Delivered'

export interface Order {
  id: string
  reference: string
  customerId: string
  placedAt: string
  requestedDelivery: string
  poReference: string
  status: OrderStatus
  lines: OrderLine[]
  subtotal: number
  vat: number
  total: number
  deliveryAddress: Address
}

export type InvoiceStatus = 'Paid' | 'Due' | 'Overdue'

export interface Invoice {
  id: string
  number: string
  orderId: string
  customerId: string
  issuedAt: string
  dueAt: string
  status: InvoiceStatus
}

export interface CartItem {
  productId: string
  cases: number
}
