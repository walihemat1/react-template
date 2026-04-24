function EmptyState({
  title = 'No results',
  description = 'There is nothing to show yet.',
  actions,
}) {
  return (
    <div className="rounded-lg border border-dashed border-border p-8 text-center">
      <h2 className="font-medium">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {actions ? (
        <div className="mt-4 flex justify-center">{actions}</div>
      ) : null}
    </div>
  )
}

export { EmptyState }
