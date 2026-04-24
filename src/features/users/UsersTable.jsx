import { DataTable } from '@/components/DataTable'
import { Button } from '@/components/ui/button'
import { permissions } from '@/config/rbac'
import { PermissionGuard } from '@/routes/PermissionGuard'

function UsersTable({ onDelete, onEdit, users }) {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (user) => (
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user) => (
        <div className="flex gap-2">
          <PermissionGuard permission={permissions.usersEdit}>
            <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
              Edit
            </Button>
          </PermissionGuard>
          <PermissionGuard permission={permissions.usersDelete}>
            <Button variant="outline" size="sm" onClick={() => onDelete(user)}>
              Delete
            </Button>
          </PermissionGuard>
        </div>
      ),
    },
  ]

  return (
    <DataTable columns={columns} data={users} getRowKey={(user) => user.id} />
  )
}

export { UsersTable }
