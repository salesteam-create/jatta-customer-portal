/**
 * Demo configuration.
 *
 * Brand facts below are taken from the v2 design files, not invented.
 * Source: Frame 1 (homepage), Frame 281 (product page), Footer.
 */

/**
 * Product names, styles and ABVs come from the designs and are real.
 * Trade PRICES are invented, because no price appears anywhere in the designs.
 * Set this to false once the client supplies a real trade price list.
 */
export const PRICES_ARE_PLACEHOLDER = true

export const CURRENCY = 'NOK'

/**
 * Norwegian MVA. Shown as a separate line so the demo reads like a real trade invoice.
 * Catalogue prices are ex VAT, which is the normal B2B convention.
 * Confirm with the client. See BRD section 9.
 */
export const VAT_RATE = 0.25

/**
 * 24 cans per case, as specified by Judah after reviewing the prototype.
 *
 * This contradicts the designs, whose product page states: "We deliver in special boxes
 * with a capacity of 12 bottles. You can assemble a basket of different types of beer,
 * but the sum of bottles must be a multiple of 12." The prototype follows Judah, but the
 * contradiction is unresolved and matters for the production cart. See BRD question 13.
 */
export const CASE_SIZE = 24

export const BRAND = {
  name: 'Jåttå Gårdsbryggeri',
  shortName: 'JÅTTÅ',
  portalName: 'Customer Portal',
  tagline: 'Norsk fra jord til brygg',
  taglineEn: 'Norwegian, from soil to brew',
  location: 'Jåttåvågen, Stavanger',
  country: 'Norway',
  domain: 'jattagardsbryggeri.no',
  identity: 'Independent craft brewery',
  /**
   * The designs disagree with themselves: the hero reads "EST. 2018" and the brewery
   * facts block reads "FOUNDED 2016". Flagged for the client. See BRD open question 14.
   */
  founded: '2016',
}
