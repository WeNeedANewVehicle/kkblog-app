import { Posts } from '@/features/posts/types/post.type'

export type CreatePostDto = Pick<Posts, 'title' | 'content' | 'files' | 'tags'>
export type CreatePostResponseDto = Pick<Posts, 'id'>

export interface UpdatePostDto extends CreatePostDto {
  id: string
}
