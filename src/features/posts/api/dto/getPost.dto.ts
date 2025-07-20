import { Author } from '@/features/auth/types/auth.type'
import { Posts } from '@/features/posts/types/post.type'

interface PostAuthorResponseDto extends Pick<Author, 'nickname' | 'id'> {
  image: string | null;
  summary: string | null;
}

export interface GetPostResponseDto extends Posts {
  author: PostAuthorResponseDto
  _count: {
    comments: number
  }
}
