import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/i18n/use-translation'
import { formatRole } from '@/lib/user'

const roleVariants = {
  super_admin: 'default',
  admin: 'default',
  manager: 'info',
  user: 'secondary',
}

function RoleBadge({ role }) {
  const { t } = useTranslation()

  return (
    <Badge variant={roleVariants[role] ?? 'secondary'}>
      {formatRole(role, t)}
    </Badge>
  )
}

export { RoleBadge }
