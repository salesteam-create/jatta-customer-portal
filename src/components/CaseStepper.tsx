import { Button } from './Ui'

/**
 * Trade customers order in whole cases, never in single cans, so this is the only
 * quantity control in the prototype.
 */
export function CaseStepper({
  cases,
  onChange,
  min = 0,
}: {
  cases: number
  onChange: (next: number) => void
  min?: number
}) {
  return (
    <div className="inline-flex items-center rounded-lg border border-line bg-card">
      <Button
        variant="ghost"
        size="sm"
        aria-label="Remove one case"
        disabled={cases <= min}
        onClick={() => onChange(Math.max(min, cases - 1))}
        className="rounded-r-none px-3"
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
        className="w-14 border-x border-line bg-transparent py-1.5 text-center text-sm font-medium text-ink focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        variant="ghost"
        size="sm"
        aria-label="Add one case"
        onClick={() => onChange(cases + 1)}
        className="rounded-l-none px-3"
      >
        +
      </Button>
    </div>
  )
}
