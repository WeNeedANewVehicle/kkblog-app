import { z } from 'zod'

export const fileSchema = z.object({
  id: z.string().optional(),
  uri: z.string().url(),
  name: z.string().url(),
})

export type FileSchema = z.infer<typeof fileSchema>
