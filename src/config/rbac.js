export const roles = {
  superAdmin: 'super_admin',
  admin: 'admin',
  manager: 'manager',
  user: 'user',
}

export const permissions = {
  usersView: 'users.view',
  usersCreate: 'users.create',
  usersEdit: 'users.edit',
  usersDelete: 'users.delete',
  settingsView: 'settings.view',
  settingsUpdate: 'settings.update',
}

export const rolePermissions = {
  [roles.superAdmin]: Object.values(permissions),
  [roles.admin]: [
    permissions.usersView,
    permissions.usersCreate,
    permissions.usersEdit,
    permissions.settingsView,
    permissions.settingsUpdate,
  ],
  [roles.manager]: [
    permissions.usersView,
    permissions.usersEdit,
    permissions.settingsView,
  ],
  [roles.user]: [permissions.usersView],
}
