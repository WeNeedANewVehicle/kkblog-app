import { PermissionResponseDto } from "@/features/auth/api/dto/permission.dto"

export interface SignInDto {
  email: string
  password: string
}

export interface SignInResponseDto {
  accessToken: string
}


export interface MeResponseDto {
  id: string
  email: string
  nickname: string
  permissions: PermissionResponseDto
}
