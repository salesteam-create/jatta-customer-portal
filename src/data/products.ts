/**
 * Jåttå's range, read from the v2 design files.
 *
 * REAL, taken from the designs:
 *   name, style, the short descriptors, and the ABVs marked "from designs" below.
 *
 * INVENTED, needs the client to confirm:
 *   - every standardUnitPrice. No price appears anywhere in the designs.
 *   - can volume. The designs show cans but the printed volume is not legible.
 *     330ml is assumed throughout.
 *   - the longer descriptions and tasting notes, except Påskefjellet, whose copy
 *     is adapted from its product page in the designs.
 *   - the ABVs marked "assumed" below.
 *
 * Case size is 12 for every product, per the delivery rule in the designs.
 */
import type { Product } from '../types'
import { CASE_SIZE } from './config'

export const products: Product[] = [
  {
    id: 'p-kjekkas',
    slug: 'kjekkas',
    name: 'Kjekkas',
    style: 'Golden Lager',
    tags: ['Golden lager', 'Crisp', 'Refreshing'],
    abv: 4.5, // assumed
    ibu: 18,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 32,
    shortDescription: 'Golden lager. Crisp and refreshing.',
    description:
      'The everyday pour. A clean golden lager built for easy drinking, and the one that moves fastest across the bar.',
    tastingNotes: 'Bread crust, light citrus, a dry finish.',
    artFrom: '#e8c34b',
    artTo: '#c08a1e',
    available: true,
  },
  {
    id: 'p-paskefjellet',
    slug: 'paskefjellet',
    name: 'Påskefjellet',
    style: 'Amerikansk Pale Ale',
    tags: ['Light', 'Citrus'],
    abv: 4.7, // from designs
    ibu: 35, // from designs
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 36,
    shortDescription: 'American pale ale. Light and citrus forward.',
    description:
      'A modern pale ale with a light malt profile and a flavourful hop character. Brewed with care and good raw materials for a fresh, balanced drink. Made for bright summer days and relaxed company.',
    tastingNotes: 'Subtle citrus and flower, a clean bitterness.',
    artFrom: '#7fb5e0',
    artTo: '#2f6ea8',
    available: true,
  },
  {
    id: 'p-preikestolen',
    slug: 'preikestolen',
    name: 'Preikestolen',
    style: 'Blonde Ale',
    tags: ['Fjord Icon Series', 'Blonde ale'],
    abv: 5.0, // assumed
    ibu: 22,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 38,
    shortDescription: 'Pretty pretty blonde ale. Fjord Icon Series.',
    description:
      'Part of the Fjord Icon Series, named for the rock above Lysefjorden. A soft, approachable blonde ale that suits a list needing something between a lager and a pale.',
    tastingNotes: 'Honey, soft malt, a gentle hop lift.',
    artFrom: '#3fa9a4',
    artTo: '#1d6f72',
    available: true,
  },
  {
    id: 'p-skallegrim',
    slug: 'skallegrim',
    name: 'Skallegrim',
    style: 'American IPA',
    tags: ['American IPA', 'Roasty', 'Bitter'],
    abv: 7.4, // from designs
    ibu: 60,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 44,
    shortDescription: 'Solid American IPA with real hop character.',
    description:
      'A firm American IPA with good hop character and a fine bitterness. Aromatic, with a roasty edge that sets it apart from the lighter end of the range.',
    tastingNotes: 'Pine, grapefruit peel, a long bitter close.',
    artFrom: '#d98b3a',
    artTo: '#9a4a17',
    available: true,
  },
  {
    id: 'p-x3',
    slug: 'x3',
    name: 'X3',
    style: 'Double IPA',
    tags: ['Strong ale', 'Bold', 'Full-bodied'],
    abv: 8.5, // from designs
    ibu: 80,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 52,
    shortDescription: 'Strong ale. Bold and full-bodied.',
    description:
      'A double IPA at 8.5%, and one of the most highly rated beers in the range. Big, resinous and built for a short pour.',
    tastingNotes: 'Resin, stone fruit, warming alcohol.',
    artFrom: '#3aa6a0',
    artTo: '#17585c',
    available: true,
  },
  {
    id: 'p-mangoflort',
    slug: 'mangoflort',
    name: 'Mangoflørt',
    style: 'Milkshake IPA',
    tags: ['Milkshake IPA', 'Mango', 'Fruity'],
    abv: 6.0, // from designs
    ibu: 25,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 46,
    shortDescription: 'Milkshake IPA with a big mango character.',
    description:
      'Soft, full and fruit-forward. A milkshake IPA carrying a generous mango note, and an easy sell to drinkers who do not think they like IPA.',
    tastingNotes: 'Mango, vanilla, a soft rounded body.',
    artFrom: '#f0a63c',
    artTo: '#d4571f',
    available: true,
  },
  {
    id: 'p-herliga-london',
    slug: 'herliga-london',
    name: 'Herliga London',
    style: 'Porter',
    tags: ['Porter', 'Balanced', 'Sessionable'],
    abv: 8.0, // from designs
    ibu: 40,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 48,
    shortDescription: 'Porter. Hoppy, balanced and sessionable.',
    description:
      'Black with a thin creamy brown head. An aroma of dark malts, dry bitterness and red berries. Medium bitterness, rich without becoming too sweet.',
    tastingNotes: 'Dark malt, red berries, dry bitter finish.',
    artFrom: '#8a2b2b',
    artTo: '#3d1414',
    available: true,
  },
  {
    id: 'p-fjaerisse',
    slug: 'fjaerisse',
    name: 'Fjærisse',
    style: 'Imperial Porter',
    tags: ['Imperial porter', 'Dark', 'Seasonal'],
    abv: 9.0, // from designs
    ibu: 45,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 58,
    shortDescription: 'Dark and serious. Built for the winter list.',
    description:
      'An imperial porter with real weight to it. Dark, warming and unusual among Norwegian breweries. Listed heavily through December.',
    tastingNotes: 'Cocoa, dark fruit, roasted grain.',
    artFrom: '#6b4226',
    artTo: '#2a1710',
    available: true,
  },
  {
    id: 'p-padda',
    slug: 'padda',
    name: 'Pådda',
    style: 'Berliner Weisse',
    tags: ['Collab brew', 'Pineapple', 'Vanilla'],
    abv: 4.5, // assumed
    ibu: 8,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 42,
    shortDescription: 'Berliner weisse with pineapple and vanilla.',
    description:
      'A collaboration brew. Tart, bright and fruit-led, with pineapple and vanilla softening the acidity.',
    tastingNotes: 'Pineapple, vanilla, a clean sour edge.',
    artFrom: '#f28b30',
    artTo: '#c2341f',
    available: true,
  },
  {
    id: 'p-florli',
    slug: 'florli',
    name: 'Flørli',
    style: 'Sour',
    tags: ['Sea to summit sour', 'Tart', 'Fruity'],
    abv: 5.5, // assumed
    ibu: 10,
    volumeMl: 330,
    caseSize: CASE_SIZE,
    standardUnitPrice: 44,
    shortDescription: 'Sea to summit sour. Tart and fruit-driven.',
    description:
      'Named for the stairway above Lysefjorden. A fruited sour with a sharp, refreshing finish and plenty of colour in the glass.',
    tastingNotes: 'Red berry, tart acidity, a dry close.',
    artFrom: '#d6236b',
    artTo: '#8c0f43',
    available: true,
  },
]

export const getProduct = (id: string) => products.find((p) => p.id === id)
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug)
