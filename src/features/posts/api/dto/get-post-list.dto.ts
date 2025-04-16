import { Paging } from '@/common/dto/baseResponse'
import { Author } from '@/features/auth/types/auth.type'
import { Posts } from '@/features/posts/types/post.type'

export interface GetPostsDto extends Paging {
  search?: string | string[]
}

export interface GetPostsItemResponseDto extends Omit<Posts, 'files'> {
  author: Author
}

export type GetPostsResponseDto = GetPostsItemResponseDto[]
