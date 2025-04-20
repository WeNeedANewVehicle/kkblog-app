import { Comments } from '@/features/comments/types/comments.type'
import { Author } from '@/features/auth/types/auth.type'

export interface CreateCommentDto
  extends Pick<Comments, 'content' | 'postId' | 'parentCommentId'> {}

export interface CreateCommentResponseDto
  extends Pick<Comments, 'content' | 'createdAt' | 'depth' | 'id'> {
  author: Author
}
