import { z } from 'zod'

export const tagSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1).max(10),
  postId: z.string().optional(),
})

export type TagSchema = z.infer<typeof tagSchema>
