import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  ShieldCheck,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ConfirmDialog } from '@/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatRole, getInitials } from '@/lib/user'
import { routes } from '@/routes/routes'

function UserMenu({ onLogout, user }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-11 gap-3 rounded-xl border border-border bg-background px-2 shadow-xs hover:bg-accent sm:px-3"
            variant="ghost"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {getInitials(user?.name)}
            </span>
            <span className="hidden min-w-0 text-start sm:block">
              <span className="block max-w-36 truncate text-sm font-medium">
                {user?.name ?? 'User'}
              </span>
              <span className="block max-w-36 truncate text-xs capitalize text-muted-foreground">
                {formatRole(user?.role)}
              </span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-72 rounded-2xl p-2"
          sideOffset={10}
        >
          <DropdownMenuLabel className="rounded-xl px-3 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {getInitials(user?.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {user?.name ?? 'User'}
                </p>
                <p className="truncate text-xs font-normal text-muted-foreground">
                  {user?.email ?? 'user@example.com'}
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {formatRole(user?.role)}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to={routes.profile}>
              <User className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={routes.account}>
              <ShieldCheck className="h-4 w-4" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={routes.settings}>
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
            <Bell className="h-4 w-4" />
            Notifications
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => setIsConfirmOpen(true)}>
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        cancelText="Stay here"
        confirmText="Sign out"
        confirmVariant="destructive"
        description="You will be signed out of the current session."
        icon={LogOut}
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false)
          onLogout()
        }}
        title="Sign out of your account?"
      />
    </>
  )
}

export { UserMenu }
