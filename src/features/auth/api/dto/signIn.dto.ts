export interface SignInDto {
  email: string
  password: string
}

export interface SignInResponseDto {
  accessToken: string
}

export interface SignUpDto extends SignInDto {
  nickname: string
  confirm: string
}

export interface SignUpResponseDto extends SignInResponseDto {}

export interface MeResponseDto {
  id: string
  email: string
  nickname: string
}
