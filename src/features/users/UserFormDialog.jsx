import { UserForm } from '@/features/users/UserForm'

function UserFormDialog({
  defaultValues,
  isOpen,
  isSubmitting,
  mode = 'create',
  onCancel,
  onSubmit,
}) {
  if (!isOpen) {
    return null
  }

  const title = mode === 'edit' ? 'Edit user' : 'Create user'
  const description =
    mode === 'edit'
      ? 'Update the selected user details.'
      : 'Add a user to the mock data list.'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg">
        <div className="mb-6 space-y-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <UserForm
          defaultValues={defaultValues}
          isSubmitting={isSubmitting}
          submitText={mode === 'edit' ? 'Update user' : 'Create user'}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

export { UserFormDialog }
