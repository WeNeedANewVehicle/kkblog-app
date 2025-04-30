import { z } from 'zod'
import { messages } from '@/common/messages/messages'

export const postSearchSchema = z.object({
  search: z
    .string()
    .min(2, { message: messages.validation.posts.min_length })
    .nullable(),
})

export type PostSearchSchema = z.infer<typeof postSearchSchema>
