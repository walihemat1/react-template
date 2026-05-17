import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { LoadingState } from '@/components/LoadingState'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { permissions, roles } from '@/config/rbac'
import { UserFormDialog } from '@/features/users/UserFormDialog'
import { UsersTable } from '@/features/users/UsersTable'
import { useTranslation } from '@/i18n/use-translation'
import { PermissionGuard } from '@/routes/PermissionGuard'
import { RoleGuard } from '@/routes/RoleGuard'
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '@/services/users-api'

function UsersPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [formMode, setFormMode] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const { data: users = [], error, isLoading, refetch } = useGetUsersQuery()
  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation()

  const isUserFormOpen = formMode === 'create' || formMode === 'edit'
  const isSubmittingUser = isCreatingUser || isUpdatingUser

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) {
      return users
    }

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query),
    )
  }, [searchQuery, users])

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

  const deleteTargetName = selectedUser?.name ?? t('users.deleteFallbackName')

  return (
    <section className="space-y-6">
      <PageHeader
        title={t('users.title')}
        description={t('users.description')}
        actions={
          <PermissionGuard permission={permissions.usersCreate}>
            <Button onClick={openCreateForm}>{t('users.create')}</Button>
          </PermissionGuard>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-sm">
          <span className="sr-only">{t('common.search')}</span>
          <Search
            aria-hidden
            className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            aria-label={t('common.search')}
            className="ps-10"
            placeholder={t('users.searchPlaceholder')}
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        <p className="text-sm text-muted-foreground">
          {filteredUsers.length} / {users.length}
        </p>
      </div>

      {isLoading ? <LoadingState message={t('users.loading')} /> : null}

      {error ? (
        <ErrorState
          message={t('users.loadError')}
          retryLabel={t('common.retry')}
          title={t('common.error')}
          onRetry={refetch}
        />
      ) : null}

      {!isLoading && !error && users.length === 0 ? (
        <EmptyState
          title={t('users.emptyTitle')}
          description={t('users.emptyDescription')}
          actions={
            <PermissionGuard permission={permissions.usersCreate}>
              <Button size="sm" onClick={openCreateForm}>
                {t('users.create')}
              </Button>
            </PermissionGuard>
          }
        />
      ) : null}

      {!isLoading &&
      !error &&
      users.length > 0 &&
      filteredUsers.length === 0 ? (
        <EmptyState
          title={t('common.noResults')}
          description={t('common.emptyDescription')}
        />
      ) : null}

      {!isLoading && !error && filteredUsers.length > 0 ? (
        <UsersTable
          users={filteredUsers}
          onEdit={openEditForm}
          onDelete={openDeleteDialog}
        />
      ) : null}

      <RoleGuard roles={[roles.superAdmin, roles.admin]}>
        <p className="text-xs text-muted-foreground">{t('users.adminTools')}</p>
      </RoleGuard>

      <UserFormDialog
        defaultValues={selectedUser ?? undefined}
        isOpen={isUserFormOpen}
        isSubmitting={isSubmittingUser}
        mode={formMode}
        onCancel={closeUserForm}
        onSubmit={handleSubmitUser}
      />

      <ConfirmDialog
        cancelText={t('common.cancel')}
        confirmText={isDeletingUser ? t('users.deleting') : t('users.delete')}
        description={t('users.deleteDescription', { name: deleteTargetName })}
        isOpen={formMode === 'delete'}
        title={t('users.deleteTitle')}
        onCancel={() => {
          setSelectedUser(null)
          setFormMode(null)
        }}
        onConfirm={handleDeleteUser}
        confirmDisabled={isDeletingUser}
      />
    </section>
  )
}

export { UsersPage }
