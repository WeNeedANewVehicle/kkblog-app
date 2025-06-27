import { Posts } from '@/features/posts/types/post.type'

export interface GetMyPostsDto {
  published?: boolean
}

export type GetMyPostsItemResponseDto = Pick<
  Posts,
  'id' | 'createdAt' | 'title'
>
