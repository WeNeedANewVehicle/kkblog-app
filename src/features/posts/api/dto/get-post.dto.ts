import { Author } from '@/features/auth/types/auth.type'
import { Posts } from '@/features/posts/types/post.type'

export interface GetPostResponseDto extends Omit<Posts, 'updatedAt'> {
  author: Pick<Author, 'nickname'>
}
