import { PaginationDto } from '@/common/dto/pagination.dto'
import { Comments } from '../../types/comments.type'
import { Author } from '@/features/auth/types/auth.type'

export interface GetCommentsDto extends PaginationDto {
  postId: string
}

export interface GetChildCommentsDto extends GetCommentsDto {
  commentId: string
}

export interface GetCommentsItemDto
  extends Pick<
    Comments,
    'id' | 'content' | 'createdAt' | 'depth' | 'parentCommentId'
  > {
  author: Author
  _count?: {
    childs: number
  }
  parent?: {
    author: Author
  }
}

export type GetCommentsResponseDto = GetCommentsItemDto[]
