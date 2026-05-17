import { rolePermissions, roles } from '@/config/rbac'

const AUTH_STORAGE_KEY = 'react-template-user'
const DEFAULT_ROLE = roles.admin

function createUser(email) {
  return {
    name: 'Demo User',
    email,
    role: DEFAULT_ROLE,
    permissions: rolePermissions[DEFAULT_ROLE],
  }
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('auth.credentialsRequired')
  }

  const user = createUser(email)

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))

  return user
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function getStoredUser() {
  const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  const user = JSON.parse(storedUser)

  if (!user.role || !user.permissions) {
    return createUser(user.email)
  }

  return user
}
