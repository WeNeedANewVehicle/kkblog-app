import { METHODS } from '@/common/constant/constant'
import tokenStorage from '@/common/storages/token-storage'
import api from '@/common/util/api.util'
import {
  CreatePostDto,
  CreatePostResponseDto,
} from '@/features/posts/api/dto/post.dto'
import { GetPostResponseDto } from '@/features/posts/api/dto/get-post.dto'
import {
  GetPostsDto,
  GetPostsResponseDto,
} from '@/features/posts/api/dto/get-post-list.dto'

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

// 글 목록
export async function getPostsApi() {
  return await api<GetPostsDto, GetPostsResponseDto>({
    url: '/board/posts',
  })
}

export async function getPostApi(id: string) {
  return await api<string, GetPostResponseDto>({
    url: `/board/posts/${id}`,
  })
}
