import { Posts } from '@/features/posts/types/post.type'

export interface CreatePostDto
  extends Pick<Posts, 'title' | 'content' | 'files' | 'tags'> {}

export interface CreatePostResponseDto {
  id: string
}

export interface UpdatePostDto extends CreatePostDto {
  id: string
}
