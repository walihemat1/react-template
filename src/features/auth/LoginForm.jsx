import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/use-translation'
import { createLoginSchema } from '@/features/auth/login-schema'

function resolveErrorMessage(error, t) {
  if (!error) {
    return null
  }

  const translated = t(error)
  return translated === error ? error : translated
}

function LoginForm({ error, isLoading, onSubmit }) {
  const { t } = useTranslation()
  const loginSchema = useMemo(() => createLoginSchema(t), [t])

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@example.com',
      password: 'password',
    },
  })

  const errorMessage = resolveErrorMessage(error, t)

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{t('auth.login')}</h1>
        <p className="text-muted-foreground">{t('auth.demoHint')}</p>
      </div>

      <div className="space-y-4">
        <label className="block space-y-2" htmlFor="login-email">
          <span className="text-sm font-medium">{t('auth.email')}</span>
          <input
            id="login-email"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            type="email"
            {...register('email')}
          />
          {errors.email ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.email.message}
            </p>
          ) : null}
        </label>

        <label className="block space-y-2" htmlFor="login-password">
          <span className="text-sm font-medium">{t('auth.password')}</span>
          <input
            id="login-password"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            type="password"
            {...register('password')}
          />
          {errors.password ? (
            <p className="text-sm text-destructive" role="alert">
              {errors.password.message}
            </p>
          ) : null}
        </label>
      </div>

      {errorMessage ? (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button className="w-full" disabled={isLoading} type="submit">
        {isLoading ? t('auth.loggingIn') : t('auth.login')}
      </Button>
    </form>
  )
}

export { LoginForm }
