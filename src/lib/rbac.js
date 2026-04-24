export function hasRole(user, allowedRoles) {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

  return roles.includes(user?.role)
}

export function hasPermission(user, requiredPermission) {
  const permissions = Array.isArray(requiredPermission)
    ? requiredPermission
    : [requiredPermission]

  return permissions.every((permission) =>
    user?.permissions?.includes(permission),
  )
}
