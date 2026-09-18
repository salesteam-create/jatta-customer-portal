/**
 * Jåttå's range, built from the supplied label artwork.
 *
 * WHY THE ARTWORK AND NOT THE DESIGN'S CARD TEXT.
 * The "Våre øl" grid in the designs pairs product names, styles and ABVs with the
 * wrong cans: the X3 can is captioned "Studen", the Påskefjellet can is captioned
 * "Skallegrim", the Herliga London can is captioned "X3", and so on. The product page
 * has the same fault, with a "HJEM > ØL > STUDEN" breadcrumb above Påskefjellet.
 * Those pairings are placeholders. Each label states its own name, style and ABV, so
 * the label is treated as the source of truth here. See BRD open question 18.
 *
 * REAL, read from the label artwork:
 *   name, style, and the Norwegian style line printed on the can.
 *
 * INVENTED, needs the client to confirm:
 *   - every standardUnitPrice. No price appears in any design or asset.
 *   - can volume. 330ml is assumed.
 *   - descriptions, tasting notes and IBU.
 *   - category, inferred from the style for the catalogue filter.
 *
 * ABV NEEDS CHECKING. Every asset supplied prints 4,7 %, across a pilsner, two sours
 * and three pale ales. That is almost certainly one placeholder value reused on the
 * label mockups rather than the real figures. See BRD open question 19.
 */
import type { Product } from '../types'
import { CASE_SIZE } from './config'

import paskefjellet from '../assets/products/paskefjellet.jpg'
import studen from '../assets/products/studen.jpg'
import hanegal from '../assets/products/hanegal.jpg'
import jattapils from '../assets/products/jattapils.jpg'
import blabaersafari from '../assets/products/blabaersafari.jpg'
import bringebaersafari from '../assets/products/bringebaersafari.jpg'
import laven from '../assets/products/laven.png'
import nr2 from '../assets/products/nr2.png'

