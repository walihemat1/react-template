import { useSelector } from 'react-redux'

import { hasRole } from '@/lib/rbac'

function RoleGuard({ roles, children, fallback = null }) {
  const user = useSelector((state) => state.auth.user)

  if (!hasRole(user, roles)) {
    return fallback
  }

  return children
}

export { RoleGuard }
