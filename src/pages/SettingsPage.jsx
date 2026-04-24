import { permissions } from '@/config/rbac'
import { PermissionGuard } from '@/routes/PermissionGuard'

function SettingsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          A protected page for app preferences.
        </p>
      </div>

      <PermissionGuard
        permission={permissions.settingsUpdate}
        fallback={
          <p className="text-sm text-muted-foreground">
            You can view settings, but updates are hidden for this permission.
          </p>
        }
      >
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm">Settings update controls go here.</p>
        </div>
      </PermissionGuard>
    </section>
  )
}

export { SettingsPage }
