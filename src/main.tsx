import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { PortalProvider } from './state/portal'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { Catalogue } from './pages/Catalogue'
import { ProductDetail } from './pages/ProductDetail'
import { Login } from './pages/Login'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { OrderConfirmation } from './pages/OrderConfirmation'
import { AccountLayout } from './pages/AccountLayout'
import { Profile } from './pages/Profile'
import { Orders } from './pages/Orders'
import { OrderDetail } from './pages/OrderDetail'
import { Invoices } from './pages/Invoices'
import { InvoiceDetail } from './pages/InvoiceDetail'
import { AdminCustomers } from './pages/AdminCustomers'

/**
 * HashRouter rather than BrowserRouter, so the built site can be dropped on any static
 * host and deep links still resolve without server rewrite rules.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <PortalProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Catalogue />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<Profile />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<OrderDetail />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="invoices/:invoiceId" element={<InvoiceDetail />} />
            </Route>
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </PortalProvider>
    </HashRouter>
  </StrictMode>,
)
