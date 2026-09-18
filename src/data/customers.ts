/**
 * PLACEHOLDER CONTENT.
 *
 * These companies are invented. They are not Jåttå's real trade customers. Names and
 * addresses are in the Stavanger region to match where the brewery actually is.
 * Swap them for real names before the demo, or keep them if the client has not
 * given permission to use real customer names.
 *
 * Note the deliberate spread:
 *   - Lysefjord Kro takes the restaurant type default (10%)
 *   - Storhaug Matvare takes the retailer type default (15%)
 *   - Rogaland Drikk has a per-customer OVERRIDE (30% against a 25% type default)
 *   - Egersund Servering has an override BELOW its type default (5% against 10%)
 *
 * The overrides exist so the demo can show that the admin can set a rate per
 * customer, not just per type.
 */
import type { Customer, CustomerType } from '../types'

export const customerTypes: CustomerType[] = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    defaultDiscountPct: 10,
    description: 'Bars, restaurants and hotels selling for consumption on the premises.',
  },
  {
    id: 'retailer',
    label: 'Store / retailer',
    defaultDiscountPct: 15,
    description: 'Shops and specialist retailers reselling by the can.',
  },
  {
    id: 'distributor',
    label: 'Distributor',
    defaultDiscountPct: 25,
    description: 'Wholesale partners buying for onward distribution.',
  },
]

export const getCustomerType = (id: string) =>
  customerTypes.find((t) => t.id === id) ?? customerTypes[0]

export const customers: Customer[] = [
  {
    id: 'c-01',
    companyName: 'Lysefjord Kro',
    type: 'restaurant',
    contactName: 'Ingrid Halvorsen',
    email: 'post@lysefjordkro.example',
    phone: '+47 51 00 00 01',
    orgNumber: '912 345 678',
    vatNumber: 'NO912345678MVA',
    deliveryAddress: {
      line1: 'Skagenkaien 12',
      postcode: '4006',
      city: 'Stavanger',
      country: 'Norway',
    },
    discountOverridePct: null,
    active: true,
    customerSince: '2023-04-11',
  },
  {
    id: 'c-02',
    companyName: 'Storhaug Matvare',
    type: 'retailer',
    contactName: 'Tor Andersen',
    email: 'innkjop@storhaugmatvare.example',
    phone: '+47 51 00 00 02',
    orgNumber: '923 456 789',
    vatNumber: 'NO923456789MVA',
    deliveryAddress: {
      line1: 'Øvre Holmegate 22',
      line2: 'Inngang B',
      postcode: '4006',
      city: 'Stavanger',
      country: 'Norway',
    },
    discountOverridePct: null,
    active: true,
    customerSince: '2022-09-02',
  },
  {
    id: 'c-03',
    companyName: 'Rogaland Drikk AS',
    type: 'distributor',
    contactName: 'Marte Solheim',
    email: 'ordre@rogalanddrikk.example',
    phone: '+47 51 00 00 03',
    orgNumber: '934 567 890',
    vatNumber: 'NO934567890MVA',
    deliveryAddress: {
      line1: 'Lagerveien 3',
      postcode: '4033',
      city: 'Forus',
      country: 'Norway',
    },
    discountOverridePct: 30,
    active: true,
    customerSince: '2021-06-18',
  },
  {
    id: 'c-04',
    companyName: 'Egersund Servering',
    type: 'restaurant',
    contactName: 'Jonas Berg',
    email: 'drift@egersundservering.example',
    phone: '+47 51 00 00 04',
    orgNumber: '945 678 901',
    vatNumber: 'NO945678901MVA',
    deliveryAddress: {
      line1: 'Havnegata 4',
      postcode: '4370',
      city: 'Egersund',
      country: 'Norway',
    },
    discountOverridePct: 5,
    active: true,
    customerSince: '2024-01-30',
  },
]

/** The personas offered on the login screen, in demo order. */
export const demoPersonaIds = ['c-01', 'c-02', 'c-03', 'c-04']
