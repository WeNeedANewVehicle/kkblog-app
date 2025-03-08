import { METHODS } from '@/common/constant/constant'
import { BaseResponse } from '@/common/dto/base-response.dto'
import { messages } from '@/common/messages/messages'
import tokenStorage from '@/common/storages/token-storage'
import api from '@/common/util/api.util'
import {
  MeResponseDto,
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  SignUpResponseDto,
} from '@/features/auth/api/dto/signIn.dto'

// 로그인
export async function signInApi(params: SignInDto) {
  return await api<SignInDto, SignInResponseDto>({
    url: '/auth/sign-in',
    method: METHODS.POST,
    body: params,
    credentials: 'include',
    middleware: (res) => {
      const authorization = res.headers.get('Authorization')
      const [bearer, token] = authorization?.split(' ') ?? ['', '']

      if (bearer !== 'Bearer') {
        throw new Error(messages.validation.auth.invalid_bearer_token)
      }

      if (token) {
        tokenStorage.setAccessToken(token)
      }
    },
  })
}

// 인증
export async function authMeApi() {
  const accessToken = tokenStorage.getAccessToken();
  const result = await api<string | null, MeResponseDto>({
    url: '/auth/me',
    accessToken
  })

  return result.data;
}

// 가입
export async function signUpApi(params: SignUpDto) {
  return await api<SignUpDto, SignUpResponseDto>({
    url: '/auth/sign-up',
    method: METHODS.POST,
    body: params,
  })
}

// 엑세스 토큰 재발급
export async function refreshAccessTokenApi() {
  return await api<undefined, BaseResponse<null>>({
    url: '/auth/refresh/token',
    credentials: 'include',
    middleware: (res) => {
      const accessToken = res.headers.get('Authorization');
      const [bearer, token] = accessToken?.split(' ') ?? ['', '']

      if (bearer !== 'Bearer') {
        throw new Error(messages.validation.auth.invalid_bearer_token)
      }

      if (token) {
        tokenStorage.setAccessToken(token)
      }
    }
  })
}