export const products: Product[] = [
  {
    id: 'p-paskefjellet',
    slug: 'paskefjellet',
    name: 'Påskefjellet',
    style: 'Pale Ale, American',
    styleNo: 'Amerikansk Pale Ale',
    category: 'Pale Ale',
    tags: ['Light', 'Citrus'],
    abv: 4.7,
    ibu: 35,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 36,
    image: paskefjellet,
    imageFit: 'cover',
    shortDescription: 'American pale ale. Light and citrus forward.',
    description:
      'A modern pale ale with a light malt profile and a flavourful hop character. Brewed with care and good raw materials for a fresh, balanced drink. Made for bright summer days and relaxed company.',
    tastingNotes: 'Subtle citrus and flower, a clean bitterness.',
    available: true,
  },
  {
    id: 'p-studen',
    slug: 'studen',
    name: 'Studen',
    style: 'Pale Ale, American',
    styleNo: 'Amerikansk Pale Ale',
    category: 'Pale Ale',
    tags: ['Pale ale', 'Hoppy'],
    abv: 4.7,
    ibu: 32,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 36,
    image: studen,
    imageFit: 'cover',
    shortDescription: 'American pale ale with a firm hop backbone.',
    description:
      'A straight-down-the-line American pale ale. Enough hop character to hold a tap line, restrained enough to drink through an evening.',
    tastingNotes: 'Citrus peel, light caramel, a dry finish.',
    available: true,
  },
  {
    id: 'p-hanegal',
    slug: 'hanegal',
    name: 'Hanegal',
    style: 'Pale Ale, Belgian',
    styleNo: 'Belgisk Pale Ale',
    category: 'Farmhouse',
    tags: ['Belgian', 'Spiced', 'Dry'],
    abv: 4.7,
    ibu: 24,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 38,
    image: hanegal,
    imageFit: 'cover',
    shortDescription: 'Belgian pale ale. Dry, spiced and expressive.',
    description:
      'Belgian yeast character over a light malt base. Peppery and dry, and an easy pairing with food, which makes it a restaurant favourite.',
    tastingNotes: 'White pepper, orchard fruit, a dry close.',
    available: true,
  },
  {
    id: 'p-jattapils',
    slug: 'jattapils',
    name: 'Jåttåpils',
    style: 'Pilsner, Czech / Bohemian',
    styleNo: 'Tsjekkisk Pilsner',
    category: 'Pilsner',
    tags: ['Pilsner', 'Crisp', 'Clean'],
    abv: 4.7,
    ibu: 30,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 33,
    image: jattapils,
    imageFit: 'cover',
    shortDescription: 'Czech style pilsner. The house lager.',
    description:
      'A Bohemian pilsner, slow lagered and built on soft water and noble hops. The volume seller across the trade.',
    tastingNotes: 'Bread crust, floral hops, a crisp bitter close.',
    available: true,
  },
  {
    id: 'p-blabaersafari',
    slug: 'blabaersafari',
    name: 'Blåbærsafari',
    style: 'Sour, Fruited',
    styleNo: 'Surøl med blåbær',
    category: 'Sour',
    tags: ['Sour', 'Blueberry', 'Tart'],
    abv: 4.7,
    ibu: 8,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 44,
    image: blabaersafari,
    imageFit: 'cover',
    shortDescription: 'Fruited sour with blueberry.',
    description:
      'Bright and tart, with a full blueberry character. Sells well to drinkers who do not usually reach for beer.',
    tastingNotes: 'Blueberry, clean acidity, a dry finish.',
    available: true,
  },
  {
    id: 'p-bringebaersafari',
    slug: 'bringebaersafari',
    name: 'Bringebærsafari',
    style: 'Sour, Fruited',
    styleNo: 'Surøl med bringebær',
    category: 'Sour',
    tags: ['Sour', 'Raspberry', 'Tart'],
    abv: 4.7,
    ibu: 8,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 44,
    image: bringebaersafari,
    imageFit: 'cover',
    shortDescription: 'Fruited sour with raspberry.',
    description:
      'The raspberry sibling to Blåbærsafari. Sharp, fruit-led and vivid in the glass.',
    tastingNotes: 'Raspberry, tart acidity, a clean close.',
    available: true,
  },
  {
    id: 'p-laven',
    slug: 'laven',
    name: 'Låven',
    style: 'Pale Ale',
    styleNo: 'Pale Ale',
    category: 'Pale Ale',
    tags: ['Pale ale', 'Farmhouse', 'Balanced'],
    abv: 4.7,
    ibu: 28,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 36,
    image: laven,
    imageFit: 'can',
    shortDescription: 'Named for the barn the brewery started in.',
    description:
      'A balanced pale ale, and the beer closest to the brewery’s own story. Brewed in the barn that gave it its name.',
    tastingNotes: 'Soft malt, gentle hops, an even finish.',
    available: true,
  },
  {
    id: 'p-nr2',
    slug: 'nr2',
    name: '#2',
    style: 'New England Pale Ale',
    styleNo: 'New England Pale Ale',
    category: 'IPA',
    tags: ['New England', 'Hazy', 'Juicy'],
    abv: 4.7,
    ibu: 25,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 42,
    image: nr2,
    imageFit: 'can',
    shortDescription: 'Hazy New England pale ale. Soft and juicy.',
    description:
      'Soft, hazy and hop-forward without the bitterness. The one to list next to the IPA for drinkers who want the aroma but not the bite.',
    tastingNotes: 'Stone fruit, citrus, a soft rounded body.',
    available: true,
  },
]

/** Filter chips on the catalogue, matching the "Våre øl" grid in the designs. */
export const categories = ['Alle', 'IPA', 'Pale Ale', 'Pilsner', 'Farmhouse', 'Sour'] as const

export const getProduct = (id: string) => products.find((p) => p.id === id)
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug)
