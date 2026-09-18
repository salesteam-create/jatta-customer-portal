/**
 * Copy the built site from dist/ to the repository root.
 *
 * GitHub Pages on this repository is set to "Deploy from a branch" and serves the
 * root, so the build has to live there. This mirrors every entry in dist/ rather than
 * a hardcoded list, which is why favicons and any future static file come across too.
 *
 * Run via `npm run publish:pages`. Running `npm run build` alone will not change the
 * live site.
 */
import { cp, readdir, rm, access } from 'node:fs/promises'
import { join } from 'node:path'

const dist = 'dist'
const root = '.'

try {
  await access(dist)
} catch {
  console.error('dist/ not found. Run the build first.')
  process.exit(1)
}

const entries = await readdir(dist)
if (entries.length === 0) {
  console.error('dist/ is empty. Refusing to publish nothing.')
  process.exit(1)
}

for (const entry of entries) {
  await rm(join(root, entry), { recursive: true, force: true })
  await cp(join(dist, entry), join(root, entry), { recursive: true })
  console.log(`published ${entry}`)
}
