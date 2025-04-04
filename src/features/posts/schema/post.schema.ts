import { fileSchema } from '@/features/files/schema/files.schema'
import { tagSchema } from '@/features/tags/schema/tag.schema'
import { z } from 'zod'

export const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3),
  content: z.string(),
  tagInput: z.string().optional(), // 태그를 추가할 때 입력 데이터
  tags: tagSchema.optional(),
  files: fileSchema.optional(),
})

export type PostSchema = z.infer<typeof postSchema>
