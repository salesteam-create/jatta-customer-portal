import { useState } from 'react'
import { usePortal, getCustomerType } from '../state/portal'
import { Button, Card, Field, inputClass } from '../components/Ui'
import { formatDate, pct } from '../lib/format'

export function Profile() {
  const { currentCustomer, discountPct } = usePortal()
  const [saved, setSaved] = useState(false)

  if (!currentCustomer) return null
  const type = getCustomerType(currentCustomer.type)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="font-display text-lg text-ink">Contact details</h2>
        <p className="mt-1 text-sm text-ink-2">You can keep these up to date yourself.</p>

        <div className="mt-5 grid gap-4">
          <Field label="Contact name">
            <input className={inputClass} defaultValue={currentCustomer.contactName} />
          </Field>
          <Field label="Email">
            <input className={inputClass} defaultValue={currentCustomer.email} />
          </Field>
          <Field label="Phone">
            <input className={inputClass} defaultValue={currentCustomer.phone} />
          </Field>
        </div>

        <h3 className="mt-8 font-display text-base text-ink">Delivery address</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Address">
              <input className={inputClass} defaultValue={currentCustomer.deliveryAddress.line1} />
            </Field>
          </div>
          <Field label="Postcode">
            <input className={inputClass} defaultValue={currentCustomer.deliveryAddress.postcode} />
          </Field>
          <Field label="City">
            <input className={inputClass} defaultValue={currentCustomer.deliveryAddress.city} />
          </Field>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button
            onClick={() => {
              setSaved(true)
              window.setTimeout(() => setSaved(false), 2000)
            }}
          >
            Save changes
          </Button>
          {saved && <span className="text-sm text-good">Saved</span>}
        </div>
      </Card>

      <Card className="h-fit p-6">
        <h2 className="font-display text-lg text-ink">Account details</h2>
        <p className="mt-1 text-sm text-ink-2">
          These are set by the brewery. Contact us if anything here is wrong.
        </p>

        <dl className="mt-5 divide-y divide-line border-y border-line text-sm">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-2">Company</dt>
            <dd className="text-right text-ink">{currentCustomer.companyName}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-2">Customer type</dt>
            <dd className="text-right text-ink">{type.label}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-2">Discount</dt>
            <dd className="text-right font-medium text-brand">
              {discountPct > 0 ? `${pct(discountPct)} off list` : 'Standard price'}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-2">Organisation number</dt>
            <dd className="text-right text-ink">{currentCustomer.orgNumber}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-2">VAT number</dt>
            <dd className="text-right text-ink">{currentCustomer.vatNumber}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-2">Customer since</dt>
            <dd className="text-right text-ink">{formatDate(currentCustomer.customerSince)}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-2">Payment terms</dt>
            <dd className="text-right text-ink">30 days from invoice</dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}
