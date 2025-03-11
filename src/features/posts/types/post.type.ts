import { Files } from '@/features/files/types/file.type'

export interface Posts {
  id: string
  title: string
  content: string
  tags: string[]
  files?: Files[]
  createdAt: string
  updatedAt: string
}
