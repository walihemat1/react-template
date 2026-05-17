import { Link, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n/use-translation'
import { hasPermission, hasRole } from '@/lib/rbac'

function ProtectedRoute({
  allowedRoles,
  children,
  requiredPermissions,
  fallback = <AccessDenied />,
}) {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !hasRole(user, allowedRoles)) {
    return fallback
  }

  if (requiredPermissions && !hasPermission(user, requiredPermissions)) {
    return fallback
  }

  return children ?? <Outlet />
}

function AccessDenied() {
  const { t } = useTranslation()

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t('access.denied')}</h1>
        <p className="text-muted-foreground">{t('access.deniedDescription')}</p>
      </div>
      <Button asChild variant="outline">
        <Link to="/dashboard">{t('access.goToDashboard')}</Link>
      </Button>
    </section>
  )
}

export { ProtectedRoute }
