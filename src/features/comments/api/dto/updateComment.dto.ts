import { Comments } from '../../types/comments.type'
import { Author } from '@/features/auth/types/auth.type'

export interface UpdateCommentDto
  extends Pick<Comments, 'content' | 'postId' | 'id' | 'parentCommentId'> {}

export interface UpdateCommentResponseDto
  extends Pick<Comments, 'content' | 'createdAt' | 'depth' | 'id'> {
  author: Author
  _count?: {
    childs: number
  }
  parent?: {
    author: Author
  }
}
