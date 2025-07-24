import { Posts } from '@/features/posts/types/post.type'

export type CreatePostDto = Pick<
  Posts,
  'title' | 'content' | 'files' | 'tags' | 'thumbnail' | 'desc' | 'isPublished'
>
export type CreatePostResponseDto = Pick<Posts, 'id'>
