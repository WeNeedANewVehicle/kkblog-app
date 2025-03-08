import { messages } from '@/common/messages/messages'
import { z } from 'zod'
import { signInSchema } from './signInSchema'
import { hasSpecialCharRegExp } from '@/common/regexps/regexps'

const { validation } = messages
const { password, nickname } = validation

export const signUpSchema = signInSchema
  .extend({
    confirm: z.string(),
    nickname: z
      .string({
        message: nickname.invalid,
        required_error: nickname.required,
      })
      .min(3, { message: nickname.min_length })
      .max(16, { message: nickname.max_length })
      .refine(
        (data) => {
          return !hasSpecialCharRegExp.test(data)
        },
        {
          path: ['nickname'],
          message: nickname.invalid,
        }
      ),
  })
  .refine((data) => data.password === data.confirm, {
    message: password.not_match,
    path: ['confirm'],
  })

export type SignUpSchema = z.infer<typeof signUpSchema>
