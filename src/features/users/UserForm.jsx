import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { createUserSchema } from '@/features/users/user-schema'
import { useTranslation } from '@/i18n/use-translation'

const roleOptions = ['super_admin', 'admin', 'manager', 'user']

function UserForm({
  defaultValues = {
    name: '',
    email: '',
    role: 'user',
  },
  isSubmitting = false,
  onCancel,
  onSubmit,
  submitText,
}) {
  const { t } = useTranslation()
  const userSchema = useMemo(() => createUserSchema(t), [t])
  const resolvedSubmitText = submitText ?? t('users.save')

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues,
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="block space-y-2" htmlFor="user-name">
        <span className="text-sm font-medium">{t('users.name')}</span>
        <input
          id="user-name"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register('name')}
        />
        {errors.name ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </label>

      <label className="block space-y-2" htmlFor="user-email">
        <span className="text-sm font-medium">{t('users.email')}</span>
        <input
          id="user-email"
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

      <label className="block space-y-2" htmlFor="user-role">
        <span className="text-sm font-medium">{t('users.role')}</span>
        <select
          id="user-role"
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register('role')}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {t(`roles.${role}`)}
            </option>
          ))}
        </select>
        {errors.role ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.role.message}
          </p>
        ) : null}
      </label>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        ) : null}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? t('users.saving') : resolvedSubmitText}
        </Button>
      </div>
    </form>
  )
}

export { UserForm }
