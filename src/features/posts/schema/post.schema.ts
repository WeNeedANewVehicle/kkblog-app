import { fileSchema } from '@/features/files/schema/files.schema'
import { tagSchema } from '@/features/tags/schema/tag.schema'
import { z } from 'zod'

export const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3),
  content: z.string().min(1),
  desc: z.string().optional(),
  tagInput: z.string().optional(), // 태그를 추가할 때 입력 데이터
  thumbnail: z.string().url().optional(),
  tags: z.array(tagSchema).max(10).optional(),
  files: z.array(fileSchema).optional(),
  attachedFiles:
    typeof FileList !== 'undefined'
      ? z.instanceof(FileList).optional()
      : z.undefined(),
})

export type PostSchema = z.infer<typeof postSchema>
