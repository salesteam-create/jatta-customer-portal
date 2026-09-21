import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePortal } from '../state/portal'
import { Button, Card, Field, inputClass } from '../components/Ui'
import { Logo } from '../components/Logo'
import { demoPersonaIds } from '../data/customers'

/**
 * There is no authentication in the prototype. Any email and password logs you in as the
 * first customer, and the demo controls switch between customers from there.
 *
 * It looks like a real login on purpose: the earlier version asked you to pick which
 * company to sign in as, which is not a thing a real portal would ever do.
 */
export function Login() {
  const { customers, login } = usePortal()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const match = customers.find((c) => c.email.toLowerCase() === email.trim().toLowerCase())
    login(match?.id ?? demoPersonaIds[0])
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <Logo className="mx-auto mb-6 h-20 w-auto" />
        <h1 className="font-display text-3xl text-ink">Log in</h1>
        <p className="mx-auto mt-3 text-ink-2">
          Log in to see prices and place an order.
        </p>
      </div>

      <Card className="mt-8 p-6 sm:p-8">
        <form onSubmit={submit} className="grid gap-4">
          <Field label="Email address">
            <input
              type="email"
              autoComplete="username"
              className={inputClass}
              placeholder="you@company.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password">
            <input
              type="password"
              autoComplete="current-password"
              className={inputClass}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Button type="submit" size="lg" className="mt-2 w-full">
            Log in
          </Button>

          <button
            type="button"
            disabled
            className="cursor-not-allowed text-center text-sm text-ink-3"
            title="Not built in the prototype"
          >
            Forgotten your password?
          </button>
        </form>

        <div className="mt-8 border-t border-line pt-6 text-center">
          <p className="text-sm text-ink-2">
            Don’t have an account yet? Accounts are opened by application and reviewed by the
            brewery before they are activated.
          </p>
          <button
            disabled
            className="mt-3 cursor-not-allowed rounded-full border border-line bg-paper-2 px-4 py-2 text-sm text-ink-3"
            title="Not built in the prototype"
          >
            Apply for an account
          </button>
        </div>
      </Card>

      <p className="mt-4 text-center text-xs text-ink-3">
        Prototype: any email and password will log you in.
      </p>
    </div>
  )
}
