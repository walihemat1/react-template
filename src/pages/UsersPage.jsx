import { useState } from 'react'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { LoadingState } from '@/components/LoadingState'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { permissions, roles } from '@/config/rbac'
import { UserFormDialog } from '@/features/users/UserFormDialog'
import { UsersTable } from '@/features/users/UsersTable'
import { PermissionGuard } from '@/routes/PermissionGuard'
import { RoleGuard } from '@/routes/RoleGuard'
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '@/services/users-api'

function UsersPage() {
  const [formMode, setFormMode] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const { data: users = [], error, isLoading, refetch } = useGetUsersQuery()
  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation()

  const isUserFormOpen = formMode === 'create' || formMode === 'edit'
  const isSubmittingUser = isCreatingUser || isUpdatingUser

  function openCreateForm() {
    setSelectedUser(null)
    setFormMode('create')
  }

  function openEditForm(user) {
    setSelectedUser(user)
    setFormMode('edit')
  }

  function closeUserForm() {
    setSelectedUser(null)
    setFormMode(null)
  }

  function openDeleteDialog(user) {
    setSelectedUser(user)
    setFormMode('delete')
  }

  function handleCreateUser(values) {
    createUser(values)
    closeUserForm()
  }

  function handleUpdateUser(values) {
    updateUser({ id: selectedUser.id, ...values })
    closeUserForm()
  }

  function handleSubmitUser(values) {
    if (formMode === 'edit') {
      handleUpdateUser(values)
      return
    }

    handleCreateUser(values)
  }

  function handleDeleteUser() {
    deleteUser(selectedUser.id)
    setSelectedUser(null)
    setFormMode(null)
  }

  return (
    <section className="space-y-6">
      <PageHeader
        title="Users"
        description="A protected page for user management."
        actions={
          <PermissionGuard permission={permissions.usersCreate}>
            <Button size="sm" onClick={openCreateForm}>
              Create user
            </Button>
          </PermissionGuard>
        }
      />

      <div className="space-y-3 rounded-lg border border-border p-4">
        <PermissionGuard permission={permissions.usersView}>
          <p className="text-sm">You can view users.</p>
        </PermissionGuard>

        <RoleGuard roles={[roles.superAdmin, roles.admin]}>
          <p className="text-sm">Admin tools are visible for this role.</p>
        </RoleGuard>
      </div>

      {isLoading ? <LoadingState message="Loading users..." /> : null}

      {error ? (
        <ErrorState message="Unable to load users." onRetry={refetch} />
      ) : null}

      {!isLoading && !error && users.length === 0 ? (
        <EmptyState
          title="No users"
          description="Create a user to see them listed here."
        />
      ) : null}

      {!isLoading && !error && users.length > 0 ? (
        <UsersTable
          users={users}
          onEdit={openEditForm}
          onDelete={openDeleteDialog}
        />
      ) : null}

      <UserFormDialog
        defaultValues={selectedUser ?? undefined}
        isOpen={isUserFormOpen}
        isSubmitting={isSubmittingUser}
        mode={formMode}
        onCancel={closeUserForm}
        onSubmit={handleSubmitUser}
      />

      <ConfirmDialog
        isOpen={formMode === 'delete'}
        title="Delete user?"
        description={`This removes ${selectedUser?.name ?? 'this user'} from the mock data list.`}
        confirmText={isDeletingUser ? 'Deleting...' : 'Delete'}
        onCancel={() => {
          setSelectedUser(null)
          setFormMode(null)
        }}
        onConfirm={handleDeleteUser}
      />
    </section>
  )
}

export { UsersPage }
