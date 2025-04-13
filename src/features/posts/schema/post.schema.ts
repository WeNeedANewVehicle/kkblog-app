import { fileSchema } from '@/features/files/schema/files.schema'
import { TagSchema, tagSchema } from '@/features/tags/schema/tag.schema'
import { z } from 'zod'

export const postSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, { message: '게시물 제목은 3자 이상이어야 합니다' }),
  content: z.string().min(1, { message: '게시물 내용이 입력되지 않았습니다.' }),
  desc: z.string().optional(),
  tagInput: z.string().optional(), // 태그를 추가할 때 입력 데이터
  thumbnail: z.string().url().optional(),
  tags: z
    .array(tagSchema)
    .max(10)
    .optional()
    .transform((tags) => {
      if (!tags) {
        return tags
      }

      const labelMap = new Map<string, TagSchema[]>()

      for (const tag of tags) {
        if (!labelMap.has(tag.label)) {
          labelMap.set(tag.label, [])
        }
        const labels = labelMap.get(tag.label)
        labels!.push(tag)
      }

      const result: TagSchema[] = []

      for (const [label, group] of Array.from(labelMap.entries())) {
        // id가 있는 항목 필터
        const withId = group.filter((item: TagSchema) => item.id !== undefined)
        if (withId.length > 0) {
          // id가 있는 항목 중 첫 번째만 사용
          result.push(withId[0])
        } else {
          // 모두 id가 undefined면 최초 하나만 남김
          result.push(group[0])
        }
      }

      return result
    })
    .refine(
      (tags) => {
        const set = new Set(tags?.map((tag) => tag.label))
        return set.size === tags?.length
      },
      { message: '중복된 태그 이름이 있습니다.' }
    ),

  files: z.array(fileSchema).optional(),

  attachedFiles:
    typeof FileList !== 'undefined'
      ? z.instanceof(FileList).optional()
      : z.undefined(),
})

export type PostSchema = z.infer<typeof postSchema>
