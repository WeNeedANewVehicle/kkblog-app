import { z } from 'zod'

export const tagSchema = z.array(
  z.object({
    id: z.string().optional(),
    label: z.string().min(1).max(10),
  })
)

export type TagSchema = z.infer<typeof tagSchema>
