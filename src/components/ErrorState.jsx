import { Button } from '@/components/ui/button'

function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="rounded-lg border border-destructive/40 p-6">
      <h2 className="font-medium text-destructive">Error</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button className="mt-4" variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}

export { ErrorState }
