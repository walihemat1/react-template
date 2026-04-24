import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="text-muted-foreground">
        You do not have permission to view this page.
      </p>
    </section>
  )
}

export { ProtectedRoute }
