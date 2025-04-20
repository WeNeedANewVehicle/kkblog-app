import { PaginationDto } from '@/common/dto/pagination.dto'
import { Comments } from '../../types/comments.type'
import { Author } from '@/features/auth/types/auth.type'

export interface GetCommentsDto extends PaginationDto {
  postId: string
}

export interface GetCommentsItemDto
  extends Pick<Comments, 'id' | 'content' | 'createdAt'> {
  author: Author
  _count: number
}

export type GetCommentsResponseDto = GetCommentsItemDto[]
