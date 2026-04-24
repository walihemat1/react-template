export function getInitials(name = 'User') {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function formatRole(role = 'user') {
  return role.replace('_', ' ')
}
