import { Files } from '@/features/files/types/file.type'
import { Tag } from '@/features/tags/types/tag.type'

export interface Posts {
  id: string
  title: string
  content: string
  tags: Array<Pick<Tag, 'id' | 'label' | 'postId'>>
  files?: Array<Files> | undefined
  createdAt: string
  updatedAt: string
  desc?: string
  thumbnail?: string
}
