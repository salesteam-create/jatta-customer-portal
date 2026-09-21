import { Button } from './Ui'

/**
 * Customers order in whole cases, never in single cans, so this is the only quantity
 * control in the prototype.
 *
 * The compact variant exists because the catalogue now runs six cards to a row.
 */
export function CaseStepper({
  cases,
  onChange,
  min = 0,
  compact = false,
}: {
  cases: number
  onChange: (next: number) => void
  min?: number
  compact?: boolean
}) {
  const pad = compact ? 'px-2' : 'px-3'
  const width = compact ? 'w-8' : 'w-14'
  const text = compact ? 'text-xs' : 'text-sm'

  return (
    <div className="inline-flex items-center rounded-full border border-line bg-card">
      <Button
        variant="ghost"
        size="sm"
        aria-label="Remove one case"
        disabled={cases <= min}
        onClick={() => onChange(Math.max(min, cases - 1))}
        className={`rounded-r-none ${pad}`}
      >
        &minus;
      </Button>
      <input
        type="number"
        min={min}
        value={cases}
        onChange={(e) => {
          const parsed = Number.parseInt(e.target.value, 10)
          onChange(Number.isNaN(parsed) ? min : Math.max(min, parsed))
        }}
        aria-label="Number of cases"
        className={`${width} ${text} border-x border-line bg-transparent py-1.5 text-center font-medium text-ink focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      <Button
        variant="ghost"
        size="sm"
        aria-label="Add one case"
        onClick={() => onChange(cases + 1)}
        className={`rounded-l-none ${pad}`}
      >
        +
      </Button>
    </div>
  )
}
