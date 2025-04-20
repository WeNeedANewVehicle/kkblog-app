import { METHODS } from '@/common/constant/constant'
import tokenStorage from '@/common/storages/token-storage'
import api from '@/common/util/api.util'
import objectToQueryString from '@/common/util/objectToQueryString'
import {
  CreateCommentDto,
  CreateCommentResponseDto,
} from '@/features/comments/api/dto/createComment.dto'
import {
  GetCommentsDto,
  GetCommentsResponseDto,
} from '@/features/comments/api/dto/getComments.dto'

export function createCommentApi({
  postId,
  content,
  parentCommentId,
}: CreateCommentDto) {
  const accessToken = tokenStorage.getAccessToken()
  return api<Omit<CreateCommentDto, 'postId'>, CreateCommentResponseDto>({
    url: `/board/posts/${postId}/comments`,
    accessToken,
    method: METHODS.POST,
    body: {
      content,
      ...(parentCommentId && { parentCommentId }),
    },
  })
}

export function getCommentsApi({ postId, ...rest }: GetCommentsDto) {
  return api<Omit<GetCommentsDto, 'postId'>, GetCommentsResponseDto>({
    url: `/board/posts/${postId}/comments`,
    queries: objectToQueryString(rest),
  })
}
