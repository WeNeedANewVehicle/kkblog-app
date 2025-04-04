import { Posts } from '@/features/posts/types/post.type'

export type GetPostsDto = unknown

export type GetPostsItemResponseDto = Omit<Posts, 'files'>

export type GetPostsResponseDto = GetPostsItemResponseDto[]
