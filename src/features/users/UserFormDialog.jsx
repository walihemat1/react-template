import { UserForm } from '@/features/users/UserForm'
import { useTranslation } from '@/i18n/use-translation'

function UserFormDialog({
  defaultValues,
  isOpen,
  isSubmitting,
  mode = 'create',
  onCancel,
  onSubmit,
}) {
  const { t } = useTranslation()

  if (!isOpen) {
    return null
  }

  const isEdit = mode === 'edit'
  const title = isEdit
    ? t('users.editDialogTitle')
    : t('users.createDialogTitle')
  const description = isEdit
    ? t('users.editDialogDescription')
    : t('users.createDialogDescription')
  const submitText = isEdit ? t('users.update') : t('users.create')

  return (
    <div
      aria-labelledby="user-form-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg">
        <div className="mb-6 space-y-2">
          <h2 className="text-lg font-semibold" id="user-form-dialog-title">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <UserForm
          defaultValues={defaultValues}
          isSubmitting={isSubmitting}
          submitText={submitText}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

export { UserFormDialog }
