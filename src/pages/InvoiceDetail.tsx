import { Link, useParams } from 'react-router-dom'
import { usePortal, getCustomerType } from '../state/portal'
import { Button, EmptyState, LinkButton } from '../components/Ui'
import { formatDate, money, pct } from '../lib/format'
import { BRAND, VAT_RATE } from '../data/config'
import { Logo } from '../components/Logo'
import { round2 } from '../lib/pricing'

/**
 * Styled to read like a printed invoice. It is not a real PDF: the download button
 * opens the browser print dialogue, which is enough for a demo and avoids pulling in
 * a PDF library. Real invoice generation is scoped in the BRD.
 */
export function InvoiceDetail() {
  const { invoiceId } = useParams()
  const { currentCustomer, invoices, orders } = usePortal()
  if (!currentCustomer) return null

  const invoice = invoices.find((i) => i.id === invoiceId && i.customerId === currentCustomer.id)
  const order = invoice ? orders.find((o) => o.id === invoice.orderId) : undefined

  if (!invoice || !order) {
    return (
      <EmptyState
        title="Invoice not found"
        body="That invoice does not belong to this account."
        action={<LinkButton to="/account/invoices">Back to invoices</LinkButton>}
      />
    )
  }

  const type = getCustomerType(currentCustomer.type)
  const discountPct = order.lines[0]?.discountPct ?? 0

  return (
    <div>
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/account/invoices" className="text-sm text-ink-2 hover:text-ink">
          &larr; Back to invoices
        </Link>
        <Button variant="secondary" onClick={() => window.print()}>
          Download PDF
        </Button>
      </div>

      <div className="sheet mx-auto max-w-3xl rounded-lg p-8 sm:p-12">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-8">
          <div>
            <Logo className="mb-3 h-16 w-auto" />
            <p className="font-display text-xl text-ink">{BRAND.name}</p>
            <p className="mt-2 text-sm text-ink-2">
              {BRAND.location}
              <br />
              4020 Stavanger, {BRAND.country}
              <br />
              Org. nr. 998 877 665 MVA
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl text-ink">Invoice</p>
            <p className="mt-1 text-sm text-ink-2">{invoice.number}</p>
          </div>
        </div>

        <div className="grid gap-8 border-b border-line py-8 sm:grid-cols-2">
          <div>
            <p className="text-xs tracking-wide text-ink-3 uppercase">Invoice to</p>
            <p className="mt-2 text-sm text-ink">
              <strong>{currentCustomer.companyName}</strong>
              <br />
              {order.deliveryAddress.line1}
              <br />
              {order.deliveryAddress.postcode} {order.deliveryAddress.city}
              <br />
              {order.deliveryAddress.country}
              <br />
              {currentCustomer.vatNumber}
            </p>
          </div>
          <div className="sm:text-right">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between gap-4 sm:justify-end">
                <dt className="text-ink-3">Issued</dt>
                <dd className="text-ink sm:w-32">{formatDate(invoice.issuedAt)}</dd>
              </div>
              <div className="flex justify-between gap-4 sm:justify-end">
                <dt className="text-ink-3">Due</dt>
                <dd className="text-ink sm:w-32">{formatDate(invoice.dueAt)}</dd>
              </div>
              <div className="flex justify-between gap-4 sm:justify-end">
                <dt className="text-ink-3">Order</dt>
                <dd className="text-ink sm:w-32">{order.reference}</dd>
              </div>
              {order.poReference && (
                <div className="flex justify-between gap-4 sm:justify-end">
                  <dt className="text-ink-3">Your ref</dt>
                  <dd className="text-ink sm:w-32">{order.poReference}</dd>
                </div>
              )}
              <div className="flex justify-between gap-4 sm:justify-end">
                <dt className="text-ink-3">Terms</dt>
                <dd className="text-ink sm:w-32">{type.label}, 30 days</dd>
              </div>
            </dl>
          </div>
        </div>

        <table className="mt-8 w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs tracking-wide text-ink-3 uppercase">
              <th className="pb-2 font-normal">Description</th>
              <th className="pb-2 text-right font-normal">Cases</th>
              <th className="pb-2 text-right font-normal">Per case</th>
              <th className="pb-2 text-right font-normal">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {order.lines.map((line) => (
              <tr key={line.productId}>
                <td className="py-3">
                  <div className="text-ink">{line.productName}</div>
                  <div className="text-xs text-ink-3">
                    Case of {line.caseSize}
                    {line.discountPct > 0 && ` · ${pct(line.discountPct)} discount applied`}
                  </div>
                </td>
                <td className="py-3 text-right text-ink-2">{line.cases}</td>
                <td className="py-3 text-right text-ink-2">
                  {money(round2(line.discountedUnitPrice * line.caseSize))}
                </td>
                <td className="py-3 text-right text-ink">{money(line.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-end">
          <dl className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-2">Subtotal, ex VAT</dt>
              <dd className="text-ink">{money(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">VAT at {pct(VAT_RATE * 100)}</dt>
              <dd className="text-ink">{money(order.vat)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-2">
              <dt className="font-medium text-ink">Total due</dt>
              <dd className="font-display text-xl text-ink">{money(order.total)}</dd>
            </div>
          </dl>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-ink-3">
          {discountPct > 0
            ? `All prices include a ${pct(discountPct)} discount.`
            : 'All prices are standard list prices.'}{' '}
          Payment due within 30 days of the invoice date.
        </p>
      </div>
    </div>
  )
}
