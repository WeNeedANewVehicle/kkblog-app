import { METHODS } from '@/common/constant/constant'
import tokenStorage from '@/common/storages/token-storage'
import api from '@/common/util/api.util'
import {
  CreatePostDto,
  CreatePostResponseDto,
} from '@/features/posts/api/dto/createPost.dto'
import { GetPostResponseDto } from '@/features/posts/api/dto/getPost.dto'
import {
  GetNearByPostsDto,
  GetPostsDto,
  GetPostsResponseDto,
} from '@/features/posts/api/dto/getPosts'
import { UpdatePostDto } from './dto/updatePost.dto'
import objectToQueryString from '@/common/util/objectToQueryString'
import {
  GetMyPostsDto,
  GetMyPostsItemResponseDto,
} from '@/features/posts/api/dto/getMyPosts.dto'

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
export async function getPostsApi(params: GetPostsDto) {
  return await api<GetPostsDto, GetPostsResponseDto>({
    url: '/board/posts',
    queries: objectToQueryString(params),
  })
}

// 글 불러오기 (편집 시)
export async function getMyPost(id: string) {
  const accessToken = tokenStorage.getAccessToken()
  return await api<undefined, GetPostResponseDto>({
    url: `/board/posts/my/${id}`,
    accessToken,
  })
}

// 글 목록 불러오기 (편집 시)
export async function getMyPosts(params: GetMyPostsDto) {
  const accessToken = tokenStorage.getAccessToken()
  return await api<undefined, GetMyPostsItemResponseDto[]>({
    url: `/board/posts/my`,
    accessToken,
    queries: objectToQueryString(params),
  })
}

// 글 상세
export async function getPostApi(id: string) {
  return await api<string, GetPostResponseDto>({
    url: `/board/posts/${id}`,
    cache: 'no-store',
  })
}

// 인접한 글 (이전 / 다음 글)
export async function getNearByPosts(id: string) {
  return await api<string, GetNearByPostsDto>({
    url: `/board/posts/${id}/nearby`,
  })
}

// 글 수정
export async function updatePostApi(id: string, params: UpdatePostDto) {
  const accessToken = tokenStorage.getAccessToken()
  return await api<UpdatePostDto, boolean>({
    url: `/board/posts/${id}`,
    accessToken,
    method: METHODS.PATCH,
    body: params,
  })
}
