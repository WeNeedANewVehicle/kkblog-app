import { fileSchema } from '@/features/files/schema/files.schema'
import { z } from 'zod'

const postSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  content: z.string(),
  tags: z.array(z.string()).max(10).optional(),
})

export type PostSchema = z.infer<typeof postSchema>
