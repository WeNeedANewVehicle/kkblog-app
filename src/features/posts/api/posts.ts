import { METHODS } from '@/common/constant/constant'
import tokenStorage from '@/common/storages/token-storage'
import api from '@/common/util/api.util'
import {
  CreatePostDto,
  CreatePostResponseDto,
} from '@/features/posts/api/dto/post.dto'

// 글 작성
export async function createPostApi(params: CreatePostDto) {
  const accessToken = tokenStorage.getAccessToken()
  return await api<CreatePostDto, CreatePostResponseDto>({
    url: '/board/posts',
    accessToken,
    method: METHODS.POST,
    body: params,
  })
}
