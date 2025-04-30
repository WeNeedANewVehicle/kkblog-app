import { DeleteResponse } from '@/common/dto/deleteResponse.dto'
import { Comments } from '../../types/comments.type'

export interface DeleteCommentDto
  extends Pick<Comments, 'id' | 'postId' | 'parentCommentId'> {}

export interface DeleteCommentResponseDto extends DeleteResponse {
  postId: string
}
