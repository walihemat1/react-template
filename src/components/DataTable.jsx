import { cn } from '@/lib/utils'

function DataTable({ className, columns, data, getRowKey }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card shadow-sm',
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/35">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row, index) => (
              <tr
                key={getRowKey?.(row) ?? row.id ?? index}
                className="transition-colors hover:bg-muted/25"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3.5 align-middle">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { DataTable }
