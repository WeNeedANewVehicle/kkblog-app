import { Author } from '@/features/auth/types/auth.type'
import { Posts } from '@/features/posts/types/post.type'

export type GetPostsDto = unknown

export interface GetPostsItemResponseDto extends Omit<Posts, 'files'> {
  author: Author
}

export type GetPostsResponseDto = GetPostsItemResponseDto[]
