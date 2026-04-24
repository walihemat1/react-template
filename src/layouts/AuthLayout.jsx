import { Outlet } from 'react-router-dom'

function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-12">
      <section className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-sm">
        {children ?? <Outlet />}
      </section>
    </main>
  )
}

export { AuthLayout }
