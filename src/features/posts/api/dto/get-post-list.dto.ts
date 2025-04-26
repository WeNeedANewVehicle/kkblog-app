import { PaginationDto } from '@/common/dto/pagination.dto'
import { Author } from '@/features/auth/types/auth.type'
import { Posts } from '@/features/posts/types/post.type'

export class GetPostsDto extends PaginationDto {
  search?: string | string[]
}

export interface GetPostsItemResponseDto extends Omit<Posts, 'files'> {
  author: Author
}

export type GetPostsResponseDto = GetPostsItemResponseDto[]

export type GetNearByPostsDto = {
  prev: GetPostsItemResponseDto
  next: GetPostsItemResponseDto
}
