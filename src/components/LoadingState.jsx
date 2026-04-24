function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="rounded-lg border border-border p-6 text-sm text-muted-foreground">
      {message}
    </div>
  )
}

export { LoadingState }
