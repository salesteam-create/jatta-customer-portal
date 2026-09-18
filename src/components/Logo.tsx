import logo from '../assets/brand/jatta-logo.png'
import { BRAND } from '../data/config'

/**
 * The brewery roundel, as supplied. It is a cream mark, so it sits correctly on both
 * the paper background and the brown footer without a separate inverted version.
 */
export function Logo({ className = 'h-10 w-auto' }: { className?: string }) {
  return <img src={logo} alt={BRAND.name} className={className} />
}
