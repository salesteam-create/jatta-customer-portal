import { CURRENCY } from '../data/config'

const nok = new Intl.NumberFormat('nb-NO', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Prices are shown ex VAT throughout the catalogue, which is the B2B convention. */
export const money = (n: number) => `${nok.format(n)} ${CURRENCY}`

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export const formatDate = (iso: string) => dateFmt.format(new Date(iso))

export const pct = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)}%`
