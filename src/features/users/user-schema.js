import { z } from 'zod'

function createUserSchema(t) {
  return z.object({
    name: z.string().min(2, t('validation.nameMin')),
    email: z.string().email(t('validation.email')),
    role: z.enum(['super_admin', 'admin', 'manager', 'user']),
  })
}

export { createUserSchema }
