import { messages } from '@/common/messages/messages'
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: messages.validation.email.invalid }),
  password: z
    .string()
    .min(8, { message: messages.validation.password.min_length })
    .max(20, { message: messages.validation.password.max_length }),
})

export type SignInSchema = z.infer<typeof signInSchema>
