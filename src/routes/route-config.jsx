import { Navigate } from 'react-router-dom'

import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AccountPage } from '@/pages/AccountPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SettingsPage } from '@/pages/SettingsPage'
import { UsersPage } from '@/pages/UsersPage'
import { permissions, roles } from '@/config/rbac'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { routes } from '@/routes/routes'

export const publicRoutes = [
  {
    path: routes.login,
    element: <LoginPage />,
  },
]

export const protectedRoutes = [
  {
    path: routes.dashboard,
    element: <DashboardPage />,
  },
  {
    path: routes.users,
    element: <UsersPage />,
    requiredPermissions: permissions.usersView,
  },
  {
    path: routes.profile,
    element: <ProfilePage />,
  },
  {
    path: routes.account,
    element: <AccountPage />,
  },
  {
    path: routes.settings,
    element: <SettingsPage />,
    allowedRoles: [roles.superAdmin, roles.admin, roles.manager],
    requiredPermissions: permissions.settingsView,
  },
]

const protectedRouteElements = protectedRoutes.map(
  ({ allowedRoles, element, requiredPermissions, ...route }) => ({
    ...route,
    element: (
      <ProtectedRoute
        allowedRoles={allowedRoles}
        requiredPermissions={requiredPermissions}
      >
        {element}
      </ProtectedRoute>
    ),
  }),
)

export const routeConfig = [
  {
    path: '/',
    element: <Navigate to={routes.dashboard} replace />,
  },
  {
    element: <AuthLayout />,
    children: publicRoutes,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: protectedRouteElements,
      },
    ],
  },
  {
    path: routes.notFound,
    element: <NotFoundPage />,
  },
]
