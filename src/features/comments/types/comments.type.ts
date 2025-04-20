import { Posts } from '@/features/posts/types/post.type'

export interface Comments {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  content: string
  depth: string
  postId: Posts['id']
  parentCommentId?: string
}
