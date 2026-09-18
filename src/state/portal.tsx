/**
 * The whole prototype's state lives here: who is logged in, the customer records the
 * admin view can edit, the order and invoice history, and the cart.
 *
 * There is no backend. State is held in React and mirrored to localStorage so a
 * refresh mid-demo does not lose the basket. Reset from the demo panel in the header.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Address, CartItem, Customer, Invoice, Order, OrderLine } from '../types'
import { customers as seedCustomers, customerTypes, getCustomerType } from '../data/customers'
import { seedInvoices, seedOrders } from '../data/orders'
import { getProduct } from '../data/products'
import { VAT_RATE } from '../data/config'
import { effectiveDiscountPct, lineTotal, priceFor, round2 } from '../lib/pricing'

const STORAGE_KEY = 'jatta-portal-prototype-v1'

interface PersistedState {
  currentCustomerId: string | null
  customers: Customer[]
  orders: Order[]
  invoices: Invoice[]
  cart: CartItem[]
}

const initialState: PersistedState = {
  currentCustomerId: null,
  customers: seedCustomers,
  orders: seedOrders,
  invoices: seedInvoices,
  cart: [],
}

function load(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return { ...initialState, ...parsed }
  } catch {
    return initialState
  }
}

interface CheckoutDetails {
  requestedDelivery: string
  poReference: string
  deliveryAddress: Address
}

interface PortalContextValue {
  currentCustomer: Customer | null
  customers: Customer[]
  orders: Order[]
  invoices: Invoice[]
  cart: CartItem[]
  /** The discount rate in force for the logged-in customer. 0 when logged out. */
  discountPct: number
  /** The slide-out cart. Deliberately not persisted: a refresh should not reopen it. */
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  login: (customerId: string) => void
  logout: () => void
  setCases: (productId: string, cases: number) => void
  addCases: (productId: string, cases: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  setDiscountOverride: (customerId: string, pct: number | null) => void
  placeOrder: (details: CheckoutDetails) => Order
  resetDemo: () => void
}

const PortalContext = createContext<PortalContextValue | null>(null)

export function PortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(load)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Private browsing or a full quota. The demo still works, it just will not survive a refresh.
    }
  }, [state])

  const currentCustomer = useMemo(
    () => state.customers.find((c) => c.id === state.currentCustomerId) ?? null,
    [state.customers, state.currentCustomerId],
  )

  const discountPct = useMemo(() => {
    if (!currentCustomer) return 0
    return effectiveDiscountPct(currentCustomer, getCustomerType(currentCustomer.type))
  }, [currentCustomer])

  const login = useCallback((customerId: string) => {
    setState((s) => ({ ...s, currentCustomerId: customerId }))
  }, [])

  const logout = useCallback(() => {
    setCartOpen(false)
    setState((s) => ({ ...s, currentCustomerId: null, cart: [] }))
  }, [])

  const setCases = useCallback((productId: string, cases: number) => {
    setState((s) => {
      const next = Math.max(0, Math.floor(cases))
      const without = s.cart.filter((i) => i.productId !== productId)
      return { ...s, cart: next === 0 ? without : [...without, { productId, cases: next }] }
    })
  }, [])

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  /** Adding from the catalogue opens the drawer, so the basket is never a silent change. */
  const addCases = useCallback((productId: string, cases: number) => {
    setCartOpen(true)
    setState((s) => {
      const existing = s.cart.find((i) => i.productId === productId)
      const next = Math.max(0, (existing?.cases ?? 0) + Math.floor(cases))
      const without = s.cart.filter((i) => i.productId !== productId)
      return { ...s, cart: next === 0 ? without : [...without, { productId, cases: next }] }
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((i) => i.productId !== productId) }))
  }, [])

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), [])

  const setDiscountOverride = useCallback((customerId: string, pct: number | null) => {
    setState((s) => ({
      ...s,
      customers: s.customers.map((c) =>
        c.id === customerId ? { ...c, discountOverridePct: pct } : c,
      ),
    }))
  }, [])

  const placeOrder = useCallback(
    (details: CheckoutDetails): Order => {
      const customer = currentCustomer
      if (!customer) throw new Error('placeOrder called with no logged-in customer')

      const pct = discountPct
      const lines: OrderLine[] = state.cart.flatMap((item) => {
        const product = getProduct(item.productId)
        if (!product) return []
        const price = priceFor(product, pct)
        return [
          {
            productId: product.id,
            productName: product.name,
            caseSize: product.caseSize,
            cases: item.cases,
            standardUnitPrice: price.standardUnitPrice,
            discountedUnitPrice: price.discountedUnitPrice,
            discountPct: pct,
            lineTotal: lineTotal(price, item.cases),
          },
        ]
      })

      const subtotal = round2(lines.reduce((sum, l) => sum + l.lineTotal, 0))
      const vat = round2(subtotal * VAT_RATE)
      const nextNumber = 1058 + state.orders.filter((o) => o.id.startsWith('o-new')).length
      const order: Order = {
        id: `o-new-${nextNumber}`,
        reference: `JG-${nextNumber}`,
        customerId: customer.id,
        placedAt: new Date().toISOString().slice(0, 10),
        requestedDelivery: details.requestedDelivery,
        poReference: details.poReference,
        status: 'Received',
        lines,
        subtotal,
        vat,
        total: round2(subtotal + vat),
        deliveryAddress: details.deliveryAddress,
      }

      setCartOpen(false)
      setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }))
      return order
    },
    [currentCustomer, discountPct, state.cart, state.orders],
  )

  const resetDemo = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Nothing to clear.
    }
    setState(initialState)
  }, [])

  const value: PortalContextValue = {
    currentCustomer,
    customers: state.customers,
    orders: state.orders,
    invoices: state.invoices,
    cart: state.cart,
    discountPct,
    cartOpen,
    openCart,
    closeCart,
    login,
    logout,
    setCases,
    addCases,
    removeItem,
    clearCart,
    setDiscountOverride,
    placeOrder,
    resetDemo,
  }

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}

export function usePortal() {
  const ctx = useContext(PortalContext)
  if (!ctx) throw new Error('usePortal must be used inside a PortalProvider')
  return ctx
}

export { customerTypes, getCustomerType }
