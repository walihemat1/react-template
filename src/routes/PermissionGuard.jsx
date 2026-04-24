import { useSelector } from 'react-redux'

import { hasPermission } from '@/lib/rbac'

function PermissionGuard({ permission, children, fallback = null }) {
  const user = useSelector((state) => state.auth.user)

  if (!hasPermission(user, permission)) {
    return fallback
  }

  return children
}

export { PermissionGuard }
