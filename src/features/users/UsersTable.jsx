import { MoreHorizontal } from 'lucide-react'

import { DataTable } from '@/components/DataTable'
import { RoleBadge } from '@/components/RoleBadge'
import { UserAvatar } from '@/components/UserAvatar'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { permissions } from '@/config/rbac'
import { useTranslation } from '@/i18n/use-translation'
import { PermissionGuard } from '@/routes/PermissionGuard'

function UsersTable({ onDelete, onEdit, users }) {
  const { t } = useTranslation()

  const columns = [
    {
      key: 'name',
      header: t('users.name'),
      render: (user) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={user.name} />
          <div className="min-w-0">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground md:hidden">
              {user.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: t('users.email'),
      className: 'hidden md:table-cell',
      render: (user) => (
        <span className="text-muted-foreground">{user.email}</span>
      ),
    },
    {
      key: 'role',
      header: t('users.role'),
      render: (user) => <RoleBadge role={user.role} />,
    },
    {
      key: 'status',
      header: t('users.status'),
      render: (user) => (
        <StatusBadge
          active={user.status !== 'inactive'}
          activeLabel={t('users.statusActive')}
          inactiveLabel={t('users.statusInactive')}
        />
      ),
    },
    {
      key: 'joined',
      header: t('users.joined'),
      className: 'hidden lg:table-cell',
      render: (user) => (
        <span className="text-muted-foreground">{user.joined ?? '—'}</span>
      ),
    },
    {
      key: 'actions',
      header: t('users.actions'),
      render: (user) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label={t('users.actions')}
              className="h-8 w-8"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <PermissionGuard permission={permissions.usersEdit}>
              <DropdownMenuItem onSelect={() => onEdit(user)}>
                {t('users.edit')}
              </DropdownMenuItem>
            </PermissionGuard>
            <PermissionGuard permission={permissions.usersDelete}>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onSelect={() => onDelete(user)}
              >
                {t('users.delete')}
              </DropdownMenuItem>
            </PermissionGuard>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <DataTable columns={columns} data={users} getRowKey={(user) => user.id} />
  )
}

export { UsersTable }
