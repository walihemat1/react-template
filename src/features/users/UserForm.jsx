import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Enter a valid email address.'),
  role: z.enum(['super_admin', 'admin', 'manager', 'user']),
})

function UserForm({
  defaultValues = {
    name: '',
    email: '',
    role: 'user',
  },
  isSubmitting = false,
  onCancel,
  onSubmit,
  submitText = 'Save user',
}) {
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
      <label className="block space-y-2">
        <span className="text-sm font-medium">Name</span>
        <input
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register('name')}
        />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Email</span>
        <input
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          type="email"
          {...register('email')}
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Role</span>
        <select
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register('role')}
        >
          <option value="super_admin">Super admin</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="user">User</option>
        </select>
        {errors.role ? (
          <p className="text-sm text-destructive">{errors.role.message}</p>
        ) : null}
      </label>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving...' : submitText}
        </Button>
      </div>
    </form>
  )
}

export { UserForm }
