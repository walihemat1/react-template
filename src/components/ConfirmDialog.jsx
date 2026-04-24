import { Button } from '@/components/ui/button'

function ConfirmDialog({
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  confirmVariant = 'default',
  description,
  icon: Icon,
  isOpen,
  onCancel,
  onConfirm,
  title = 'Are you sure?',
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-[28rem] rounded-3xl border border-border bg-background p-6 shadow-2xl">
        <div className="space-y-3">
          {Icon ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-foreground">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <h2 className="text-lg font-semibold">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button className="rounded-xl" variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button
            className="rounded-xl"
            variant={confirmVariant}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ConfirmDialog }
