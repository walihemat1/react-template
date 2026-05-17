import { z } from 'zod'

function createLoginSchema(t) {
  return z.object({
    email: z.string().email(t('validation.email')),
    password: z.string().min(1, t('validation.passwordRequired')),
  })
}

export { createLoginSchema }
