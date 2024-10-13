import { METHODS } from "@/common/constant/constant";
import api from "@/common/util/api.util";
import { SignInDto, SignInResponseDto, SignUpDto, SignUpResponseDto } from "@/features/auth/api/dto/signDto"

// 로그인
export async function signInApi(params: SignInDto) {
  return await api<SignInDto, SignInResponseDto>({
    url: '/auth/sign-in',
    method: METHODS.POST,
    body: params,
    credentials: "include",
  })
}

// 인증
export async function authMeApi(token: string | null) {
  return await api({
    url: '/auth/me',
    credentials: "include",
    accessToken: token
  })
}

// 가입
export async function signUpApi(params: SignUpDto) {
  return await api<SignUpDto, SignUpResponseDto>({
    url: '/auth/sign-up',
    method: METHODS.POST,
    body: params,
  })
}
