import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { AppHeader } from '@/components/app-header'
import { AppSidebar } from '@/components/app-sidebar'
import { cn } from '@/lib/utils'
import { logout } from '@/store/auth-slice'

function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <AppSidebar
        isCollapsed={isSidebarCollapsed}
        user={user}
        onToggle={() => setIsSidebarCollapsed((isCollapsed) => !isCollapsed)}
      />

      <div
        className={cn(
          'transition-[padding] duration-200 md:ps-72',
          isSidebarCollapsed && 'md:ps-[4.75rem]',
        )}
      >
        <AppHeader user={user} onLogout={() => dispatch(logout())} />
        <main className="px-4 py-6 sm:px-6 lg:py-8">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export { DashboardLayout }
