import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="text-3xl font-semibold">Page not found</h1>
          <p className="text-muted-foreground">
            The page you are looking for does not exist.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  )
}

export { NotFoundPage }
